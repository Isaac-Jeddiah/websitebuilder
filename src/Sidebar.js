import React from 'react';
import { FaFont, FaSquare, FaPlus, FaHeading } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ addElement, setViewMode, elements, selectedElement,setSelectedElement }) => {
  const handleElementClick = (elementId) => {
    setSelectedElement(elementId);
  };

  const renderTreeItem = (element) => {
    const isSelected = element.id === selectedElement;
    
    return (
      <div 
        key={element.id} 
        className={`tree-item ${isSelected ? 'selected' : ''}`}
        onClick={() => handleElementClick(element.id)}
      >
        <span>{element.content}</span>
        {element.type === 'header' && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addElement('text', element.id);
            }}
          >
            <FaPlus /> Add Text
          </button>
        )}
        {element.children && element.children.length > 0 && (
          <div className="tree-children">
            {element.children.map(childId => {
              const childElement = elements.find(el => el.id === childId);
              return childElement ? renderTreeItem(childElement) : null;
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="component-buttons">
        <button onClick={() => addElement('header')}>
          <FaHeading /> Add Header
        </button>
        <button onClick={() => addElement('text')}>
          <FaFont /> Add Text
        </button>
        <button onClick={() => addElement('button')}>
          <FaSquare /> Add Button
        </button>
      </div>
      
      <div className="view-controls">
        <strong>View Mode:</strong>
        <button onClick={() => setViewMode('web')}>Web</button>
        <button onClick={() => setViewMode('mobile')}>Mobile</button>
      </div>

      <div className="component-tree">
        <strong>Component Tree</strong>
        {elements.filter(el => !el.parentId).map(renderTreeItem)}
      </div>
    </div>
  );
};

export default Sidebar;