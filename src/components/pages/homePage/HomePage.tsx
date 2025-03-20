// import React, { useEffect, useState } from 'react';

// import LocomotiveScroll from 'locomotive-scroll';
import { useState, useEffect, RefObject } from 'react';
import Cat from '../../shared/preloader/Cat';
import { ButtonSection } from './ButtonSection';
import { CatsSection } from './CatsSection';
import { GallerySection } from './GallerySection';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactLenis, { LenisRef } from 'lenis/react';

// import { CatsSection } from './CatsSection';
// import { GallerySection } from './GallerySection';
// import { ButtonSection } from './ButtonSection';
// import '../../../assets/styles/homePage/HomePage.scss';
// import 'locomotive-scroll/dist/locomotive-scroll.css';
// import Cat from '../../shared/preloader/Cat';

// import LocomotiveScroll from 'locomotive-scroll';

// gsap.registerPlugin(ScrollTrigger);

// const HomePage: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (isLoading) return;

//     // Предзагрузка всех изображений для предотвращения моргания
//     const preloadImages = async () => {
//       const imagePaths = [
//         '/michiel-six-QFmOSzFprXk-unsplash.jpg',
//         '/deniz-uzuner-0ZffcNJ7jP0-unsplash.jpg',
//         '/sara-groblechner-m5u3tXsY76w-unsplash.jpg',
//         '/oguzhan-tasimaz-r2Uk2g31JiE-unsplash.jpg',
//         '/grey-kitty-with-monochrome-wall-her.jpg',
//         '/paw.png',
//       ];

//       // Создаем промисы для всех изображений
//       const imagePromises = imagePaths.map((path) => {
//         return new Promise((resolve) => {
//           const img = new Image();
//           img.src = path;
//           img.onload = resolve;
//           img.onerror = resolve; // В случае ошибки всё равно продолжаем
//         });
//       });

//       // Ждем загрузки всех изображений
//       await Promise.all(imagePromises);
//       await new Promise((resolve) => setTimeout(resolve, 200)); // Небольшая задержка
//       setIsLoaded(true);
//     };

//     preloadImages();
//   }, [isLoading]);

//   useEffect(() => {
//     if (!isLoaded) return;

//     const initScroll = () => {
//       const isMobile = window.innerWidth < 768;

//       if (isMobile) {
//         gsap.registerPlugin(ScrollTrigger);
//         ScrollTrigger.refresh();
//         return;
//       }

//       const scrollContainer = document.querySelector(
//         '[data-scroll-container]'
//       ) as HTMLElement;

//       if (!scrollContainer) return;

//       const scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: isMobile ? false : true,
//         lerp: 0.5,
//         inertia: 0.335,
//       });

//       scrollInstance.update();

//       // Связываем ScrollTrigger и Locomotive Scroll
//       scrollInstance.on('scroll', ScrollTrigger.update);

//       // Обновляем ScrollTrigger после небольшой задержки
//       setTimeout(() => {
//         ScrollTrigger.refresh();
//       }, 200);

//       return () => scrollInstance.destroy();
//     };

//     // Запускаем инициализацию скролла
//     const cleanup = initScroll();

//     // Обработчик изменения размера окна
//     const handleResize = () => {
//       // Обновляем ScrollTrigger при изменении размера окна
//       ScrollTrigger.refresh();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       if (cleanup) cleanup();
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [isLoaded]);

//   return (
//     <>
//       {isLoading ? (
//         <Cat />
//       ) : (
//         <div
//           data-scroll-container
//           style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
//         >
//           <CatsSection />
//           <GallerySection />
//           <ButtonSection />
//         </div>
//       )}
//     </>
//   );
// };

// export default HomePage;

// // const HomePage: React.FC = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isLoaded, setIsLoaded] = useState(false);
// //   const [sectionsVisible, setSectionsVisible] = useState(false); // Новое состояние для контроля видимости секций

// //   useEffect(() => {
// //     const timer = setTimeout(() => setIsLoading(false), 1000);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   useEffect(() => {
// //     if (isLoading) return;

// //     const loadContent = async () => {
// //       await new Promise((resolve) => setTimeout(resolve, 500)); // Имитируем задержку загрузки
// //       setIsLoaded(true);

// //       // Добавляем задержку перед отображением секций
// //       setTimeout(() => {
// //         setSectionsVisible(true);
// //       }, 100);
// //     };

// //     loadContent();
// //   }, [isLoading]);

// //   useEffect(() => {
// //     if (!isLoaded) return;

// //     // if (window.innerWidth < 768) {
// //     //   return; // Не инициализируем Locomotive Scroll на мобильных
// //     // }

// //     const scrollContainer = document.querySelector(
// //       '[data-scroll-container]'
// //     ) as HTMLElement;

// //     if (!scrollContainer) return;

// //     const scrollInstance = new LocomotiveScroll({
// //       el: scrollContainer,
// //       smooth: true,
// //       lerp: 0.5,
// //       inertia: 0.335,
// //     });

// //     scrollInstance.update();
// //     scrollInstance.on('scroll', () => ScrollTrigger.refresh());

// //     return () => scrollInstance.destroy();
// //   }, [isLoaded]);

// //   return (
// //     <>
// //       {isLoading ? (
// //         <Cat />
// //       ) : (
// //         <div
// //           data-scroll-container
// //           style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
// //         >
// //           <CatsSection />
// //           {/* Скрываем GallerySection до полной загрузки и готовности */}
// //           <div
// //             style={{
// //               visibility: sectionsVisible ? 'visible' : 'hidden',
// //               opacity: sectionsVisible ? 1 : 0,
// //               transition: 'opacity 0.5s ease',
// //             }}
// //           >
// //             <GallerySection />
// //             <ButtonSection />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default HomePage;

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

    // Обновление Lenis через requestAnimationFrame
    let rafId: number;
    const update = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', updateScroll);
    };
  }, []);

  return (
    <ReactLenis ref={lenisRef} root options={{ lerp: 0.05 }}>
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
