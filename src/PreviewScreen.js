import React, { useState } from 'react';
import Canvas from './Canvass';
import Sidebar from './Sidebar';
import './index.css';

function PreviewScreen() {
  const [elements, setElements] = useState([]);
  const [viewMode, setViewMode] = useState('web');
  const [editMode, setEditMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  const addElement = (type, parentId = null) => {
    const newElement = {
      id: Date.now(),
      type,
      content: type === 'text' ? 'New Text' : 'Click Me',
      parentId,
      children: []
    };
    
    setElements(prevElements => {
      if (parentId) {
        return prevElements.map(el => {
          if (el.id === parentId) {
            return { ...el, children: [...el.children, newElement.id] };
          }
          return el;
        }).concat(newElement);
      }
      return [...prevElements, newElement];
    });
  };

  const updateElementContent = (id, newContent) => {
    setElements(prevElements =>
      prevElements.map(el =>
        el.id === id ? { ...el, content: newContent } : el
      )
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
         <Sidebar 
        addElement={addElement}
        setViewMode={setViewMode}
        elements={elements}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />
      <Canvas 
        elements={elements}
        viewMode={viewMode}
        editMode={editMode}
        setEditMode={setEditMode}
        updateElementContent={updateElementContent}
        setSelectedElement={setSelectedElement}
      />
    </div>
  );
}

export default PreviewScreen;