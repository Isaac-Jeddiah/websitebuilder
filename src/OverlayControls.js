// components/OverlayControls.js
import React from 'react';

const OverlayControls = ({ scale, setScale, resetView, editMode, setEditMode, panMode, setPanMode }) => (
  <div className="overlay-controls">
    <button onClick={() => setScale(s => Math.min(s + 0.1, 2))}>Zoom In</button>
    <button onClick={() => setScale(s => Math.max(s - 0.1, 0.2))}>Zoom Out</button>
    <button onClick={resetView}>Reset View</button>
    <hr />
    <button onClick={() => setEditMode(e => !e)}>
      {editMode ? 'Disable Edit ✏️' : 'Enable Edit ✏️'}
    </button>
    <button onClick={() => setPanMode(p => !p)}>
      {panMode ? 'Disable Pan 🖐️' : 'Enable Pan 🖐️'}
    </button>
  </div>
);

export default OverlayControls;
