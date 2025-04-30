// CanvasEditor.jsx
import React, { useState } from "react";

export default function CanvasEditor({ tree }) {
  const [scale, setScale] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const renderTree = (node) => {
    const Component = node.type;
    return (
      <Component
        key={node.id}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(node.id);
        }}
        style={{
          ...node.props.style,
          outline: selectedId === node.id ? "2px dashed red" : "none",
        }}
      >
        {node.children && node.children.map(renderTree)}
        {node.props.children}
      </Component>
    );
  };

  return (
    <div
      className="flex-1 relative bg-white overflow-hidden"
      onWheel={(e) => {
        setScale((prev) => Math.max(0.5, Math.min(2, prev - e.deltaY * 0.001)));
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        {tree.map(renderTree)}
      </div>
    </div>
  );
}
