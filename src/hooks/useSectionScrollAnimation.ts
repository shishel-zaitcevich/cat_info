
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import { setActiveIndex, setDirection } from "../api/store/scrollSlice";
import { useDispatch } from "react-redux";

export const useSectionScrollAnimation = (isRendered: boolean) => {
    const dispatch = useDispatch();
    const currentIndexRef = useRef<number>(-1);
    
    useGSAP(() => {
      if (!isRendered) return;
  
      setTimeout(() => {
        const sections = document.querySelectorAll<HTMLElement>('.section');
        const outerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-outer');
        const innerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-inner');
        const images = document.querySelectorAll<HTMLImageElement>('.cat-img'); // Добавляем изображения
  
        let currentIndex = -1;
        let animating = false;
  
        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });
        gsap.set(sections, { autoAlpha: 0 });
  
        const gotoSection = (index: number, direction: number) => {
          if (animating || index < 0 || index >= sections.length || index === currentIndex) return;
          animating = true;
  
          dispatch(setActiveIndex(index)); //  Записываем активную секцию
          dispatch(setDirection(direction as 1 | -1)); //  Записываем направление
  
          const fromTop = direction === -1;
          const dFactor = fromTop ? -1 : 1;
  
          const tl = gsap.timeline({
            defaults: { duration: 1.25, ease: 'power1.inOut' },
            onComplete: () => {
              animating = false;
            },
          });
  
          if (currentIndex >= 0) {
            gsap.set(sections[currentIndex], { zIndex: 0 });
            tl.to(images[currentIndex], { yPercent: -15 * dFactor }) // Двигаем изображение у предыдущей секции
              .set(sections[currentIndex], { autoAlpha: 0 });
          }
  
          gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  
          tl.fromTo(
            [outerWrappers[index], innerWrappers[index]],
            { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
            { yPercent: 0 },
            0
          );
  
          currentIndex = index;
          currentIndexRef.current = index;
        };
  
        window.addEventListener('wheel', (event) => {
          if (!animating) {
            if (event.deltaY < 0 && currentIndex > 0) {
              gotoSection(currentIndex - 1, -1);
            } else if (event.deltaY > 0 && currentIndex < sections.length - 1) {
              gotoSection(currentIndex + 1, 1);
            }
          }
        });
  
        gotoSection(0, 1);
      }, 100);
    }, [isRendered]);
  };