import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CatGalleryPage from './components/pages/galleryPage/CatGalleryPage';
import HomePage from './components/pages/homePage/HomePage';
import { Provider } from 'react-redux';
import { store } from './api/store/store';
import ChatBot from './features/Chatbot/ChatBot';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<CatGalleryPage />} />
            <Route path="/images" element={<CatGalleryPage />} />
            <Route path="/play" element={<CatGalleryPage />} />
            <Route path="/catbot" element={<ChatBot />} />
          </>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
