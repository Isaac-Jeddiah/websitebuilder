import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Upload, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const WebsitePublisher = ({ websiteData }) => {
    const [publishedUrl, setPublishedUrl] = useState('');
    const navigate = useNavigate();

    const generatePath = () => {
        return Math.random().toString(36).substring(2, 15);
    };

    const handlePublish = () => {
        const path = generatePath();
        localStorage.setItem(`published_${path}`, JSON.stringify(websiteData));
        setPublishedUrl(`${window.location.origin}/site/${path}`);
    };

    return (
        <div className="flex items-center justify-end w-full px-2 py-0 bg-base-100 relative">
            <motion.button
                onClick={handlePublish}
                className="p-3 relative rounded-md text-white transition-all flex items-center gap-2 text-sm bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse border-2 border-transparent hover:border-white hover:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                whileTap={{ scale: 1.1 }}
                whileHover={{ boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.9)" }}
            >
                <Upload size={18} /> Publish
                <span className="absolute inset-0 rounded-md border-2 border-transparent animate-borderGlow"></span>
            </motion.button>
            {publishedUrl && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex items-center bg-white/10 px-4 py-2 rounded-lg shadow-md border border-gray-300 backdrop-blur-lg"
                >
                    
                    <button
                        className="ml-2 text-gray-300 hover:text-black transition-all"
                        onClick={() => navigator.clipboard.writeText(publishedUrl)}
                    >
                        <Copy size={18} />
                    </button>
                    <button
                        className="ml-2 text-green-400 hover:text-green-600 transition-all"
                        onClick={() => window.open(publishedUrl, '_blank')}
                    >
                        <Eye size={18} />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default WebsitePublisher;
