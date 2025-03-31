import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MutableRefObject } from 'react';


const useCatListAnimation = (isRendered: boolean,   buttonsFavRefs: MutableRefObject<(HTMLDivElement | null)[]>,  imageRefs: MutableRefObject<(HTMLImageElement | null)[]>,
headingRefs: MutableRefObject<(HTMLHeadingElement | null)[]>,
descriptionRefs: MutableRefObject<(HTMLParagraphElement | null)[]>,) => {

  useGSAP(() => {
    if (!isRendered) return;

    setTimeout(() => {
      const sections = document.querySelectorAll<HTMLElement>('.section');
      const outerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-outer');
      const innerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-inner');
  
      const images = imageRefs.current.filter(Boolean);
      const headings = headingRefs.current.filter(Boolean);
      const descriptions = descriptionRefs.current.filter(Boolean);
      const buttonFavourite = buttonsFavRefs.current.filter(Boolean);

      console.log('sections', sections.length);
      console.log('outerWrappers', outerWrappers.length);
      console.log('innerWrappers', innerWrappers.length);
  
      console.log('buttonsFavRefs', buttonsFavRefs)
      console.log('imageRefs', imageRefs)
      console.log('isRendered', isRendered)

      console.log('buttonsFavRefs.current', buttonsFavRefs.current);
  
      // if (
      //   sections.length === 0 ||
      //   outerWrappers.length === 0 ||
      //   innerWrappers.length === 0 ||
      //   details.length !== sections.length ||
      //   images.length !== sections.length ||
      //   headings.length !== sections.length ||
      //   descriptions.length !== sections.length
      // ) {
      //   console.warn("Некоторые элементы или рефы отсутствуют, анимация не запускается.");
      //   return;
      // }

      let currentIndex = -1;
      let animating = false;
      let startY = 0;
      let endY = 0;

      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });
      gsap.set(sections, { autoAlpha: 0 });

      const gotoSection = (index: number, direction: number) => {
    
        if (animating || index < 0 || index >= sections.length || index === currentIndex) return;

        animating = true;

        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;


        const tl = gsap.timeline({
          defaults: { duration: 1.25, ease: 'power1.inOut' },
          onComplete: () => {
            animating = false;
          },
          onInterrupt: () => {
            animating = false;
          }
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
          { 
            autoAlpha: 1, 
            yPercent: 0, 
            duration: 1,
            delay: direction === 1 ? 0 : 0.06
          }
        )
        .fromTo(
          headings[index],
          { autoAlpha: 0, yPercent: elementStartY },
          { 
            autoAlpha: 1, 
            yPercent: 0, 
            duration: 1,
            delay: direction === 1 ? 0.02 : 0.04 
          }
        )
        .fromTo(
          descriptions[index],
          { autoAlpha: 0, yPercent: elementStartY },
          { 
            autoAlpha: 1, 
            yPercent: 0, 
            duration: 1,
            delay: direction === 1 ? 0.04 : 0.02 
          }
        )
        .fromTo(
          buttonFavourite[index],
          { autoAlpha: 0, yPercent: elementStartY },
          { 
            autoAlpha: 1, 
            yPercent: 0, 
            duration: 1,
            delay: direction === 1 ? 0.06 : 0 
          }
        );

        currentIndex = index;
      };

      const handleTouchStart = (event: TouchEvent) => {
        if (!animating) {
          startY = event.touches[0].clientY;
        }
      };

      const handleTouchEnd = (event: TouchEvent) => {
        if (!animating) {
          endY = event.changedTouches[0].clientY;
          const diffY = startY - endY;

          const minDistance = 50;

          if (Math.abs(diffY) >= minDistance) {
            if (diffY > 0 && currentIndex < sections.length - 1) {
              gotoSection(currentIndex + 1, 1);
            } else if (diffY < 0 && currentIndex > 0) {
              gotoSection(currentIndex - 1, -1);
            }
          }
        }
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

      sections.forEach((section) => {
        section.addEventListener('touchstart', handleTouchStart);
        section.addEventListener('touchend', handleTouchEnd);
      });

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
  }, [isRendered, buttonsFavRefs, imageRefs]);

  return null;
};

export default useCatListAnimation;

