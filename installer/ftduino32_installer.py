#!/usr/bin/env python3
#
# ftduino32_installer.py
# 
# Copyright (C) 2021 Till Harbaum <till@harbaum.org>
# https://github.com/harbaum/ftduino32
#
# This program is free software; you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free Software
# Foundation; either version 2 of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along with
# this program; if not, write to the Free Software Foundation, Inc., 51 Franklin
# Street, Fifth Floor, Boston, MA 02110-1301 USA.

import sys, io, os
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *

AMPY_BAUD=115200
ESPROM_BAUD=115200
SETUP_JSON="setup.json"

import platform
import serial.tools.list_ports
import serial, time, zipfile

import ampy.files
import ampy.pyboard as pyboard
import textwrap, binascii, hashlib

from argparse import Namespace
import json

import esptool

# run esptool in the background
class EspThread(QThread):
   done = pyqtSignal(bool)
   alert = pyqtSignal(dict)

   def __init__(self, setup):
      super().__init__()
      self.setup = setup
      self.port = setup["port"]

   def run(self):
      esp = None
      args = None
      ok = False
      
      try:
         # build the args namespace esptool expects
         args = Namespace()
         
         # map files to addr_filename tuples
         args.addr_filename = []
         for f in self.setup["files"]:
            fh = self.setup["open"](f["filename"], "rb")
            args.addr_filename.append( (f["addr"], fh) )

         # copy all enties from setup file
         for a in self.setup:
            setattr(args, a, self.setup[a])
         
         esp = esptool.get_default_connected_device(serial_list=[self.port], port=self.port, initial_baud=ESPROM_BAUD, chip=args.chip, connect_attempts=args.connect_attempts)

         print("Chip is %s" % (esp.get_chip_description()))
         print("Features: %s" % ", ".join(esp.get_chip_features()))
         print("Crystal is %dMHz" % esp.get_crystal_freq())
         esptool.read_mac(esp, args)
         esp = esp.run_stub()

         if args.baud > ESPROM_BAUD:
            esp.change_baud(args.baud)

         esptool.detect_flash_size(esp, args)
         if args.flash_size != 'keep':
            esp.flash_set_parameters(esptool.flash_size_bytes(args.flash_size))

         if not hasattr(args, "skip_write") or not args.skip_write:
            esptool.write_flash(esp, args)
         else:
            print("<<<<<<<< SKIPPING ACTUAL WRITE >>>>>>>>>>>")
          
         esp.hard_reset()

         esp._port.close()

         ok = True
         
      except Exception as e:
         self.alert.emit( {
            "title": "esptool",
            "message": "Esptool error",
            "info": "Exception when accessing\n"+str(self.port),
            "detail": str(e) })

      if esp:
         esp._port.close()

      if args:
         for f in args.addr_filename:
            f[1].close()
            
      self.done.emit(ok)

# listen for text output of background processes
class ListenerThread(QThread):
   msg = pyqtSignal(str)
   
   def __init__(self, config = None):
      super().__init__()
      self.config = config
         
   def run(self):
      while not self.config["wfd"].closed:
         try:
            while True:
               line = self.config["rfd"].readline()
               if len(line) == 0: break
               self.msg.emit(line)
         except:
            break
         
