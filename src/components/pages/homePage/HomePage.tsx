import React, { useEffect, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CatsSection } from './CatsSection';
import { GallerySection } from './GallerySection';
import { ButtonSection } from './ButtonSection';
import '../../../assets/styles/homePage/HomePage.scss';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Cat from '../../shared/preloader/Cat';

import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState(false); // Новое состояние для контроля видимости секций

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const loadContent = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Имитируем задержку загрузки
      setIsLoaded(true);

      // Добавляем задержку перед отображением секций
      setTimeout(() => {
        setSectionsVisible(true);
      }, 100);
    };

    loadContent();
  }, [isLoading]);

  useEffect(() => {
    if (!isLoaded) return;

    // if (window.innerWidth < 768) {
    //   return; // Не инициализируем Locomotive Scroll на мобильных
    // }

    const scrollContainer = document.querySelector(
      '[data-scroll-container]'
    ) as HTMLElement;

    if (!scrollContainer) return;

    const scrollInstance = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      lerp: 0.5,
      inertia: 0.335,
    });

    scrollInstance.update();
    scrollInstance.on('scroll', () => ScrollTrigger.refresh());

    return () => scrollInstance.destroy();
  }, [isLoaded]);

  return (
    <>
      {isLoading ? (
        <Cat />
      ) : (
        <div
          data-scroll-container
          style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
        >
          <CatsSection />
          {/* Скрываем GallerySection до полной загрузки и готовности */}
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
    </>
  );
};

export default HomePage;
