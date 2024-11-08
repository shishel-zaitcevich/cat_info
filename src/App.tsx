import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CatGalleryPage from './components/pages/CatGalleryPage';
import HomePage from './components/pages/HomePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<CatGalleryPage />} />
        </>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
