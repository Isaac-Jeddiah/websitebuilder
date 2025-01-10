// WebsiteBuilder.jsx

import React, { useState,useEffect } from 'react';
import ThemeSelector from './ThemeSelector';
import ComponentPalette from './ComponentPalette';
import LivePreview from './LivePreview';
import CustomizationPanel from './CustomizationPanel';

import 'daisyui/dist/full.css'; // Include DaisyUI styles

const WebsiteBuilder = () => {
    const [selectedTheme, setSelectedTheme] = useState('light');
    const [components, setComponents] = useState([]); // Tracks components in the preview area
    const [activeComponent, setActiveComponent] = useState(null); // Tracks the selected component for customization
    useEffect(() => {
        const savedWebsite = localStorage.getItem('websiteData');
        if (savedWebsite) {
            const { components: savedComponents, theme } = JSON.parse(savedWebsite);
            setComponents(savedComponents);
            setSelectedTheme(theme);
        }
    }, []);

    useEffect(() => {
        if (components.length > 0) {
            const websiteData = {
                components,
                theme: selectedTheme,
                lastEdited: new Date().toISOString()
            };
            localStorage.setItem('websiteData', JSON.stringify(websiteData));
        }
    }, [components, selectedTheme]);

    // Save state on any changes
    // useEffect(() => {
    //     localStorage.setItem('websiteData', JSON.stringify({
    //         components,
    //         theme: selectedTheme,
    //         lastEdited: new Date().toISOString()
    //     }));
    // }, [components, selectedTheme]);

    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
    };
    const handleComponentSelect = (component) => {
        setActiveComponent(component);
    };
    const handleDeleteComponent = (id) => {
        setComponents(prev => prev.filter(comp => comp.id !== id));
        if (activeComponent?.id === id) {
            setActiveComponent(null);
        }
    };

    // const handleComponentEdit = (id, styles) => {
    //     setComponents(prevComponents => 
    //         prevComponents.map(comp => 
    //             comp.id === id ? { ...comp, styles: { ...comp.styles, ...styles } } : comp
    //         )
    //     );
    // };
    const handleComponentEdit = (id, styles) => {
        setComponents(prevComponents => 
            prevComponents.map(comp => 
                comp.id === id 
                    ? { ...comp, styles: { ...comp.styles, ...styles } }
                    : comp
            )
        );
        // Update active component to reflect changes
        setActiveComponent(prev => 
            prev?.id === id 
                ? { ...prev, styles: { ...prev.styles, ...styles } }
                : prev
        );
    };
    const handleComponentDrop = (component) => {
        // Generate unique ID for the new component
        const newComponent = {
            ...component,
            id: `${component.id}-${Date.now()}`
        };
        setComponents(prev => [...prev, newComponent]);
    };
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-base-200">
            {/* Left Sidebar */}
            <div className="w-full md:w-80 h-full overflow-y-auto border-r border-base-300">
                <div className="sticky top-0 bg-base-200 p-4 border-b border-base-300">
                    <ThemeSelector onThemeChange={handleThemeChange} />
                </div>
                <ComponentPalette onComponentDrop={handleComponentDrop} />
            </div>

            {/* Center Panel: Live Preview */}
            <div className="flex-1 h-full overflow-y-auto bg-base-300">
            <LivePreview 
                    components={components} 
                    theme={selectedTheme}
                    onComponentSelect={handleComponentSelect}
                    onComponentClick={setActiveComponent} 
                    onDeleteComponent={handleDeleteComponent}
                    onComponentEdit={handleComponentEdit} />
                
            </div>

            {/* Right Panel: Customization Options */}
            <div className="w-full md:w-80 h-full overflow-y-auto border-l border-base-300">
            {activeComponent && (
                    <CustomizationPanel 
                        component={activeComponent} 
                        onComponentEdit={handleComponentEdit}
                        onEdit={handleComponentEdit}
                        onDelete={handleDeleteComponent}
                    />
                )}
            </div>
        </div>
    );
};

export default WebsiteBuilder;
