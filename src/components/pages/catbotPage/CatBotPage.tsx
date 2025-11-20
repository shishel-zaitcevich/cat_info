import ChatBot from '../../../features/Chatbot/ChatBot';

import '../../../assets/styles/CatGalleryPage.scss';

import WaveBackground from '../../shared/Backgrounds/WaveBackground';

const CatbotPage: React.FC = () => {
  return (
    <main>
      <section className="gallery-page">
        <WaveBackground
          children={
            <>
              <ChatBot className="catBot" />
            </>
          }
        />
      </section>
    </main>
  );
};

export default CatbotPage;