# run esptool in the background
class AmpyThread(QThread):
   done = pyqtSignal(bool)
   text = pyqtSignal(str)
   alert = pyqtSignal(dict)

   def __init__(self, setup):
      super().__init__()
      self.setup = setup

   # create a sha1 hash of a given file stored on the target
   def sha1sum(self, filename):
      out = None
      command = """
            import sys, uhashlib, ubinascii
            with open('{0}', 'rb') as infile:
                hash = uhashlib.sha1()
                while True:
                    data = infile.read(1024)
                    if data == b'': break
                    hash.update(data)
                len = sys.stdout.write(ubinascii.hexlify(hash.digest()))
      """.format(filename)
      try:
         self.setup["board"].enter_raw_repl()
         ded = textwrap.dedent(command)
         out = self.setup["board"].exec_(ded)
      except pyboard.PyboardError as ex:
         # just return None if something failed during checksum
         pass
         
      self.setup["board"].exit_raw_repl()
      return out

   # the same as before. But this time on a local file
   def sha1sum_local(self, filename):
      try:
         with self.setup["open"](filename, 'rb') as infile:
            hash = hashlib.sha1()
            while True:
               data = infile.read(1024)
               if data == b'': break
               hash.update(data)
            return binascii.hexlify(hash.digest())
      except Exception as e:
         self.text.emit("missing local file {}\n".format(filename));
         self.alert.emit( { "text": "File error", "message": "Error reading local file {}".format(filename), "detail": str(e) })
         
      return None
   
   def install_files(self, path, files):
      for file in files:
         if "filename" in file:
            if path: fname = os.path.join(path, file["filename"])
            else:    fname = file["filename"]
            
            # os.path.join uses machine specific path delimiter. On
            # windows this will use \ which the esp32 will not understand
            espfname = fname.replace("\\", "/")
            
            # anything that has "files" in it is a directory
            if "files" in file:
               # if there's a comment, then print it
               if "comment" in file:
                  self.text.emit("Installing {}\n".format(file["comment"]))
                  
               self.text.emit("Directory \"{}\"... ".format(espfname))

               try:
                  self.setup["ampy_files"].mkdir(espfname)
                  self.text.emit("created\n")                  
               except ampy.files.DirectoryExistsError as e:
                  self.text.emit("already exists\n")
                  
               if not self.install_files(fname, file["files"]):
                  return False
            else:               
               self.text.emit("File \"{}\"... ".format(espfname))
               
               # compare hashes to check if we need to update the file
               hash1 = self.sha1sum(espfname)
               if hash1:
                  hash2 = self.sha1sum_local(fname)
                  if not hash2: return False
                  
                  if hash1 == hash2:
                     self.text.emit("file already installed\n");
                  else:
                     self.text.emit("different file exists, ");
               else:
                  self.text.emit("does not exist, ");

               # need to send data?
               if not hash1 or (hash2 and hash1 != hash2):
                  try:
                     with self.setup["open"](fname, 'rb') as infile:
                        data = infile.read()
                        self.text.emit("uploading {} bytes... ".format(len(data)));
                        self.setup["ampy_files"].put(espfname, data)
                        self.text.emit("ok\n");
                  except Exception as e:
                     self.text.emit("upload error {}\n".format(str(e)));
                     self.alert.emit( { "title": "Upload error",
                                        "message": "File upload error on {}".format(espfname),
                                        "detail": str(e) } )
                     return False

      return True
                     
   def run(self):
      ok = False
      retry = 5

      # ctrl-c
      self.setup["board"].serial.write(b'\r\x03')
      time.sleep(0.1)
      self.setup["board"].serial.write(b'\x03')
      time.sleep(5)
        
      while not ok and retry:
         # try to get into repl mode. This sometimes needs a retry under windows ...
         try:
            self.setup["board"].enter_raw_repl()
            self.setup["board"].exit_raw_repl()
            ok = True
         except pyboard.PyboardError as e:
            self.text.emit("Retrying to enter raw repl\n");
            time.sleep(1)
            retry = retry - 1 

      if not ok:
         self.text.emit("Unable to enter raw repl\n");
         self.alert.emit( { "title": "Upload error",
                            "message": "Unable to enter raw repl",
                            "detail": str(e) } )
         self.done.emit(False)
      else:
         self.done.emit(self.install_files(None, self.setup["files"]))
         
