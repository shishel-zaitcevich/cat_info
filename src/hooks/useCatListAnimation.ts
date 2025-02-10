import { useGSAP } from '@gsap/react';
import gsap from 'gsap';



const useCatListAnimation = (isRendered: boolean) => {
  useGSAP(() => {
    if (!isRendered) return; // Если элементы не отрендерены, выходим

   setTimeout (() => {
      const sections = document.querySelectorAll<HTMLElement>('.section');
      const outerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-outer');
      const innerWrappers = document.querySelectorAll<HTMLElement>('.wrapper-inner');
      const images = document.querySelectorAll<HTMLImageElement>('.cat-img');
      const headings = document.querySelectorAll<HTMLHeadingElement>('.cat-name');
      const descriptions = document.querySelectorAll<HTMLParagraphElement>('.cat-description');
      const details = document.querySelectorAll<HTMLParagraphElement>('.details');
      let currentIndex = -1;
      let animating = false;
      let lastTap = 0;

      // Устанавливаем начальные значения для внешних и внутренних обёрток
      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });

      // Функция для перехода к определённой секции
      const gotoSection = (index: number, direction: number) => {
        if (animating || sections.length === 0) return;
        // Проверяем границы
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
          tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
            sections[currentIndex],
            { autoAlpha: 0 }
          );
        }

        gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
        tl.fromTo(
          [outerWrappers[index], innerWrappers[index]],
          { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
          { yPercent: 0 },
          0
        )
        //   .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        //   .fromTo(
        //     headings[index],
        //     { autoAlpha: 0, yPercent: 150 * dFactor },
        //     {
        //       autoAlpha: 1,
        //       yPercent: 0,
        //       duration: 1,
        //       ease: 'power2',
        //       stagger: { each: 0.02, from: 'random' },
        //     },
        //     0.2
        //   );
       
        .fromTo(images[index], { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, duration: 1 }, 0.4)
        .fromTo(headings[index], { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, duration: 1 }, 0.6)
        .fromTo(descriptions[index], { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, duration: 1 }, 0.8)
        .fromTo(details[index], { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, duration: 1 }, 1); 

        currentIndex = index;
      };

      // Обработчик тапа
      const handleTap = () => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0 && !animating && currentIndex < sections.length - 1) {
          gotoSection(currentIndex + 1, 1);
        }
        lastTap = currentTime;
      };

      // Добавляем обработчики событий
      sections.forEach((section) => {
        section.addEventListener('touchend', handleTap);
      });

      window.addEventListener('wheel', (event) => {
        if (!animating) {
          if (event.deltaY < 0 && currentIndex > 0) {
            gotoSection(currentIndex - 1, -1);
          } else if (event.deltaY > 0 && currentIndex < sections.length - 1) {
            gotoSection(currentIndex + 1, 1);
          }
        }
      });

      // Инициализация: переходим к первой секции
      gotoSection(0, 1);
    }, 100);
  },[isRendered]); // Зависимости хука
};

export default useCatListAnimation;
