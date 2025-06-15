import React, { useState,useEffect,useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const CustomizationPanel = ({ component, onEdit,onComponentEdit, onDelete }) => {
    const [activeTab, setActiveTab] = useState('typography');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [componentText, setComponentText] = useState(component?.content || '');
    const [filteredOptions, setFilteredOptions] = useState([]);

      const [tabSearchQuery, setTabSearchQuery] = useState('');
   
    const tabs = [
        { id: 'typography', label: 'Text', color: '#4A90E2' },
        { id: 'layout', label: 'Layout', color: '#50C878' },
        { id: 'background', label: 'Background', color: '#FFB6C1' },
        { id: 'border', label: 'Border', color: '#DDA0DD' },
        { id: 'effects', label: 'Effects', color: '#F4A460' }
    ];

    const allEditOptions = {
        typography: [
            { id: 'font-family', label: 'Font Family' },
            { id: 'font-weight', label: 'Font Weight' },
            { id: 'font-size', label: 'Font Size' },
            { id: 'text-color', label: 'Text Color' },
            { id: 'text-align', label: 'Text Align' },
            { id: 'line-height', label: 'Line Height' },
            { id: 'letter-spacing', label: 'Letter Spacing' },
            { id: 'text-transform', label: 'Text Transform' },
            { id: 'text-decoration', label: 'Text Decoration' },
            { id: 'font-style', label: 'Font Style' }
        ],
        layout: [
            { id: 'width', label: 'Width' },
            { id: 'height', label: 'Height' },
            { id: 'position', label: 'Position' },
            { id: 'top', label: 'Top' },
            { id: 'right', label: 'Right' },
            { id: 'bottom', label: 'Bottom' },
            { id: 'left', label: 'Left' },
            { id: 'margin', label: 'Margin' },
            { id: 'padding', label: 'Padding' },
            { id: 'display', label: 'Display' },
            { id: 'flex-direction', label: 'Flex Direction' },
            { id: 'justify-content', label: 'Justify Content' },
            { id: 'align-items', label: 'Align Items' },
            { id: 'align-self', label: 'Align Self' },
            { id: 'flex-wrap', label: 'Flex Wrap' },
            { id: 'order', label: 'Order' },
            { id: 'align-content', label: 'Align Content' },
            { id: 'gap', label: 'Gap' },
            { id: 'column-gap', label: 'Column Gap' },],
            background: [
                { id: 'background-color', label: 'Background Color' },
                { id: 'background-image', label: 'Background Image' },
                { id: 'background-size', label: 'Background Size' },
                { id: 'background-position', label: 'Background Position' },
                { id: 'background-repeat', label: 'Background Repeat' },
                { id: 'background-attachment', label: 'Background Attachment' },
                { id: 'background-origin', label: 'Background Origin' },
                { id: 'background-clip', label: 'Background Clip' },
                { id: 'background-blend-mode', label: 'Background Blend Mode' },
                { id: 'background-opacity', label: 'Background Opacity' },
            ],
            border: [
                { id: 'border-style', label: 'Border Style' },
                { id: 'border-width', label: 'Border Width' },
                { id: 'border-color', label: 'Border Color' },
                { id: 'border-radius', label: 'Border Radius' },
                { id: 'border-top-left-radius', label: 'Border Top Left Radius' },
                { id: 'border-top-right-radius', label: 'Border Top Right Radius' },
                { id: 'border-bottom-left-radius', label: 'Border Bottom Left Radius' },
                { id: 'border-bottom-right-radius', label: 'Border Bottom Right Radius' },
                { id: 'border-image', label: 'Border Image' },
                { id: 'border-image-source', label: 'Border Image Source' },
                { id: 'border-image-slice', label: 'Border Image Slice' },
                { id: 'border-image-width', label: 'Border Image Width' },
                { id: 'border-image-outset', label: 'Border Image Outset' },
                { id: 'border-image-repeat', label: 'Border Image Repeat' },
                { id: 'border-image-slice', label: 'Border Image Slice' },
                { id: 'border-image-width', label: 'Border Image Width' },
                { id: 'border-image-outset', label: 'Border Image Outset' },
                { id: 'border-image-repeat', label: 'Border Image Repeat' },
                { id: 'border-image-slice', label: 'Border Image Slice' },],
                effects: [
                    { id: 'box-shadow', label: 'Box Shadow' },
                    { id: 'text-shadow', label: 'Text Shadow' },
                    { id: 'filter', label: 'Filter' },
                    { id: 'transform', label: 'Transform' },
                    { id: 'transition', label: 'Transition' },
                    { id: 'animation', label: 'Animation' },
                    { id: 'opacity', label: 'Opacity' },
                    { id: 'visibility', label: 'Visibility' },
                    { id: 'z-index', label: 'Z-Index' },
                    { id: 'display', label: 'Display' },
                    { id: 'flex-direction', label: 'Flex Direction' },
                    { id: 'justify-content', label: 'Justify Content' },
                    { id: 'align-items', label: 'Align Items' },
                    { id: 'align-self', label: 'Align Self' },
                    { id: 'flex-wrap', label: 'Flex Wrap' },
                    { id: 'order', label: 'Order' },]

        // Add more options for other tabs...
    };
    const fontFamilies = [
        'Arial', 'Helvetica', 'Roboto', 'Open Sans', 'Lato', 
        'Montserrat', 'Poppins', 'Inter'
    ];
    const [componentTextMap, setComponentTextMap] = useState({});
    
    const fontWeights = [300, 400, 500, 600, 700];
    const [editMode, setEditMode] = useState(null);
    const [editValue, setEditValue] = useState('');
    const updatingRef = useRef(false);
    useEffect(() => {
        if (component && !updatingRef.current) {
            const textMap = extractTextFromTemplate(component.template);
            setComponentTextMap(textMap);
        }
    }, [component]);

    const extractTextFromTemplate = (template) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(template, 'text/html');
        const textElements = doc.querySelectorAll('*:not(:has(*))');
        const textMap = {};
        textElements.forEach((element, index) => {
            if (element.innerText.trim()) {
                textMap[`text-${index}`] = element.innerText;
            }
        });
        return textMap;
    };

     // Handle text change for a specific component
  const handleTextChange = (key, value) => {
    updatingRef.current = true;
    
    try {
      // Update local state
      const updatedTextMap = { ...componentTextMap, [key]: value };
      setComponentTextMap(updatedTextMap);
      
      // Find the original text to replace
      const originalText = componentTextMap[key];
      
      if (!originalText) {
        console.warn('Could not find original text to replace');
        return;
      }
      
      // Create a precise regex to target the specific text
      const regex = new RegExp(`(<[^>]*>)([^<]*${escapeRegExp(originalText)}[^<]*)(<[^>]*>)`, 'g');
      const newContent = `$1${value}$3`;
      
      // Update the template
      let updatedTemplate = component.template.replace(regex, newContent);
      
      // Fallback if no replacement was made
      if (updatedTemplate === component.template) {
        updatedTemplate = component.template.replace(originalText, value);
      }
      
      // Call parent component's update function
      onComponentEdit(component.id, { template: updatedTemplate });
    } finally {
      // Reset updating flag
      setTimeout(() => {
        updatingRef.current = false;
      }, 300);
    }
  };

    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Handle edit mode
    const startEditing = (key) => {
        setEditMode(key);
        setEditValue(componentTextMap[key]);
    };

    // Save changes
    const saveEdit = (key) => {
        // Only save if there are actual changes
        if (editValue !== componentTextMap[key]) {
            handleTextChange(key, editValue);
        }
        setEditMode(null);
    };

    // Handle keyboard events
    const handleKeyDown = (e, key) => {
        if (e.key === 'Enter') {
            saveEdit(key);
        } else if (e.key === 'Escape') {
            setEditMode(null);
        }
    };

    const renderTypographyTab = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 p-4 rounded-lg bg-base-200"
        >
            

            <div>
                <label className="block font-medium mb-2">Font Family</label>
                <select
                    className="select select-bordered w-full"
                    value={component.styles?.fontFamily || 'Arial'}
                    onChange={(e) => onEdit(component.id, { fontFamily: e.target.value })}
                >
                    {['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'].map((font) => (
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
                    {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map((weight) => (
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
                    {['left', 'center', 'right'].map((align) => (
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
        </motion.div>
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
    const TabSearch = ({ tabId }) => (
        <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                className="input input-bordered w-full pl-10 pr-10"
                placeholder={`Search ${tabId} options...`}
                value={tabSearchQuery}
                onChange={(e) => setTabSearchQuery(e.target.value)}
            />
            {tabSearchQuery && (
                <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-100 p-1 rounded"
                    onClick={() => setTabSearchQuery('')}
                >
                    <FiX className="w-4 h-4" />
                </button>
            )}
        </div>
    );
    const renderTabContent = () => {
        const currentTabOptions = allEditOptions[activeTab] || [];
        const filteredOptions = tabSearchQuery
            ? currentTabOptions.filter(option =>
                option.label.toLowerCase().includes(tabSearchQuery.toLowerCase())
            )
            : currentTabOptions;

        return (
            <div className="space-y-4">
                <TabSearch tabId={activeTab} />
                {filteredOptions.map(option => (
                    // Render your edit components based on option.id
                    <div key={option.id} className="bg-white p-4 rounded-lg shadow-sm">
                        {/* Render specific edit component based on option.id */}
                    </div>
                ))}
            </div>
        );
    };
    
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

            {/* Enhanced tabs with animations */}
            <div className="p-4">
      <div 
        className="bg-gray-100 rounded-full p-2 overflow-x-auto no-scrollbar shadow-md"
        style={{ 
          width: '400px', 
          maxWidth: '100%',
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
      >
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-full transition-all duration-300 ease-in-out
                text-sm font-medium whitespace-nowrap
                focus:outline-none
              `}
              style={{
                backgroundColor: activeTab === tab.id 
                  ? tab.color 
                  : 'transparent',
                color: activeTab === tab.id 
                  ? 'white' 
                  : 'rgba(0,0,0,0.7)',
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.2 }
              }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
        {/* Search Results Overlay */}
       
            <div className="overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                {activeTab === 'typography' && renderTypographyTab()}
                {activeTab === 'layout' && renderLayoutTab()}
                {activeTab === 'background' && renderBackgroundTab()}
                {activeTab === 'border' && renderBorderTab()}
                {activeTab === 'effects' && renderEffectsTab()}
            </div>
        </div>
    );
};

const styles = `
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default CustomizationPanel;