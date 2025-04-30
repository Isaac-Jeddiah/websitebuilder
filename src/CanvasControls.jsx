// CanvasControls.jsx
import React from "react";

export default function CanvasControls({ onAddElement }) {
  return (
    <div className="p-4 bg-gray-100 w-40 flex flex-col gap-4">
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => onAddElement("h1")}
      >
        Add Heading
      </button>
      <button
        className="bg-green-500 text-white p-2 rounded"
        onClick={() => onAddElement("button")}
      >
        Add Button
      </button>
    </div>
  );
}
