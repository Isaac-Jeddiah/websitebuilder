import React, { useEffect } from 'react';

const ThemeSelector = ({ onThemeChange }) => {
    const themes = [
        "light"
    ];

    useEffect(() => {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', themes[0]);
    }, []);

    const handleThemeChange = (theme) => {
       document.documentElement.setAttribute('data-theme', theme);
       
        onThemeChange(theme);
    };

    return (
        <div className="p-4 bg-base-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-3">Theme</h3>
            <select 
                className="select select-bordered w-full"
                onChange={(e) => handleThemeChange(e.target.value)}
                defaultValue={themes[0]}
            >
                {themes.map((theme) => (
                    <option key={theme} value={theme}>
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default ThemeSelector;