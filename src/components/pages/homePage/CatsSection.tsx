import { useEffect } from 'react';
import '../../../assets/styles/CatsSection.scss';
import gsap from 'gsap';

export function CatsSection() {
  useEffect(() => {
    gsap.fromTo(
      //анимация для cats
      '.ho',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, ease: 'expo.out', duration: 2, delay: 0.8 }
    );
    gsap.to('.hp', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.hp',
        markers: false,
        scrub: 1,
        end: 'bottom top',
        start: 'top top',
      },
    });
  }, []);

  return (
    <div className="hero" data-scroll data-scroll-section>
      <img
        className="hp"
        src="/michiel-six-QFmOSzFprXk-unsplash.jpg"
        alt=""
        data-scroll
        data-scroll-speed="-3"
      />
      <h1 className="ho" data-scroll data-scroll-speed="-4">
        CAT'S
      </h1>
    </div>
  );
}
