import React, { useEffect, useState } from 'react';
import { useFetchCatImagesQuery } from '../../../api/catApi';
import { CatDetail } from './CatDetail';
import '../../../assets/styles/CatList.scss';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
import useCatListAnimation from '../../../hooks/useCatListAnimation';

export interface Cat {
  id: string;
  url: string;
  breeds: { name?: string; description?: string }[];
}

const CatList: React.FC = () => {
  const { data: cats = [], isLoading } = useFetchCatImagesQuery(10);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (cats.length > 0) {
      setTimeout(() => setIsRendered(true), 50);
    }
  }, [cats]); //чтобы gsap target не было null

  // useGSAP(() => {
  //   const sections = document.querySelectorAll<HTMLElement>('.section');
  //   const outerWrappers =
  //     document.querySelectorAll<HTMLElement>('.wrapper-outer');
  //   const innerWrappers =
  //     document.querySelectorAll<HTMLElement>('.wrapper-inner');
  //   const images = document.querySelectorAll<HTMLImageElement>('.cat-img');
  //   const headings = document.querySelectorAll<HTMLHeadingElement>('.cat-name');
  //   const descriptions =
  //     document.querySelectorAll<HTMLHeadingElement>('.descriptions');
  //   let currentIndex = -1;
  //   let animating = false;
  //   let lastTap = 0;

  //   gsap.set(outerWrappers, { yPercent: 100 });
  //   gsap.set(innerWrappers, { yPercent: -100 });

  //   function gotoSection(index: number, direction: number) {
  //     if (animating || sections.length === 0) return;
  //     if (index < 0 || index >= sections.length) return;
  //     animating = true;
  //     animating = true;

  //     const fromTop = direction === -1;
  //     const dFactor = fromTop ? -1 : 1;
  //     const tl = gsap.timeline({
  //       defaults: { duration: 1.25, ease: 'power1.inOut' },
  //       onComplete: () => {
  //         animating = false;
  //       },
  //     });

  //     if (currentIndex >= 0) {
  //       gsap.set(sections[currentIndex], { zIndex: 0 });
  //       tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
  //         sections[currentIndex],
  //         { autoAlpha: 0 }
  //       );
  //     }

  //     gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  //     tl.fromTo(
  //       [outerWrappers[index], innerWrappers[index]],
  //       { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
  //       { yPercent: 0 },
  //       0
  //     )
  //       .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
  //       .fromTo(
  //         [headings[index], descriptions[index]],
  //         // headings[index],
  //         { autoAlpha: 0, yPercent: 150 * dFactor },
  //         {
  //           autoAlpha: 1,
  //           yPercent: 0,
  //           duration: 1,
  //           ease: 'power2',
  //           stagger: { each: 0.02, from: 'random' },
  //         },
  //         0.2
  //       );

  //     currentIndex = index;
  //   }

  //   function handleTap() {
  //     const currentTime = new Date().getTime();
  //     const tapLength = currentTime - lastTap;
  //     if (tapLength < 500 && tapLength > 0 && !animating) {
  //       gotoSection(currentIndex + 1, 1);
  //     }
  //     lastTap = currentTime;
  //   }

  //   sections.forEach((section) => {
  //     section.addEventListener('touchend', handleTap);
  //   });

  //   window.addEventListener('wheel', (event) => {
  //     if (!animating) {
  //       if (event.deltaY < 0) gotoSection(currentIndex - 1, -1);
  //       else if (event.deltaY > 0) gotoSection(currentIndex + 1, 1);
  //     }
  //   });

  //   gotoSection(0, 1);
  // }, [isRendered]);

  useCatListAnimation(isRendered);

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <>
      <section className="cat-list">
        {cats.map((cat: Cat, index: number) => (
          <div key={cat.id} className="section cat-item">
            <div className="wrapper-outer">
              <div className="wrapper-inner">
                <div
                  className={`background ${index % 2 === 0 ? 'black' : 'grey'}`}
                >
                  <img
                    src={cat.url}
                    alt={cat.breeds[0]?.name || 'Cat'}
                    className="cat-img"
                    loading="lazy"
                  />
                  <h2 className="cat-name">
                    {cat.breeds[0]?.name || 'Без породы'}
                  </h2>
                  <p className="cat-description">
                    {cat.breeds[0]?.description || 'Описание отсутствует'}
                  </p>
                  <CatDetail className="details" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default CatList;
