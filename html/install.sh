#!/bin/bash
TARGET=html
ampy mkdir /$TARGET
MAIN="index.html common.js picnic.min.css.gz favicon.ico style.css robots.txt liveview.js zlib_and_gzip.min.js"
for i in $MAIN; do
    echo "Installing /${TARGET}/$i ..."
    ampy put $i /${TARGET}/$i
done
CM_DIRS="cm"
CM="cm.html cm/codemirror.css cm/codemirror.min.js.gz cm/python.js.gz"
for i in $CM_DIRS; do
    echo "Creating /${TARGET}/$i ..."
    ampy mkdir /${TARGET}/$i
done
for i in $CM; do
    echo "Installing /${TARGET}/$i ..."
    ampy put $i /${TARGET}/$i
done
BLOCKLY_DIRS="blockly blockly/media blockly/msg blockly/msg/js"
BLOCKLY="blockly.html blockly/code.js blockly/toolbox.xml blockly/blockly_compressed.js.gz blockly/blocks_compressed.js.gz blockly/python_compressed.js.gz blockly/media/1x1.gif blockly/media/click.ogg blockly/media/delete.mp3 blockly/media/delete.wav blockly/media/disconnect.ogg blockly/media/handclosed.cur blockly/media/handopen.cur blockly/media/quote1.png blockly/media/sprites.svg blockly/media/click.mp3 blockly/media/click.wav blockly/media/delete.ogg blockly/media/disconnect.mp3 blockly/media/disconnect.wav blockly/media/handdelete.cur blockly/media/quote0.png blockly/media/sprites.png blockly/msg/js/en.js.gz"
for i in $BLOCKLY_DIRS; do
    echo "Creating /${TARGET}/$i ..."
    ampy mkdir /${TARGET}/$i
done
for i in $BLOCKLY; do
    echo "Installing /${TARGET}/$i ..."
    ampy put $i /${TARGET}/$i
done