class Window(QMainWindow):
   def __init__(self, app):
      super(Window, self).__init__()
      self.initUI()
      app.aboutToQuit.connect(self.on_exit)

      # custom open function that will work with
      # plain fs as well as with a zip file
   def fs_open(self, name, mode):
      return open(os.path.join(self.setup["path"], name), mode)
   
   def zip_open(self, name, mode):
      # even python on windows uses / as a path delimiter
      name = name.replace("\\", "/")
      if mode == "rb": mode = "r"
      return self.zip.open(name, mode)

   def on_exit(self):
      if hasattr(self, "zip") and self.zip:
         self.zip.close()
   
   # load setup and enable install button on success
   def load_setup(self, fname, quiet=False):
      # check if this is a zip file we are trying to load
      ext = os.path.splitext(fname)[1].lower()      
      self.setup = None

      # close any zip file that may be open
      if hasattr(self, "zip") and self.zip:
         self.zip.close()
         self.zip = None
      
      try:
         if ext == ".zip":
            # user has picked a zip file
            self.zip = zipfile.ZipFile(fname)
            with self.zip.open(SETUP_JSON) as f:
               self.setup = json.load(f)
               # store path to be able to access files relatively to json file
               self.setup["open"] = self.zip_open
            
         elif ext == ".json":
            # user has picked a json file
            with open(fname) as f:
               self.setup = json.load(f)
               # store path to be able to access files relatively to json file
               self.setup["open"] = self.fs_open
               self.setup["path"] = os.path.dirname(os.path.realpath(fname))
         else:
            self.alert( { "title": "Error",
                          "message": "Not a ZIP or JSON file",
                          "detail": "You can only load files in ZIP or JSON formar" })
      except Exception as e:
         if not quiet:
            self.alert( { "title": "Error",
                          "message": "Loading of {} failed".format(fname),
                          "detail": str(e) })
         
      if self.setup and "name" in self.setup:
         self.statusBar().showMessage("Ready to install \"{}\"".format(self.setup["name"]))
         self.btnInstall.setEnabled(True)
         return True
      else:
         self.statusBar().showMessage("No configuration loaded")
         self.btnInstall.setEnabled(False)
         return False
         
   def start_redirect(self):
      # connection to server thread to receive data
      # self.listener_thread.done.connect(self.on_bg_done)
      self._stdout = sys.stdout
      self._stderr = sys.stderr
      
      r, w = os.pipe()
      r, w = os.fdopen(r, 'r'), os.fdopen(w, 'w', 1)
      self._r = r
      self._w = w
      sys.stdout = self._w
      sys.stderr = self._w

      self.listener_thread = ListenerThread(
         { "text": self.text_out,
           "wfd": self._w,
           "rfd": self._r
         })
      self.listener_thread.msg.connect(self.text_out);
      self.listener_thread.start()

   def stop_redirect(self):
      self._w.close()
      self.listener_thread.wait()
      self._r.close()
      sys.stdout = self._stdout
      sys.stderr = self._stderr
      
   def alert(self, data):
      msg = QMessageBox()
      msg.setIcon(QMessageBox.Critical)
      if "title" in data: msg.setWindowTitle(data["title"])
      if "message" in data: msg.setText(data["message"])
      if "info" in data: msg.setInformativeText(data["info"])
      if "detail" in data: msg.setDetailedText(data["detail"])
      msg.exec_()
      
   def getfile(self):
      fname = QFileDialog.getOpenFileName(self, 'Open file', 
                     '.',"Installation file (*.json *.zip)")
      if fname[0]:
         self.fname.setText(fname[0])
         self.load_setup(fname[0])      

   def windows_full_port_name(self, portname):
      m = re.match("^COM(\d+)$", portname)
      if m and int(m.group(1)) < 10: return portname
      else: return "\\\\.\\{0}".format(portname)

   def get_port(self):
      port = self.cb.currentData().device;
      # On Windows fix the COM port path name for ports above 9 (see comment in
      # windows_full_port_name function).
      if platform.system() == "Windows":
         port = self.windows_full_port_name(port)

      return port
      
   def board_reset(self):
      self.text_out('Performing target reset...')
      try:
         # this will only take a short moment, so we are not doing this
         # in the background
         eport = self.get_port()
         args = Namespace(chip=self.setup["esptool"]["chip"], connect_attempts=self.setup["esptool"]["connect_attempts"])
         esp = esptool.get_default_connected_device(serial_list=[eport], port=eport, initial_baud=ESPROM_BAUD, chip=args.chip, connect_attempts=args.connect_attempts)
         esp.hard_reset()
         esp._port.close()
         self.text_out('ok\n')
      except Exception as e:
         self.text_out('failed: {}\n'.format(str(e)))

   def on_ampy_done(self, state):
      self.setup["ampy"]["board"].close()
      self.setup["ampy"]["board"] = None
      self.board_reset()
      
      if state:
         self.text_out("Installation done");      
         self.statusBar().showMessage("Installation successful");
      else:
         self.text_out("Installation failed");      
         self.statusBar().showMessage("File upload failed");
         
      self.btnInstall.setEnabled(True)

   def on_install_files(self):
      self.btnInstall.setEnabled(False)
         
      if not "ampy" in self.setup or not "files" in self.setup["ampy"]:
         self.text_out("No files to install\n");
         self.on_ampy_done(False)
         return

      self.text_out("Preparing to install files...\n");
      self.statusBar().showMessage("Installing files");

      port = self.get_port();
      
      try:
         self.setup["ampy"]["board"] = pyboard.Pyboard(port, baudrate=AMPY_BAUD, wait=1, rawdelay=0.1)
         self.setup["ampy"]["ampy_files"] = ampy.files.Files(self.setup["ampy"]["board"])
      except (pyboard.PyboardError, Exception) as e:
         self.alert( { "title": "Error",
                       "message": "Ampy error",
                       "info": "Exception when opening\n"+str(port),
                       "detail": str(e) } )
         return

      # run ampy in background
      self.setup["ampy"]["open"] = self.setup["open"]
      self.thread = AmpyThread(self.setup["ampy"])
      self.thread.alert.connect(self.alert)
      self.thread.text.connect(self.text_out)
      self.thread.done.connect(self.on_ampy_done)
      self.thread.start()
         
   def on_esptool_done(self, state):
      self.stop_redirect()
      if state:
         self.statusBar().showMessage("Firmware installed successfully");
      else:
         self.statusBar().showMessage("Firmware installation failed");
         self.btnInstall.setEnabled(True)

      if state:
         self.text_out("Waiting for firmware to boot ...\n")
         self.timer = QTimer()
         self.timer.setSingleShot(True)
         self.timer.timeout.connect(self.on_install_files)
         self.timer.start(3000)
      
   # run esptool in the background with output redirection
   def on_install_firmware(self):
      self.text.clear();
      self.btnInstall.setEnabled(False)

      if "esptool" in self.setup:
         self.statusBar().showMessage("Flashing firmware");
         self.setup["esptool"]["port"] = self.get_port()
         self.setup["esptool"]["open"] = self.setup["open"]
         self.thread = EspThread(self.setup["esptool"])

         # connection to server thread to receive data
         self.start_redirect()
         self.thread.alert.connect(self.alert)
         self.thread.done.connect(self.on_esptool_done)
         self.thread.start()
      else:
         self.on_install_files()

   def text_out(self, str, color=None):
      self.text.moveCursor(QTextCursor.End)
      if not hasattr(self, 'tf') or not self.tf:
         self.tf = self.text.currentCharFormat()
