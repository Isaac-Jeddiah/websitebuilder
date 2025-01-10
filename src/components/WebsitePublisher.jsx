import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WebsitePublisher = ({ websiteData }) => {
    const [publishedUrl, setPublishedUrl] = useState('');
    const navigate = useNavigate();

    const generatePath = () => {
        return Math.random().toString(36).substring(2, 15);
    };

    const handlePublish = () => {
        const path = generatePath();
        // Save website data with unique path
        localStorage.setItem(`published_${path}`, JSON.stringify(websiteData));
        const url = `${window.location.origin}/site/${path}`;
        setPublishedUrl(url);
    };

    return (
        <div className="p-4 bg-base-200 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Publish Website</h3>
            <button 
                className="btn btn-primary w-full mb-4"
                onClick={handlePublish}
            >
                Publish Now
            </button>
            {publishedUrl && (
                <div className="bg-success/20 p-4 rounded-lg">
                    <p className="text-sm mb-2">Your website is live at:</p>
                    <div className="flex items-center gap-2">
                        <input 
                            type="text" 
                            value={publishedUrl} 
                            readOnly 
                            className="input input-bordered flex-1"
                        />
                        <button 
                            className="btn btn-square btn-sm"
                            onClick={() => navigator.clipboard.writeText(publishedUrl)}
                        >
                            📋
                        </button>
                    </div>
                    <button
                        className="btn btn-outline btn-sm mt-2"
                        onClick={() => window.open(publishedUrl, '_blank')}
                    >
                        View Website
                    </button>
                </div>
            )}
        </div>
    );
};

export default WebsitePublisher;