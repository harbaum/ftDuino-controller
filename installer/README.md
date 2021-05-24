# ftDuino32 installer

The ftDuino32 installer provides an easy to use solution to install
Micropython and related files on an ESP32.

![Windows screenshot of the installer](installer_win.png)

The ftDuino32 installer is written in Python and Qt and includes esptool
and ampy. For simplicity it can be compiled into a single binary e.g.
for Windows.

## For end users

As an end user you simple run the provided executable (e.g. a windows exe),
select the right COM port, select a ZIP file containing the firmware files
to install and click "Install..." and wait a few minutes for the installation
to succeed.

## For developers

As a developer you simply provide the ready-to-run windows executable
together with a prepared ZIP file. The zip file includes all the
required files together with a [config file](setup.json) that provides
additional information for the flashing process.
