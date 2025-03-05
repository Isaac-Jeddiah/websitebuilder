import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WebsitePublisher from './WebsitePublisher';

const LivePreview = ({ components, onComponentClick, onComponentSelect, theme, onDeleteComponent, onReorderComponents }) => {
    const navigate = useNavigate();

    const handleSaveAndPreview = () => {
        const websiteData = {
            components,
            theme,
            lastEdited: new Date().toISOString()
        };
        localStorage.setItem('websiteData', JSON.stringify(websiteData));
        navigate('/preview');
    };

    const handleDrop = (item, monitor, index) => {
        onComponentClick(item);
        if (index !== undefined) {
            onReorderComponents(item.index, index);
        } else {
            onComponentClick(item);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-full p-4 bg-base-300">
            <div className="sticky top-0 z-10 bg-base-300 p-4 flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Live Preview</h2>
                <div className="flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleSaveAndPreview}
                    >
                        Save & Preview
                    </button>
                    <WebsitePublisher
                        websiteData={{
                            components,
                            theme,
                            lastEdited: new Date().toISOString()
                        }}
                    />
                </div>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div
                    className="w-full max-w-4xl mx-auto bg-base-100 min-h-screen shadow-xl rounded-lg"
                    data-theme={theme}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {components.length === 0 ? (
                        <div className="h-96 flex items-center justify-center border-2 border-dashed border-base-300 rounded-lg m-4">
                            <p className="text-base-content/60">Drag components here</p>
                        </div>
                    ) : (
                        <div className="space-y-4 p-4">
                            {components.map((comp, index) => (
                                <DraggableComponent
                                
                                    key={comp.id}
                                    component={comp}
                                    index={index}
                                    onComponentSelect={onComponentSelect}
                                    onDeleteComponent={onDeleteComponent}
                                    onComponentClick={onComponentClick}
                                    onReorderComponents={onReorderComponents}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </DndProvider>
        </div>
    );
};

const DraggableComponent = ({ component, index, onComponentSelect, onDeleteComponent, onComponentClick, onReorderComponents }) => {
    const [, ref] = useDrag({
        type: 'COMPONENT',
        item: { ...component, index }
    });

    const [, drop] = useDrop({
        accept: 'COMPONENT',
        hover(item) {
            if (item.index !== index) {
                onReorderComponents(item.index, index);
                item.index = index;
            }
        }
    });

    return (
        <div
            ref={(node) => ref(drop(node))}
            className="relative group"
            onClick={() => onComponentSelect(component)}
        >
            <div
                className="hover:outline hover:outline-2 hover:outline-primary/20 rounded-lg"
                dangerouslySetInnerHTML={{ __html: component.template }}
                style={component.styles}
            />
            <button
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteComponent(component.id);
                }}
            >
                X
            </button>
        </div>
    );
};

export default LivePreview;
