import React, { useEffect, useRef, useState } from 'react';

import { useFetchCatImagesQuery } from '../../../api/catApi';
import { useSectionScrollAnimation } from '../../../hooks/useSectionScrollAnimation';

import Cat from '../../shared/preloader/Cat';
import CatCard from './CatCard/CatCard';

import '../../../assets/styles/CatList.scss';
import ButtonHome from '../../shared/ButtonHome/ButtonHome';
import { RootState } from '../../../api/store/store';
import { useSelector } from 'react-redux';
// import {
//   animateImagesEnter,
//   animateImagesLeave,
// } from '../../../utils/homeButtonAnimation';

import s from './CatList.module.scss';

export interface Cat {
  id: string;
  url: string;
  breeds: Array<{
    name?: string;
    description?: string;
  }>;
}

const CatList: React.FC = () => {
  const { data: cats = [], isLoading } = useFetchCatImagesQuery(10);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const redRoundRef = useRef<HTMLImageElement | null>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { isOpen } = useSelector((state: RootState) => state.modal);

  // useEffect(() => {
  //   if (isVisible && redRoundRef.current) {
  //     const buttonRect = redRoundRef.current.getBoundingClientRect();
  //     animateImagesEnter(buttonRect, imagesRef, 'left-diagonal-down');
  //   }
  // }, [isVisible]);

  useEffect(() => {
    console.log(
      'useEffect triggered, isOpen:',
      isOpen,
      'cats.length:',
      cats.length
    );

    if (cats.length > 0) {
      const timer = setTimeout(() => {
        setIsRendered(true);
        setIsVisible(true);
      }, 300);

      return () => {
        // animateImagesLeave(imagesRef);
        clearTimeout(timer);
      };
    }
  }, [cats, isOpen]);

  // useSectionScrollAnimation(isRendered);

  useSectionScrollAnimation(isRendered, isOpen);

  if (isLoading) return <Cat />;

  return (
    <section className={`cat-list ${isVisible ? 'visible' : 'hidden'}`}>
      <ButtonHome redRoundRef={redRoundRef} />

      {cats.map((cat, index) => (
        <div key={cat.id} className="section cat-item" ref={sectionRef}>
          <div className="wrapper-outer">
            <div className="wrapper-inner">
              <div
                className={`background ${index % 2 === 0 ? 'black' : 'grey'}`}
              >
                <CatCard cat={cat} index={index} className="cat-card" />
              </div>
            </div>
          </div>
        </div>
      ))}

      {[...Array(11)].map((_, index) => (
        <div
          key={index}
          ref={(el) => (imagesRef.current[index] = el!)}
          // ref={(el) => {
          //   if (el) imagesRef.current[index] = el;
          // }}
          className={s.galleryImage}
        >
          <img src="/paw.png" alt="Gallery" />
        </div>
      ))}
    </section>
  );
};

export default CatList;
