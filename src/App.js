
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Preview from './EventPage';
// import EventRegistration from './LumaRegistration';
// import WebsiteBuilder from './components/WebsiteBuilder';
// import PreviewPage from './components/PreviewPage';
// import PublishedWebsite from './components/PublishedWebsite';
// import CanvasEditor from './components/CanvasEditor';
// function App() {
//   return (
  
//   <Router>
//   <Routes>
//     <Route path="/" element={<WebsiteBuilder />} />
//     <Route path="/preview" element={<PreviewPage />} />
//     <Route path="/site/:siteId" element={<PublishedWebsite />} />
//      <Route path="/edit" element={<CanvasEditor />} />
//   </Routes>
// </Router>
//   );
// }

// export default App;
// App.js
import React, { useState } from 'react';

import PreviewScreen from './PreviewScreen';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <PreviewScreen />
    </div>
  );
}

export default App;