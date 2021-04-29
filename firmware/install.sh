#!/bin/bash
for i in boot.py main.py ftduino.py gui.py llvgl.py mqtt.py http_server.py ; do
    echo "Put $i ..."
    ampy put $i $i
done

ampy mkdir /pages
for i in pages/main.py pages/wifi.py pages/apps.py; do
    echo "Put $i ..."
    ampy put $i $i
done

ampy mkdir /apps
for i in apps/*.py apps/*.xml; do
    echo "Put $i ..."
    ampy put $i $i
done
