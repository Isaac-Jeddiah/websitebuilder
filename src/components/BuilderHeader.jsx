import React from 'react';
import WebsitePublisher from './WebsitePublisher';

const BuilderHeader = ({ onSavePreview, websiteData }) => {
  return (
    <div className="h-12 bg-base-200/50 backdrop-blur-sm border-b border-base-300 sticky top-0 z-50 flex items-center px-3 gap-2">
      {/* Left section */}
      <div className="flex items-center gap-2 flex-1">
        <h2 className="text-sm font-medium text-base-content/70">Live Preview Hello</h2>
        <div className="h-4 w-px bg-base-300 mx-1" />
        <span className="text-xs text-base-content/50">Editing</span>
      </div>
      
      {/* Right section */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onSavePreview}
          className="btn btn-sm btn-ghost hover:bg-base-300"
        >
          Preview
        </button>
        <div className="h-4 w-px bg-base-300" />
        <WebsitePublisher 
          websiteData={websiteData}
          className="btn btn-sm btn-primary px-3"
        />
      </div>
    </div>
  );
};

export default BuilderHeader;