import { useRef, useMemo } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { useImageLoadAnimation } from '../../../hooks/useImageLoadAnimation';
import '../../../assets/styles/homePage/CatsSection.scss';

const MOBILE_BREAKPOINT = 520;
const IMAGE_SRC = '/michiel-six-QFmOSzFprXk-unsplash.jpg';

export function CatsSection() {
  const bgImageRef = useRef(null);
  const { width } = useWindowSize();

  const isMobile = useMemo(() => width < MOBILE_BREAKPOINT, [width]);

  useImageLoadAnimation({
    imageSrc: IMAGE_SRC,
    imageSelector: '.bgImage',
    headerSelector: '.header',
    fadeInDuration: 0.5,
    slideUpDelay: 0.7,
  });

  return (
    <div className="cats" data-scroll data-scroll-section>
      <img
        ref={bgImageRef}
        className="bgImage"
        src={IMAGE_SRC}
        alt="cat"
        data-scroll
        data-scroll-speed="-3"
      />
      <h1 className="header" data-scroll data-scroll-speed="-4">
        CAT
        {isMobile && (
          <p className="text">Discover world's most adorable cats</p>
        )}
      </h1>
    </div>
  );
}
