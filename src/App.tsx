import React from 'react';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import CatGalleryPage from './components/pages/galleryPage/CatGalleryPage';
import HomePage from './components/pages/homePage/HomePage';
import { Provider } from 'react-redux';
import { store } from './api/store/store';
import ChatBot from './features/Chatbot/ChatBot';

import NavBar from './features/Navigation/NavBar';
import Modal from './features/Modal/Modal';

const MainLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Modal />
      <Outlet />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<CatGalleryPage />} />
            <Route path="/images" element={<CatGalleryPage />} />
            <Route path="/play" element={<CatGalleryPage />} />
            <Route path="/catbot" element={<ChatBot />} />
            {/* Можно добавить 404 позже */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
