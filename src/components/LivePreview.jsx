import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';
import WebsitePublisher from './WebsitePublisher'

const LivePreview = ({ components, onComponentClick,onComponentSelect,theme,onDeleteComponent }) => {
    

    const handleDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('component');
        if (data) {
            const component = JSON.parse(data);
            onComponentClick(component);
        }
    };
    const navigate = useNavigate();

    const handleSaveAndPreview = () => {
        // Save the current state to localStorage
        const websiteData = {
            components,
            theme,
            lastEdited: new Date().toISOString()
        };
        localStorage.setItem('websiteData', JSON.stringify(websiteData));
        navigate('/preview');
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
     
    };

    return (
        // <div className="min-h-full p-4 bg-base-300">
        //    <div 
        //         className="w-full max-w-4xl mx-auto bg-base-100 min-h-screen shadow-xl rounded-lg"
        //         data-theme={theme}
        //         onDrop={handleDrop}
        //         onDragOver={(e) => e.preventDefault()}
        //     >
                
        //         {components.length === 0 ? (
        //             <div className="h-96 flex items-center justify-center border-2 border-dashed border-base-300 rounded-lg m-4">
        //                 <p className="text-base-content/60">Drag components here</p>
        //             </div>
        //         ) : (
        //             <div className="space-y-4 p-4">
        //                 {components.map((comp) => (
        //                     <div>
        //                     <div 
        //                         key={comp.id}
        //                         className="relative group transition-all hover:outline hover:outline-2 
        //                                  hover:outline-primary/20 rounded-lg"
        //                         dangerouslySetInnerHTML={{ __html: comp.template }}
        //                     />
        //                     <button
        //                             className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        //                             onClick={(e) => {
        //                                 e.stopPropagation();
        //                                 onDeleteComponent(comp.id);
        //                             }}
        //                         >
        //                             ×
        //                         </button>
        //                         </div>
        //                 ))}
                        
        //             </div>
        //         )}
                
        //     </div>
        // </div>
        <div className="min-h-full p-4 bg-base-300">
            {/* Save & Preview Button */}
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
            <div 
                className="w-full max-w-4xl mx-auto bg-base-100 min-h-screen shadow-xl rounded-lg"
                data-theme={theme}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {components.length === 0 ? (
                    <div className="h-96 flex items-center justify-center border-2 border-dashed border-base-300 rounded-lg m-4">
                        <p className="text-base-content/60">Drag components here</p>
                    </div>
                ) : (
                    <div className="space-y-4 p-4">
                        {components.map((comp) => (
                            <div
                                key={comp.id}
                                className="relative group"
                                onClick={() => onComponentSelect(comp)}
                            >
                                <div 
        className="hover:outline hover:outline-2 hover:outline-primary/20 rounded-lg"
        dangerouslySetInnerHTML={{ 
            __html: comp.template
        }}
        style={comp.styles}
    />
    <button
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
            e.stopPropagation();
            onDeleteComponent(comp.id);
        }}
    >
        X
    </button>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>
        );
    };

export default LivePreview;