#         self.tf.setFontWeight(QFont.Bold);
      if color:
         tf = self.text.currentCharFormat()
         tf.setForeground(QBrush(QColor(color)))
         self.text.textCursor().insertText(str, tf);
      else:
         self.text.textCursor().insertText(str, self.tf);
            
   def gui(self):
      widget = QWidget()
      vbox = QVBoxLayout()           

      # create a dropdown list of serial ports
      self.cb = QComboBox()
      self.cb.setSizeAdjustPolicy(QComboBox.AdjustToMinimumContentsLengthWithIcon);
      ports = serial.tools.list_ports.comports()
      for p in ports:
         self.cb.addItem(str(p), p)
      vbox.addWidget(self.cb)

      # add a hbox for file name and selector
      fname_w = QWidget()
      fnamebox = QHBoxLayout()
      fname_w.setLayout(fnamebox)
      self.fname = QLineEdit();
      self.fname.setPlaceholderText("Please select a file")
      fnamebox.addWidget(self.fname)   
      fname_but = QPushButton("Select...")
      fname_but.pressed.connect(self.getfile)
      fnamebox.addWidget(fname_but)      
      vbox.addWidget(fname_w)

      # main text view
      self.text = QTextEdit()
      self.text.setReadOnly(True);
      self.text.setText("ftDuino32 installation tool\nPlease select the appropriate com "+
                        "port and a ZIP file containing the firmware you want to install "+
                        "and click the 'Install...' button below.")
      vbox.addWidget(self.text)

      # Test button
      self.btnInstall = QPushButton("Install...")
      self.btnInstall.pressed.connect(self.on_install_firmware)
      self.btnInstall.setEnabled(False)
      vbox.addWidget(self.btnInstall)            

      widget.setLayout(vbox)
      return widget
      
   def initUI(self):
      self.setCentralWidget(self.gui())
      self.resize(640,400)
      self.setWindowTitle("ftDuino32 installer")

      # quietly try to load the default file from file path or from current path
      default_file = os.path.join(os.path.dirname(os.path.realpath(__file__)), SETUP_JSON)
      if not self.load_setup(default_file, True):
         self.load_setup(SETUP_JSON, True)
         
      self.show()

if __name__ == '__main__':
   app = QApplication(sys.argv)
   a = Window(app)
   sys.exit(app.exec_())
