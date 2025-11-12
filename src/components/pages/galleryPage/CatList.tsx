import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useFetchCatImagesQuery } from '../../../api/catApi';
import { RootState } from '../../../api/store/store';

import { useSectionScrollAnimation } from '../../../hooks/useSectionScrollAnimation';

import Cat from '../../shared/preloader/Cat';
import CatCard from './CatCard/CatCard';

import WaveBackground from '../../shared/Backgrounds/WaveBackground';
import NebulaPurpleBackground from '../../shared/Backgrounds/NebulaPurpleBackground';

import s from './CatList.module.scss';
import '../../../assets/styles/CatList.scss';

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
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { isOpen } = useSelector((state: RootState) => state.modal);

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
        clearTimeout(timer);
      };
    }
  }, [cats, isOpen]);

  useSectionScrollAnimation(isRendered, isOpen);

  if (isLoading) return <Cat />;

  return (
    <section className={`cat-list ${isVisible ? 'visible' : 'hidden'}`}>
      <div className={s.auth__wrapper}>
        {/* <ButtonHome redRoundRef={redRoundRef} /> */}
      </div>

      {cats.map((cat, index) => {
        const BackgroundComponent =
          index % 2 === 0 ? NebulaPurpleBackground : WaveBackground;

        return (
          <div key={cat.id} className="section cat-item" ref={sectionRef}>
            <div className="wrapper-outer">
              <div className="wrapper-inner">
                <BackgroundComponent>
                  <CatCard cat={cat} index={index} className="cat-card" />
                </BackgroundComponent>
              </div>
            </div>
          </div>
        );
      })}

      {[...Array(11)].map((_, index) => (
        <div
          key={index}
          ref={(el) => (imagesRef.current[index] = el!)}
          className={s.galleryImage}
        >
          <img src="/paw.png" alt="Gallery" />
        </div>
      ))}
    </section>
  );
};

export default CatList;
