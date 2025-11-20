import CatList from './CatList';

import ChatBot from '../../../features/Chatbot/ChatBot';

import '../../../assets/styles/CatGalleryPage.scss';

import { useWindowSize } from 'usehooks-ts';
import { useMemo } from 'react';

const TABLET_BREAKPOINT = 900;
// const MOBILE_BREAKPOINT = 520;

const CatGalleryPage: React.FC = () => {
  const { width } = useWindowSize();

  const isTablet = useMemo(() => width < TABLET_BREAKPOINT, [width]);

  return (
    <main>
      <section className="gallery-page">
        {!isTablet && <ChatBot className="chatBot" />}

        <CatList />
        {/* <Modal /> */}
      </section>
    </main>
  );
};

export default CatGalleryPage;
