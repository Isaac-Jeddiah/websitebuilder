import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PreviewPage = () => {
    const [websiteData, setWebsiteData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem('websiteData');
        if (savedData) {
            setWebsiteData(JSON.parse(savedData));
        }
    }, []);

    if (!websiteData) {
        return <div className="min-h-screen bg-base-300 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">No website found</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/')}
                >
                    Create New Website
                </button>
            </div>
        </div>;
    }
    const handleEditWebsite = () => {
        navigate('/');
    };
    return (
        <div className="min-h-screen bg-base-300">
            {/* Navigation Bar */}
            <div className="sticky top-0 z-50 bg-base-300 border-b border-base-200">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Website Preview</h1>
                    <div className="flex gap-4">
                        <button 
                            className="btn btn-outline"
                            //onClick={() => navigate('/')}
                            onClick={handleEditWebsite}
                        >
                            Edit Website
                        </button>
                        <button 
                            className="btn btn-primary"
                            onClick={() => window.print()}
                        >
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Website Content */}
            <div 
                className="w-full bg-base-100"
                data-theme={websiteData.theme}
            >
                {websiteData.components.map((comp) => (
                    <div
                        key={comp.id}
                        dangerouslySetInnerHTML={{ __html: comp.template }}
                        style={{
                            ...comp.styles,
                            maxWidth: '100%',
                            margin: '0 auto'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PreviewPage;