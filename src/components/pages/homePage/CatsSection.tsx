import { useGSAP } from '@gsap/react';

import '../../../assets/styles/homePage/CatsSection.scss';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export function CatsSection() {
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const bgImageRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/michiel-six-QFmOSzFprXk-unsplash.jpg';
    img.onload = () => {
      setIsBgLoaded(true);
    };
  }, []);

  useGSAP(() => {
    if (isBgLoaded) {
      gsap.to('.bgImage', {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          gsap.set('.header', { visibility: 'hide', opacity: 0, y: 100 });
          gsap.to('.header', {
            opacity: 1,
            visibility: 'visible',
            y: 0,
            ease: 'expo.out',
            duration: 2,
            delay: 0.7,
          });
        },
      });
    }
  }, [isBgLoaded]);

  return (
    <div className="cats" data-scroll data-scroll-section>
      <img className="logo" src="/catslogo.png" alt="logo" />
      <img
        ref={bgImageRef}
        className="bgImage"
        src="/michiel-six-QFmOSzFprXk-unsplash.jpg"
        alt="cat"
        data-scroll
        data-scroll-speed="-3"
      />
      <h1 className="header" data-scroll data-scroll-speed="-4">
        CAT
      </h1>
    </div>
  );
}
