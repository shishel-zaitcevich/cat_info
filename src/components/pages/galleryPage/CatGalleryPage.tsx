import CatList from './CatList';
import Modal from '../../../features/Modal/Modal';
import AuthButton from '../../shared/Buttons/AuthButton/AuthButton';
import ChatBot from '../../../features/Chatbot/ChatBot';

import '../../../assets/styles/CatGalleryPage.scss';

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
