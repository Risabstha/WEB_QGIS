import { IoClose } from "react-icons/io5";

const Popup = () => {
  return (
    <div id="popup" className="absolute">
      <div id="popupbar" className=" absolute"></div>
      <div id="popupbody " className="bg-black text-white  mx-2">
        <div id="popupcontent" className="absolute"></div>

        {/* query result */}
        <div id="queryresult" className="my-2  mx-2">
          <table id="qr_coords_table" className="w-full ">
            <div className=" flex justify-between w-full px-1 py-1.5 border-b border-gray-600">
              <caption className="bg-black text-white">
                Coordinates (x, y, z)
                {/* <div id="zoomtopoint" className="action-zoom zoombtn"></div> */}
              </caption>
              <div id="closebtn" className="bg-black text-white "><IoClose size={18}/></div>
            </div>

            <tbody>
              <tr>
                <td id="qr_coords" className="bg-black text-white px-1  py-1.5 border-b border-gray-400"></td>
              </tr>
            </tbody>
          </table>

          {/* <table id="qr_layername_table">
            <caption>
              Layer 
              <div id="zoomtolayer" className="action-zoom zoombtn"></div>
            </caption>
            <tbody>
              <tr><td id="qr_layername"></td></tr>
            </tbody>
          </table> */}

          {/* <table id="qr_attrs_table">
            <caption>Attributes</caption>
            <tbody></tbody>
          </table> */}

          {/* camera actions and measure tool */}
          {/* <div id="orbitbtn" className="action-btn action-orbit">Orbit</div> */}
          <div
            id="measurebtn"
            className="action-btn bg-black  text-white my-1"
          >
            Measure Cross-Section
          </div>
        </div>

        {/* page info */}
        <div id="pageinfo">
          {/* <h1>Current View URL</h1>
          <div>
            <input id="urlbox" type="text" />
          </div> */}

          <h1 className="heading">Keyboard Controls</h1>
          <table id="usage">
            <tbody>
              <tr>
                <td colSpan="2" className="star">
                  Mouse
                </td>
              </tr>
              <tr>
                <td className="rows_help">Left button + Move</td>
                <td>Orbit</td>
              </tr>
              <tr>
                <td className="rows_help">Mouse Wheel</td>
                <td className="rows_help">Zoom</td>
              </tr>
              <tr>
                <td className="rows_help">Right button + Move</td>
                <td className="rows_help">Pan</td>
              </tr>

              <tr>
                <td colSpan="2" className="star">
                  Keys
                </td>
              </tr>
              <tr>
                <td className="rows_help">Arrow keys</td>
                <td className="rows_help">Move Horizontally</td>
              </tr>
              <tr>
                <td className="rows_help">Shift + Arrow keys</td>
                <td className="rows_help">Orbit</td>
              </tr>
              <tr>
                <td className="rows_help">Ctrl + Arrow keys</td>
                <td className="rows_help">Rotate</td>
              </tr>
              <tr>
                <td className="rows_help">Shift + Ctrl + Up / Down</td>
                <td className="rows_help">Zoom In / Out</td>
              </tr>
              <tr>
                <td className="rows_help">L</td>
                <td className="rows_help">Toggle Label Visibility</td>
              </tr>
              {/* <tr>
                <td>R</td>
                <td>Start / Stop Orbit Animation</td>
              </tr> */}
              <tr>
                <td className="rows_help">W</td>
                <td className="rows_help">Wireframe Mode</td>
              </tr>
              <tr>
                <td className="rows_help">Shift + R</td>
                <td className="rows_help">Reset Camera Position</td>
              </tr>
              <tr>
                <td className="rows_help">Shift + S</td>
                <td className="rows_help">Save Image</td>
              </tr>
            </tbody>
          </table>
      
        </div>
      </div>
    </div>
  );
};

export default Popup;
