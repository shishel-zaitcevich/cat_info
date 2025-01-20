import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CatGalleryPage from './components/pages/galleryPage/CatGalleryPage';
import HomePage from './components/pages/homePage/HomePage';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<CatGalleryPage />} />
          </>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
