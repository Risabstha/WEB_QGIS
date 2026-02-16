import React, { useEffect, useRef } from 'react';
import './Qgis2threejs.css';
import './App.css';
import Popup from './components/Popup.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import NarrativeBox from './components/NarrativeBox.jsx';

function App() {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const guiRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Use global flag to prevent double initialization across React re-renders
    if (window.__Q3D_INITIALIZED__) {
      console.log('Q3D already initialized, skipping...');
      return;
    }
    
    // Prevent double initialization
    if (initializedRef.current) return;
    initializedRef.current = true;
    window.__Q3D_INITIALIZED__ = true;

    const initializeApp = async () => {
      try {
        // Scripts are now loaded in index.html, just wait for them to be available
        // Wait for THREE to be available
        let retries = 0;
        while (!window.THREE && retries < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          retries++;
        }
        if (!window.THREE) {
          throw new Error('THREE.js failed to load');
        }

        // Wait for Q3D to be available
        retries = 0;
        while (!window.Q3D && retries < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          retries++;
        }
        if (!window.Q3D) {
          throw new Error('Qgis2threejs failed to load');
        }

        // Define addDemBaseFill function
        const addDemBaseFill = (scene, options) => {
          const opts = options || {};
          const color = (opts.color !== undefined) ? opts.color : 0x5a4a3a;
          const depthRatio = (opts.depthRatio !== undefined) ? opts.depthRatio : 0.2;

          Object.keys(scene.mapLayers).forEach(function (id) {
            const layer = scene.mapLayers[id];
            if (!layer || layer.type !== window.Q3D.LayerType.DEM || !layer.blocks) return;

            layer.blocks.forEach(function (block) {
              if (!block || !block.obj || !block.data || !block.data.grid || !block.data.grid.array) return;
              if (block.obj.getObjectByName("side") || block.obj.getObjectByName("bottom")) return;

              const grid = block.data.grid.array;
              let min = Infinity;
              let max = -Infinity;
              for (let i = 0; i < grid.length; i++) {
                const v = grid[i];
                if (v < min) min = v;
                if (v > max) max = v;
              }
              if (!isFinite(min) || !isFinite(max)) return;

              let depth = (max - min) * depthRatio;
              if (depth === 0) depth = 1;

              const z0 = min - depth;
              const material = new window.THREE.MeshLambertMaterial({
                color: color,
                opacity: layer.opacity,
                transparent: layer.opacity < 1,
                side: window.THREE.DoubleSide
              });

              layer.materials.add(material);
              block.buildSides(layer, block.obj, material, z0);
            });

            layer.requestRender();
          });
        };

        // Initialize Q3D application
        if (window.Q3D && !window.app) {
          console.log('Initializing Q3D application...');
          
          window.Q3D.Config.localMode = true;
          window.Q3D.Config.autoAdjustCameraPos = false;
          
          // Initial camera view configuration
          // IMPORTANT: Only set viewpoint.default (not viewpoint.pos) to use relative coordinates
          // pos: Camera position (x, y, z) - relative coordinates, will be scaled by scene width
          // lookAt: Point camera is looking at (x, y, z) - relative coordinates
          // Example values: (0.5, -1.5, 0.5) means camera at center-x, 1.5x back, 0.5x up
          window.Q3D.Config.viewpoint = {
            default: {
              pos: new window.THREE.Vector3(0.5, -1.5, 0.5),  // Camera position: (x, y, z)
              lookAt: new window.THREE.Vector3(0, 0, 0)        // Look at point: (x, y, z)
            }
          };

          appRef.current = window.Q3D.application;
          guiRef.current = window.Q3D.gui;

          // Expose app and gui globally for scene.js to access
          window.app = appRef.current;
          window.gui = guiRef.current;

          // Listen for sceneLoaded event to set camera position
          appRef.current.addEventListener("sceneLoaded", function() {
            console.log('Scene loaded, setting custom camera position...');
            const scene = appRef.current.scene;
            if (scene && scene.userData.baseExtent) {
              const be = scene.userData.baseExtent;
              const origin = scene.userData.origin;
              const s = be.width;
              const pivot = new window.THREE.Vector3(be.cx, be.cy, scene.userData.origin.z)
                .sub(origin);
              
              // Use the configured viewpoint.default (relative coordinates)
              const vp = window.Q3D.Config.viewpoint.default;
              const lookAt = vp.lookAt.clone().multiplyScalar(s).add(pivot);
              lookAt.z *= scene.userData.zScale;
              
              const pos = vp.pos.clone().multiplyScalar(s).add(pivot);
              pos.z *= scene.userData.zScale;
              
              // Set camera position and target
              appRef.current.camera.position.copy(pos);
              appRef.current.camera.lookAt(lookAt);
              
              if (appRef.current.controls) {
                if (appRef.current.controls.target !== undefined) {
                  appRef.current.controls.target.copy(lookAt);
                }
                appRef.current.controls.update();
              }
              
              appRef.current.render();
              console.log('Camera position set to:', pos, 'Looking at:', lookAt);
            }
          });

          appRef.current.init(containerRef.current);

          // Load the scene
          appRef.current.loadSceneFile('./data/index/scene.js', 
            function (scene) {
              // Scene file has been loaded
              appRef.current.start();
              guiRef.current.dat.initLayersFolder(scene);
            }, 
            function (scene) {
              // All relevant files have been loaded
              addDemBaseFill(scene, { color: 0x5a4a3a, depthRatio: 0.25 });

              if (window.Q3D.Config.gui.customPlane) {
                var zMin = undefined,
                    zMax = undefined;
                guiRef.current.dat.initCustomPlaneFolder(zMin, zMax);
              }
            }
          );
        } else if (window.app) {
          console.log('Q3D already initialized, reusing existing instance');
          appRef.current = window.app;
          guiRef.current = window.gui;
        }
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    initializeApp();

    // Cleanup - Note: Don't cleanup in development mode due to React StrictMode
    return () => {
      // Only reset in production or when actually unmounting
      // Commented out to prevent issues with React development mode
      // initializedRef.current = false;
      // if (window.app) delete window.app;
      // if (window.gui) delete window.gui;
      // if (window.__Q3D_INITIALIZED__) delete window.__Q3D_INITIALIZED__;
    };
  }, []);

  return (
    <div className="App ">
      <div id="view" ref={containerRef}>
        <div id="northarrow"></div>
        <div id="navigation"></div>
      </div>

      <Popup />
      <ProgressBar />
      
      <div id="header"></div>
      <div id="footer"></div>

      <NarrativeBox />
    </div>
  );
}

export default App;
