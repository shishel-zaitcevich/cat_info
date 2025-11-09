import CatList from './CatList';

import Modal from '../../../features/Modal/Modal';

import '../../../assets/styles/CatGalleryPage.scss';
import AuthButton from '../../shared/AuthButton/AuthButton';
import ChatBot from '../../shared/Chatbot/ChatBot';

const CatGalleryPage: React.FC = () => {
  return (
    <main>
      <section className="gallery-page">
        <div className="auth-wrapper">
          <AuthButton className="authBtnImg" textClassName="textPosition" />
        </div>

        <ChatBot className="chatBot" />
        <CatList />

        <Modal />
      </section>
    </main>
  );
};

export default CatGalleryPage;
