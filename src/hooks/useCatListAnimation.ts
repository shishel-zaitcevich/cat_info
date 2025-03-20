import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const useCatListAnimation = (isRendered: boolean) => {
  useGSAP(() => {
    if (!isRendered) return; 
    
    setTimeout(() => {
      const sections = document.querySelectorAll<HTMLElement>('.section');
      const outerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-outer');
      const innerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-inner');
      const images = document.querySelectorAll<HTMLImageElement>('.cat-img');
      const headings = document.querySelectorAll<HTMLHeadingElement>('.cat-name');
      const descriptions = document.querySelectorAll<HTMLParagraphElement>('.cat-description');
      const details = document.querySelectorAll<HTMLElement>('.cat-detail');
      console.log('Details elements found:', details.length);
      let currentIndex = -1;
      let animating = false;
      let startY = 0;
      let endY = 0;
      
      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });
      
      gsap.set(sections, { autoAlpha: 0 });
      
      const gotoSection = (index: number, direction: number) => {
        if (animating || sections.length === 0) return;
        if (index < 0 || index >= sections.length) return;
        animating = true;
        
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

        const elementStartY = fromTop ? -50 : 50; 
        
        tl.fromTo(
          images[index], 
          { autoAlpha: 0, yPercent: elementStartY }, 
          { autoAlpha: 1, yPercent: 0, duration: 1 }, 
          0.4
        )
        .fromTo(
          headings[index], 
          { autoAlpha: 0, yPercent: elementStartY }, 
          { autoAlpha: 1, yPercent: 0, duration: 1 }, 
          0.9
        )
        .fromTo(
          descriptions[index], 
          { autoAlpha: 0, yPercent: elementStartY }, 
          { autoAlpha: 1, yPercent: 0, duration: 1 }, 
         1.1
        )
        .fromTo(
          details[index], 
          { autoAlpha: 0, yPercent: elementStartY }, 
          { autoAlpha: 1, yPercent: 0, duration: 1 }, 
          1.3
        );
        
        currentIndex = index;
      };
      
      const handleTouchStart = (event: TouchEvent) => {
        startY = event.touches[0].clientY;
      };
      
      const handleTouchEnd = (event: TouchEvent) => {
        endY = event.changedTouches[0].clientY;
        const diffY = startY - endY;
        
        // Минимальное расстояние для определения свайпа
        const minDistance = 50;
        
        if (Math.abs(diffY) >= minDistance) {
          if (diffY > 0 && currentIndex < sections.length - 1) {
            gotoSection(currentIndex + 1, 1);
          } else if (diffY < 0 && currentIndex > 0) {
            gotoSection(currentIndex - 1, -1);
          }
        }
      };
      
      sections.forEach((section) => {
        section.addEventListener('touchstart', handleTouchStart);
        section.addEventListener('touchend', handleTouchEnd);
      });
      
      const handleWheel = (event: WheelEvent) => {
        if (!animating) {
          if (event.deltaY < 0 && currentIndex > 0) {
            gotoSection(currentIndex - 1, -1);
          } else if (event.deltaY > 0 && currentIndex < sections.length - 1) {
            gotoSection(currentIndex + 1, 1);
          }
        }
      };
      
      window.addEventListener('wheel', handleWheel);
      
      gotoSection(0, 1);
      
      return () => {
        sections.forEach((section) => {
          section.removeEventListener('touchstart', handleTouchStart);
          section.removeEventListener('touchend', handleTouchEnd);
        });
        window.removeEventListener('wheel', handleWheel);
      };
    }, 100);
  }, [isRendered]); 
};

export default useCatListAnimation;

