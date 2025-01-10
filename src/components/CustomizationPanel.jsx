import React, { useState } from 'react';

const CustomizationPanel = ({ component, onEdit,onComponentEdit, onDelete }) => {
    const [activeTab, setActiveTab] = useState('typography');
    
    const tabs = [
        { id: 'typography', label: 'Text' },
        { id: 'layout', label: 'Layout' },
        { id: 'background', label: 'Background' },
        { id: 'border', label: 'Border' },
        { id: 'effects', label: 'Effects' }
    ];

    const fontFamilies = [
        'Arial', 'Helvetica', 'Roboto', 'Open Sans', 'Lato', 
        'Montserrat', 'Poppins', 'Inter'
    ];

    const fontWeights = [300, 400, 500, 600, 700];
    
    const renderTypographyTab = () => (
        <div className="space-y-4">
            <div>
                <label className="block font-medium mb-2">Font Family</label>
                <select 
                    className="select select-bordered w-full"
                    value={component.styles?.fontFamily || 'Arial'}
                    onChange={(e) => onEdit(component.id, { fontFamily: e.target.value })}
                >
                    {fontFamilies.map(font => (
                        <option key={font} value={font}>{font}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-medium mb-2">Font Weight</label>
                <select 
                    className="select select-bordered w-full"
                    value={component.styles?.fontWeight || '400'}
                    onChange={(e) => onEdit(component.id, { fontWeight: e.target.value })}
                >
                    {fontWeights.map(weight => (
                        <option key={weight} value={weight}>{weight}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-medium mb-2">
                    Font Size: {component.styles?.fontSize || '16px'}
                </label>
                <input
                    type="range"
                    min="12"
                    max="72"
                    className="range w-full"
                    onChange={(e) => onEdit(component.id, { fontSize: `${e.target.value}px` })}
                    value={parseInt(component.styles?.fontSize) || 16}
                />
            </div>

            <div>
                <label className="block font-medium mb-2">Text Color</label>
                <input
                    type="color"
                    className="w-full h-10"
                    onChange={(e) => onEdit(component.id, { color: e.target.value })}
                    value={component.styles?.color || '#000000'}
                />
            </div>

            <div>
                <label className="block font-medium mb-2">Text Align</label>
                <div className="btn-group w-full">
                    {['left', 'center', 'right'].map(align => (
                        <button
                            key={align}
                            className={`btn flex-1 ${component.styles?.textAlign === align ? 'btn-active' : ''}`}
                            onClick={() => onEdit(component.id, { textAlign: align })}
                        >
                            {align.charAt(0).toUpperCase() + align.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderLayoutTab = () => (
        <div className="space-y-4">
            <div>
                <label className="block font-medium mb-2">Padding (px)</label>
                <div className="grid grid-cols-2 gap-4">
                    {['top', 'right', 'bottom', 'left'].map(side => (
                        <div key={side}>
                            <label className="block text-sm mb-1">{side}</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                min="0"
                                max="100"
                                value={parseInt(component.styles?.[`padding${side.charAt(0).toUpperCase() + side.slice(1)}`]) || 0}
                                onChange={(e) => onEdit(component.id, { 
                                    [`padding${side.charAt(0).toUpperCase() + side.slice(1)}`]: `${e.target.value}px` 
                                })}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label className="block font-medium mb-2">Width</label>
                <select 
                    className="select select-bordered w-full"
                    value={component.styles?.width || 'auto'}
                    onChange={(e) => onEdit(component.id, { width: e.target.value })}
                >
                    <option value="auto">Auto</option>
                    <option value="100%">Full Width</option>
                    <option value="50%">Half Width</option>
                    <option value="25%">Quarter Width</option>
                </select>
            </div>
        </div>
    );

    const renderBackgroundTab = () => (
        <div className="space-y-4">
            <div>
                <label className="block font-medium mb-2">Background Color</label>
                <input
                    type="color"
                    className="w-full h-10"
                    onChange={(e) => onEdit(component.id, { backgroundColor: e.target.value })}
                    value={component.styles?.backgroundColor || '#ffffff'}
                />
            </div>

            <div>
                <label className="block font-medium mb-2">Background Opacity</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    className="range w-full"
                    onChange={(e) => onEdit(component.id, { opacity: e.target.value / 100 })}
                    value={(component.styles?.opacity || 1) * 100}
                />
            </div>
        </div>
    );

    const renderBorderTab = () => (
        <div className="space-y-4">
            <div>
                <label className="block font-medium mb-2">Border Style</label>
                <select 
                    className="select select-bordered w-full"
                    value={component.styles?.borderStyle || 'none'}
                    onChange={(e) => onEdit(component.id, { borderStyle: e.target.value })}
                >
                    {['none', 'solid', 'dashed', 'dotted'].map(style => (
                        <option key={style} value={style}>{style}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-medium mb-2">Border Width (px)</label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    className="range w-full"
                    onChange={(e) => onEdit(component.id, { borderWidth: `${e.target.value}px` })}
                    value={parseInt(component.styles?.borderWidth) || 0}
                />
            </div>

            <div>
                <label className="block font-medium mb-2">Border Color</label>
                <input
                    type="color"
                    className="w-full h-10"
                    onChange={(e) => onEdit(component.id, { borderColor: e.target.value })}
                    value={component.styles?.borderColor || '#000000'}
                />
            </div>

            <div>
                <label className="block font-medium mb-2">Border Radius (px)</label>
                <input
                    type="range"
                    min="0"
                    max="50"
                    className="range w-full"
                    onChange={(e) => onEdit(component.id, { borderRadius: `${e.target.value}px` })}
                    value={parseInt(component.styles?.borderRadius) || 0}
                />
            </div>
        </div>
    );

    const renderEffectsTab = () => (
        <div className="space-y-4">
            <div>
                <label className="block font-medium mb-2">Shadow</label>
                <select 
                    className="select select-bordered w-full"
                    value={component.styles?.boxShadow || 'none'}
                    onChange={(e) => onEdit(component.id, { boxShadow: e.target.value })}
                >
                    <option value="none">None</option>
                    <option value="0 2px 4px rgba(0,0,0,0.1)">Small</option>
                    <option value="0 4px 8px rgba(0,0,0,0.1)">Medium</option>
                    <option value="0 8px 16px rgba(0,0,0,0.1)">Large</option>
                </select>
            </div>

            <div>
                <label className="block font-medium mb-2">Hover Effect</label>
                <select 
                    className="select select-bordered w-full"
                    value={component.styles?.transition || 'none'}
                    onChange={(e) => onEdit(component.id, { 
                        transition: e.target.value,
                        ':hover': e.target.value === 'none' ? {} : {
                            transform: 'scale(1.05)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }
                    })}
                >
                    <option value="none">None</option>
                    <option value="all 0.3s ease">Scale Up</option>
                    <option value="all 0.3s ease">Fade</option>
                </select>
            </div>
        </div>
    );

    return (
        <div className="p-4 h-full bg-base-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Edit {component.type}</h3>
                <button 
                    onClick={() => onDelete(component.id)}
                    className="btn btn-error btn-sm"
                >
                    Delete
                </button>
            </div>

            <div className="tabs tabs-boxed mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                {activeTab === 'typography' && renderTypographyTab()}
                {activeTab === 'layout' && renderLayoutTab()}
                {activeTab === 'background' && renderBackgroundTab()}
                {activeTab === 'border' && renderBorderTab()}
                {activeTab === 'effects' && renderEffectsTab()}
            </div>
        </div>
    );
};

export default CustomizationPanel;