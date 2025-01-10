import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PublishedWebsite = () => {
    const { siteId } = useParams();
    const [websiteData, setWebsiteData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem(`published_${siteId}`);
        if (data) {
            setWebsiteData(JSON.parse(data));
        } else {
            setError('Website not found');
        }
    }, [siteId]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-error">{error}</h1>
                    <a href="/" className="btn btn-primary mt-4">Create Website</a>
                </div>
            </div>
        );
    }

    if (!websiteData) {
        return <div>Loading...</div>;
    }

    return (
        <div data-theme={websiteData.theme}>
            <div className="w-full">
                {websiteData.components.map((comp) => (
                    <div
                        key={comp.id}
                        dangerouslySetInnerHTML={{ __html: comp.template }}
                        style={comp.styles}
                    />
                ))}
            </div>
        </div>
    );
};

export default PublishedWebsite;