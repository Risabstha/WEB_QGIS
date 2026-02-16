@echo off
echo Copying assets to public folder...

xcopy /E /I /Y "..\threejs" "public\threejs"
xcopy /E /I /Y "..\dat-gui" "public\dat-gui"
copy /Y "..\Qgis2threejs.js" "public\"
copy /Y "..\dat-gui_panel.js" "public\"
xcopy /E /I /Y "..\data" "public\data"

echo Done! Assets copied successfully.
echo You can now run: npm install
echo Then: npm start
pause
