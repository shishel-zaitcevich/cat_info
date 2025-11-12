import ChatBot from '../../../features/Chatbot/ChatBot';

import '../../../assets/styles/CatGalleryPage.scss';

// import { useWindowSize } from 'usehooks-ts';
// import { useMemo } from 'react';
import WaveBackground from '../../shared/Backgrounds/WaveBackground';
import NavBar from '../../../features/Navigation/NavBar';

// const TABLET_BREAKPOINT = 900;
// const MOBILE_BREAKPOINT = 520;

const CatbotPage: React.FC = () => {
  //   const { width } = useWindowSize();

  // Мемоизируем вычисление breakpoints
  //   const isTablet = useMemo(() => width < TABLET_BREAKPOINT, [width]);

  return (
    <main>
      <section className="gallery-page">
        <WaveBackground
          children={
            <>
              <NavBar />
              <ChatBot className="catBot" />
            </>
          }
        />
        {/* {isTablet && <ChatBot className="catBot" />} */}
      </section>
    </main>
  );
};

export default CatbotPage;
