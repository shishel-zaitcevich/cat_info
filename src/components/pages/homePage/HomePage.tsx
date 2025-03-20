import { useState, useEffect, RefObject } from 'react';
import Cat from '../../shared/preloader/Cat';
import { ButtonSection } from './ButtonSection';
import { CatsSection } from './CatsSection';
import { GallerySection } from './GallerySection';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactLenis, { LenisRef } from 'lenis/react';

import 'lenis/dist/lenis.css';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectionsVisible, setSectionsVisible] = useState<boolean>(false);
  const lenisRef: RefObject<LenisRef> = React.useRef<LenisRef>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const loadContent = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoaded(true);

      setTimeout(() => {
        setSectionsVisible(true);
      }, 100);
    };

    loadContent();
  }, [isLoading]);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const updateScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', updateScroll);

    let rafId: number;
    const update = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', updateScroll);
    };
  }, []);

  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    if (isMobile) {
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }, [isMobile]);

  return isMobile ? (
    <div>
      {isLoading ? (
        <Cat />
      ) : (
        <div style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
          <CatsSection />
          <div
            style={{
              visibility: sectionsVisible ? 'visible' : 'hidden',
              opacity: sectionsVisible ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <GallerySection />
            <ButtonSection />
          </div>
        </div>
      )}
    </div>
  ) : (
    <ReactLenis ref={lenisRef} root options={{ lerp: 0.05, infinite: false }}>
      {isLoading ? (
        <Cat />
      ) : (
        <div style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
          <CatsSection />
          <div
            style={{
              visibility: sectionsVisible ? 'visible' : 'hidden',
              opacity: sectionsVisible ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <GallerySection />
            <ButtonSection />
          </div>
        </div>
      )}
    </ReactLenis>
  );
};

export default HomePage;
