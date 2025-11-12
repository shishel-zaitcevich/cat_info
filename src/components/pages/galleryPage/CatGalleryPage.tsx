import CatList from './CatList';
import Modal from '../../../features/Modal/Modal';

import ChatBot from '../../../features/Chatbot/ChatBot';

import '../../../assets/styles/CatGalleryPage.scss';
import NavBar from '../../../features/Navigation/NavBar';
import { useWindowSize } from 'usehooks-ts';
import { useMemo } from 'react';

const TABLET_BREAKPOINT = 900;
// const MOBILE_BREAKPOINT = 520;

const CatGalleryPage: React.FC = () => {
  const { width } = useWindowSize();

  // Мемоизируем вычисление breakpoints
  const isTablet = useMemo(() => width < TABLET_BREAKPOINT, [width]);

  return (
    <main>
      <section className="gallery-page">
        <NavBar />

        {/* Бот показывается только на десктопе */}
        {!isTablet && <ChatBot className="chatBot" />}

        <CatList />
        <Modal />
      </section>
    </main>
  );
};

export default CatGalleryPage;
