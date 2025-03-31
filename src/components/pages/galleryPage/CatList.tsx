import React, { useEffect, useState } from 'react';

import { useFetchCatImagesQuery } from '../../../api/catApi';
import { useSectionScrollAnimation } from '../../../hooks/useSectionScrollAnimation';

import Cat from '../../shared/preloader/Cat';
import CatCard from './CatCard/CatCard';

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

  useEffect(() => {
    if (cats.length > 0) {
      const timer = setTimeout(() => {
        setIsRendered(true);
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cats]);

  useSectionScrollAnimation(isRendered);

  if (isLoading) return <Cat />;

  return (
    <section className={`cat-list ${isVisible ? 'visible' : 'hidden'}`}>
      {cats.map((cat, index) => (
        <div key={cat.id} className="section cat-item">
          <div className="wrapper-outer">
            <div className="wrapper-inner">
              <div
                className={`background ${index % 2 === 0 ? 'black' : 'grey'}`}
              >
                <CatCard cat={cat} index={index} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CatList;
