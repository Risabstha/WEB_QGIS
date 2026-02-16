# Copy assets from parent directory to public folder
Write-Host "Copying assets to public folder..." -ForegroundColor Green

# Create public directory if it doesn't exist
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public"
}

# Copy directories
Copy-Item -Path "..\threejs" -Destination "public\threejs" -Recurse -Force
Copy-Item -Path "..\dat-gui" -Destination "public\dat-gui" -Recurse -Force
Copy-Item -Path "..\data" -Destination "public\data" -Recurse -Force

# Copy files
Copy-Item -Path "..\Qgis2threejs.js" -Destination "public\" -Force
Copy-Item -Path "..\dat-gui_panel.js" -Destination "public\" -Force

Write-Host "Done! Assets copied successfully." -ForegroundColor Green
Write-Host "You can now run: npm install" -ForegroundColor Yellow
Write-Host "Then: npm start" -ForegroundColor Yellow
