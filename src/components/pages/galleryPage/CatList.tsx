import React, { useEffect, useRef, useState } from 'react';
import { useFetchCatImagesQuery } from '../../../api/catApi';
import { CatDetail } from './CatDetail';
import '../../../assets/styles/CatList.scss';

import useCatListAnimation from '../../../hooks/useCatListAnimation';
import Cat from '../../shared/preloader/Cat';

interface Cat {
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
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (cats.length > 0) {
      detailRefs.current = Array(cats.length).fill(null);
      const timer = setTimeout(() => {
        setIsRendered(true);
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cats]);

  useCatListAnimation(
    isRendered,
    detailRefs,
    imageRefs,
    headingRefs,
    descriptionRefs
  );

  if (isLoading) return <Cat />;

  return (
    <>
      <section className={`cat-list ${isVisible ? 'visible' : 'hidden'}`}>
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
                    ref={(el) => (imageRefs.current[index] = el)}
                  />
                  <h2
                    className="cat-name"
                    ref={(el) => (headingRefs.current[index] = el)}
                  >
                    {cat.breeds[0]?.name || 'Без породы'}
                  </h2>
                  <p
                    className="cat-description"
                    ref={(el) => (descriptionRefs.current[index] = el)}
                  >
                    {cat.breeds[0]?.description || 'Описание отсутствует'}
                  </p>
                  <CatDetail
                    className="cat-details"
                    ref={(el) => {
                      if (el) {
                        detailRefs.current[index] = el;
                        console.log(`✅ detailRefs[${index}] заполнен:`, el);
                      }
                    }}
                  />
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
