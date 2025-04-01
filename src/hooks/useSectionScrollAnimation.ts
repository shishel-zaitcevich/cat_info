
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import { setActiveIndex, setDirection } from "../api/store/scrollSlice";
import { useDispatch } from "react-redux";

export const useSectionScrollAnimation = (isRendered: boolean) => {
  const dispatch = useDispatch();
  const currentIndexRef = useRef<number>(-1);
  
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const minSwipeDistance = 50; 
  
  useGSAP(() => {
    if (!isRendered) return;
    
    setTimeout(() => {
      const sections = document.querySelectorAll<HTMLElement>('.section');
      const outerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-outer');
      const innerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-inner');
      const images = document.querySelectorAll<HTMLImageElement>('.cat-img');
      
      let currentIndex = -1;
      let animating = false;
      
      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });
      gsap.set(sections, { autoAlpha: 0 });
      
      const gotoSection = (index: number, direction: number) => {
        if (animating || index < 0 || index >= sections.length || index === currentIndex) return;
        animating = true;
        
        dispatch(setActiveIndex(index));
        dispatch(setDirection(direction as 1 | -1));
        
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
          tl.to(images[currentIndex], { yPercent: -15 * dFactor })
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
      
      const handleWheel = (event: WheelEvent) => {
        if (!animating) {
          if (event.deltaY < 0 && currentIndex > 0) {
            gotoSection(currentIndex - 1, -1);
          } else if (event.deltaY > 0 && currentIndex < sections.length - 1) {
            gotoSection(currentIndex + 1, 1);
          }
        }
      };
      
      const handleTouchStart = (event: TouchEvent) => {
        touchStartY.current = event.touches[0].clientY;
      };
      
      const handleTouchMove = (event: TouchEvent) => {
        event.preventDefault();
      };
      
      const handleTouchEnd = (event: TouchEvent) => {
        if (animating) return;
        
        touchEndY.current = event.changedTouches[0].clientY;
        
        // Рассчитываем расстояние свайпа
        const swipeDistance = touchEndY.current - touchStartY.current;
        
        if (Math.abs(swipeDistance) >= minSwipeDistance) {
          // Свайп вверх (отрицательное расстояние)
          if (swipeDistance < 0 && currentIndex < sections.length - 1) {
            gotoSection(currentIndex + 1, 1);
          } 
          // Свайп вниз (положительное расстояние)
          else if (swipeDistance > 0 && currentIndex > 0) {
            gotoSection(currentIndex - 1, -1);
          }
        }
      };
      
      window.addEventListener('wheel', handleWheel);
      
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!animating) {
          if ((event.key === 'ArrowUp' || event.key === 'PageUp') && currentIndex > 0) {
            gotoSection(currentIndex - 1, -1);
          } else if ((event.key === 'ArrowDown' || event.key === 'PageDown') && currentIndex < sections.length - 1) {
            gotoSection(currentIndex + 1, 1);
          }
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      
      gotoSection(0, 1);
      
      return () => {
        window.removeEventListener('wheel', handleWheel);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, 100);
  }, [isRendered, dispatch]);
};