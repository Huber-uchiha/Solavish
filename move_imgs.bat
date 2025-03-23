@echo off
echo Creating imgs directory if it doesn't exist...
mkdir imgs

echo Moving image files to the imgs directory...
move *.png imgs\
move *.jpg imgs\
move *.jpeg imgs\
move *.gif imgs\

echo Moving image files from subdirectories to the imgs directory...
for /r %%i in (*.png *.jpg *.jpeg *.gif) do move "%%i" imgs\

echo Done!