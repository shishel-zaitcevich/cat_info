import CatList from './CatList';
import Modal from '../../../features/Modal/Modal';

import ChatBot from '../../../features/Chatbot/ChatBot';

import '../../../assets/styles/CatGalleryPage.scss';
import NavBar from '../../../features/Navigation/NavBar';

const CatGalleryPage: React.FC = () => {
  return (
    <main>
      <section className="gallery-page">
        <NavBar />
        <ChatBot className="chatBot" />
        <CatList />

        <Modal />
      </section>
    </main>
  );
};

export default CatGalleryPage;
