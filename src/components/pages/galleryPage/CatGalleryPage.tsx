import { useRef } from 'react';
import { Link } from 'react-router-dom';

import CatList from './CatList';

import { usePendulumAnimation } from '../../../hooks/usePendulumanimation';

import '../../../assets/styles/CatGalleryPage.scss';

const CatGalleryPage: React.FC = () => {
  const redRoundRef = useRef<HTMLImageElement | null>(null);

  usePendulumAnimation(redRoundRef, '.button-home');

  return (
    <main>
      <section className="gallery-page">
        <Link to={'/'} className="button-home">
          <img src="/home.png" alt="home" className="home" />
          <img
            src="/redRound.png"
            alt="home"
            className="red-round"
            ref={redRoundRef}
          />
          <p className="home-link">Go home</p>
        </Link>
        <CatList />
      </section>
    </main>
  );
};

export default CatGalleryPage;
