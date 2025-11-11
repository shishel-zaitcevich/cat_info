// import { useGSAP } from '@gsap/react';
// import { useEffect, useRef, useState } from 'react';

// import gsap from 'gsap';
// import { useWindowSize } from 'usehooks-ts';

// import '../../../assets/styles/homePage/CatsSection.scss';

// export function CatsSection() {
//   const [isBgLoaded, setIsBgLoaded] = useState(false);
//   const bgImageRef = useRef(null);
//   const { width } = useWindowSize();
//   const MOBILE_BREAKPOINT = 520;
//   const isMobile = width < MOBILE_BREAKPOINT;

//   useEffect(() => {
//     const img = new Image();
//     img.src = '/michiel-six-QFmOSzFprXk-unsplash.jpg';
//     img.onload = () => {
//       setIsBgLoaded(true);
//     };
//   }, []);

//   useGSAP(() => {
//     if (isBgLoaded) {
//       gsap.to('.bgImage', {
//         opacity: 1,
//         duration: 0.5,
//         onComplete: () => {
//           gsap.set('.header', { visibility: 'hide', opacity: 0, y: 100 });
//           gsap.to('.header', {
//             opacity: 1,
//             visibility: 'visible',
//             y: 0,
//             ease: 'expo.out',
//             duration: 2,
//             delay: 0.7,
//           });
//         },
//       });
//     }
//   }, [isBgLoaded]);

//   return (
//     <div className="cats" data-scroll data-scroll-section>
//       <img
//         ref={bgImageRef}
//         className="bgImage"
//         src="/michiel-six-QFmOSzFprXk-unsplash.jpg"
//         alt="cat"
//         data-scroll
//         data-scroll-speed="-3"
//       />
//       <h1 className="header" data-scroll data-scroll-speed="-4">
//         CAT
//         {isMobile && (
//           <p className="text">Discover world's most adorable cats</p>
//         )}
//       </h1>
//     </div>
//   );
// }

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

  // Используем переиспользуемый хук для анимации загрузки
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
