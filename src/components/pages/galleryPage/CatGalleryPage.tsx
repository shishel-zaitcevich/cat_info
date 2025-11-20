import CatList from './CatList';

// import ChatBot from '../../../features/Chatbot/ChatBot';

import '../../../assets/styles/CatGalleryPage.scss';

// import { useWindowSize } from 'usehooks-ts';

// const MOBILE_BREAKPOINT = 520;

const CatGalleryPage: React.FC = () => {
  return (
    <main>
      <section className="gallery-page">
        <CatList />
        {/* <Modal /> */}
      </section>
    </main>
  );
};

export default CatGalleryPage;
