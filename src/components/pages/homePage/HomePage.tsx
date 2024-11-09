import React, { useEffect } from 'react';

import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CatsSection } from './CatsSection';
import { GallerySection } from './GallerySection';
import { ButtonSection } from './ButtonSection';
import '../../../assets/styles/HomePage.scss';
import 'locomotive-scroll/dist/locomotive-scroll.css';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  useEffect(() => {
    const scroll_one = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]') as HTMLElement,
      smooth: true,
      lerp: 0.5,
      inertia: 0.335,
      scrollFromAnywhere: true,
      tablet: {
        breakpoint: 0,
      },
    });

    scroll_one.update();
    scroll_one.on('scroll', () => {
      ScrollTrigger.refresh();
    });

    return () => {
      if (scroll_one) {
        scroll_one.destroy();
      }
    };
  }, []);

  return (
    <>
      <div data-scroll-container>
        <CatsSection />
        <GallerySection />
        <ButtonSection />
      </div>
    </>
  );
};

export default HomePage;
