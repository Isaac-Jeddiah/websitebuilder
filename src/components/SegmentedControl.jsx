import React from 'react';

const SegmentedControl = ({ selected, onSelect }) => {
  const segments = ['Templates', 'Pages', 'Assets'];
  
  return (
    <div className="p-2 bg-base-300 rounded-lg">
      <div className="relative flex rounded-md bg-base-200 p-1">
        {/* Sliding highlight */}
        <div 
          className="absolute h-8 transition-all duration-200 ease-out rounded-md bg-white shadow-sm"
          style={{
            width: `${100/3}%`,
            left: `${(segments.indexOf(selected) * 100/3)}%`,
          }}
        />
        
        {/* Buttons */}
        {segments.map((segment) => (
          <button
            key={segment}
            onClick={() => onSelect(segment)}
            className={`relative flex-1 px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
              selected === segment ? 'text-base-content' : 'text-base-content/60'
            }`}
          >
            {segment}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;