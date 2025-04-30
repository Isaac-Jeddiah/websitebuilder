// components/Canvas.js
import React, { useRef, useState, useEffect } from 'react';
import './Canvas.css';
import { FaEdit, FaSearchPlus, FaSearchMinus, FaRedo, FaHandPaper, FaMobile, FaDesktop, FaLaptop } from 'react-icons/fa';

const Canvas = ({ 
  elements, 
  viewMode, 
  editMode, 
  setEditMode, 
  updateElementContent,
  setSelectedElement 
}) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const [isPanning, setIsPanning] = useState(false);

  const onWheel = (e) => {
    e.preventDefault();
    const zoom = e.deltaY < 0 ? 0.1 : -0.1;
    setScale(prev => Math.min(Math.max(prev + zoom, 0.2), 2));
  };

  const onMouseDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const onMouseMove = (e) => {
    if (dragStart) {
      setOffset(prev => ({
        x: prev.x + (e.clientX - dragStart.x),
        y: prev.y + (e.clientY - dragStart.y),
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const onMouseUp = () => {
    setDragStart(null);
  };

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('wheel', onWheel);
    return () => canvas.removeEventListener('wheel', onWheel);
  }, []);
 
  const [editingElement, setEditingElement] = useState(null);

  const handleElementClick = (element, e) => {
    e.stopPropagation();
    setSelectedElement(element.id);
    
    if (editMode) {
      setEditingElement(element.id);
    }
  };
  const handleInputChange = (element, newContent) => {
    updateElementContent(element.id, newContent);
  };

  const handleInputBlur = () => {
    setEditingElement(null);
  };
  
  const Element = ({ element }) => (
    <div
      className={`element ${element.type} ${editMode ? 'editable' : ''}`}
      onClick={(e) => handleElementClick(element, e)}
    >
      {editMode && editingElement === element.id ? (
        <input
          type="text"
          value={element.content}
          onChange={(e) => handleInputChange(element, e.target.value)}
          onBlur={handleInputBlur}
          autoFocus
          className="element-input"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        element.content
      )}
      {element.children && element.children.map(childId => {
        const childElement = elements.find(el => el.id === childId);
        return childElement ? <Element key={childId} element={childElement} /> : null;
      })}
    </div>
  );
  
  
    return (
      <div
        ref={canvasRef}
        className="canvas-container bg-gray-100 p-8 min-h-screen"
        onMouseDown={!editMode ? onMouseDown : undefined}
        onMouseMove={!editMode ? onMouseMove : undefined}
        onMouseUp={!editMode ? onMouseUp : undefined}
      >
        <div className="flex justify-center">
          {/* Web View */}
          <div className="flex flex-col items-center">
            
            <div
              className={`canvas-content web bg-black rounded-lg shadow-lg p-6`}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                minWidth: '800px',
                minHeight: '600px',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
              <FaLaptop className="text-gray-600 text-xl" />
              <h2 className="font-bold text-lg text-gray-700">Web View</h2>
            </div>
              {elements.map((el) => (
                !el.parentId && <Element key={el.id} element={el} />
              ))}
            </div>
          </div>
  
          {/* Mobile View */}
          <div className="flex flex-col items-center">
            
            <div
              className={`canvas-content mobile bg-black rounded-lg shadow-lg p-4`}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                
                minHeight: '600px',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
            <FaMobile className="text-gray-600 text-xl" />
            <h2 className="font-bold text-lg text-gray-700">Mobile View</h2>
          </div>
              {elements.map((el) => (
                !el.parentId && <Element key={el.id} element={el} />
              ))}
            </div>
          </div>
        </div>
  
        <div className="overlay-controls">
          <button onClick={() => setEditMode(!editMode)} className="control-btn">
            <FaEdit /> {editMode ? 'Done' : 'Edit'}
          </button>
          <button onClick={() => setIsPanning(!isPanning)} className="control-btn">
            <FaHandPaper /> {isPanning ? 'Done' : 'Pan'}
          </button>
          <button onClick={() => setScale(prev => Math.min(prev + 0.1, 2))} className="control-btn">
            <FaSearchPlus />
          </button>
          <button onClick={() => setScale(prev => Math.max(prev - 0.1, 0.2))} className="control-btn">
            <FaSearchMinus />
          </button>
          <button onClick={resetView} className="control-btn">
            <FaRedo />
          </button>
        </div>
      </div>
    );
  };
  export default Canvas;