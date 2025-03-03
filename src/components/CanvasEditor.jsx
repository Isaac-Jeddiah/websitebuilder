import React, { useState, useRef, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const CanvasEditor = ({ components, onComponentClick,setComponents, onComponentSelect, onDeleteComponent, onReorderComponents, theme }) => {
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 2000 }); // Initial canvas size
  const [showPixelGrid, setShowPixelGrid] = useState(true);
  const [scale, setScale] = useState(1);
  const transformComponentRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const initialCanvasPosition = useRef({ x: 0, y: 0 }); // Store initial canvas position
  
  const handleSaveAndPreview = () => {
    const websiteData = { components, theme, lastEdited: new Date().toISOString() };
    localStorage.setItem('websiteData', JSON.stringify(websiteData));
    navigate('/preview');
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.2));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    if (transformComponentRef.current) {
      transformComponentRef.current.resetTransform();
    }
  };

  const handleComponentDrag = (id, newPosition) => {
    setComponents(prevComponents =>
      prevComponents.map(comp =>
        comp.id === id ? { ...comp, position: newPosition } : comp
      )
    );
  };

  const { width, height } = canvasSize;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'component',
    drop: (item, monitor) => {
      const dropPosition = monitor.getClientOffset();
      if (!dropPosition) return;

      const canvasRect = transformComponentRef.current.wrapperComponent.getBoundingClientRect();
      const x = (dropPosition.x - canvasRect.left) / scale;
      const y = (dropPosition.y - canvasRect.top) / scale;
      const snappedX = Math.round(x);
      const snappedY = Math.round(y);

      if (item.index !== undefined) {
        onReorderComponents(item.index, components.length);
      } else {
        onComponentClick({ ...item, x: snappedX, y: snappedY }); // Pass snapped coordinates
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleCanvasClick = (e) => {
    e.stopPropagation();
  };

  const renderPixelGrid = () => {
    if (!showPixelGrid || zoomLevel < 2) return null;

    const grid = [];
    for (let i = 0; i < width * zoomLevel; i += 10) {
      grid.push(<line key={`v${i}`} x1={i} y1="0" x2={i} y2={height * zoomLevel} stroke="#ccc" strokeWidth="1" />);
    }
    for (let j = 0; j < height * zoomLevel; j += 10) {
      grid.push(<line key={`h${j}`} x1="0" y1={j} x2={width * zoomLevel} y2={j} stroke="#ccc" strokeWidth="1" />);
    }
    return <g>{grid}</g>;
  };
    // Function to handle double click
    const handleDoubleClick = (component) => {
      onComponentSelect(component);
    };
  return (
    
      
        
          <>
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <button onClick={handleResetZoom}>Reset Zoom</button>
            <button onClick={handleSaveAndPreview}>Save & Preview</button>
          
        
        
          <TransformWrapper
            defaultScale={1}
            minScale={0.2}
            maxScale={4}
            onZoom={(scale) => {
              setScale(scale);
            }}
            onInit={(transformComponent) => {
              transformComponentRef.current = transformComponent;
            }}
            onWheel={(e) => e.stopPropagation()}
            onPinch={(e) => e.stopPropagation()}
          >
            <TransformComponent
              ref={transformComponentRef}
              contentStyle={{ width: `${width}px`, height: `${height}px` }}
              wrapperStyle={{ width: '100%', height: '800px' }}
            >
              
                
 
                
                {renderPixelGrid()}
              
            </TransformComponent>
          </TransformWrapper>
        
        
          
            Return to Origin
          
        
      
    </>
  );
};

export default CanvasEditor;
