# Makefile

# This Makefile builds a self contained binary of the ftduino32 installer

# Needed in preparation:
# wget https://www.python.org/ftp/python/3.9.5/python-3.9.5-amd64.exe
# wine python-3.9.5-amd64.exe
# wine "$PY"/Scripts/pip install pyinstaller PyQt5 pyserial

PY=~/.wine/drive_c/users/harbaum/Local\ Settings/Application\ Data/Programs/Python/Python39
WINE=wine
PRJ=ftduino32_installer

all: run

run:
	./$(PRJ).py

run_win:
	$(WINE) $(PY)/python $(PRJ).py

exe:
	$(WINE) $(PY)/Scripts/pyinstaller --noconsole --onefile $(PRJ).py
#	$(WINE) $(PY)/Scripts/pyinstaller --onefile $(PRJ).py

run_exe:
	$(WINE) ./dist/$(PRJ).exe
