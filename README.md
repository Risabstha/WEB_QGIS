## Prerequisites

- Node.js (version 14 or higher)
- npm

## Installation

1. Navigate to the react-app directory:
   ```bash
   cd react-app
   ```

2. Install dependencies: (React-vite)
   ```bash
   npm install
   ```

## Running the Application

Start the development server:
```bash
npm start
```

## Project Structure

```
react-app/
├── public/
│   ├── index.html
│   ├── threejs/          # Three.js library files (copied from parent)
│   ├── dat-gui/          # dat.GUI library files (copied from parent)
│   ├── Qgis2threejs.js   # Main Q3D library (copied from parent)
│   ├── dat-gui_panel.js  # GUI panel logic (copied from parent)
│   └── data/             # Scene data files (copied from parent)
├── src/
│   ├── components/
│   │   ├── Popup.js      # Popup component
│   │   ├── ProgressBar.js # Progress bar component
│   │   └── NarrativeBox.js # Narrative/animation box
│   ├── App.js            # Main application component
│   ├── App.css
│   ├── Qgis2threejs.css  # Original styles
│   ├── index.js
│   └── index.css
└── package.json
```

## Features

- Interactive 3D terrain visualization
- Camera controls (orbit, pan, zoom)
- Layer management
- Query and attribute display
- Keyboard shortcuts for navigation
- Animation support
- Cross-Section with graph

## Controls

### Mouse
- **Left button + Move**: Orbit
- **Mouse Wheel**: Zoom
- **Right button + Move**: Pan

### Keyboard
- **Arrow keys**: Move horizontally
- **Shift + Arrow keys**: Orbit
- **Ctrl + Arrow keys**: Rotate
- **Shift + Ctrl + Up/Down**: Zoom In/Out
- **L**: Toggle label visibility
- **R**: Start/Stop orbit animation
- **W**: Wireframe mode
- **Shift + R**: Reset camera position
- **Shift + S**: Save image

## Notes

- The application loads external JavaScript libraries dynamically on mount
- Three.js and related libraries are loaded from the `public` folder
- Scene data is loaded from `public/data/index/scene.js`
- The original Qgis2threejs functionality is preserved

## Technologies Used

- React 18
- Three.js
- dat.GUI
- Qgis2threejs plugin

## License

This project uses code from Qgis2threejs, which is licensed under the MIT License.
