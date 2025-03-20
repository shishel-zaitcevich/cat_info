import React, { useEffect, useState } from 'react';
import { useFetchCatImagesQuery } from '../../../api/catApi';
import { CatDetail } from './CatDetail';
import '../../../assets/styles/CatList.scss';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
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

  useEffect(() => {
    if (cats.length > 0) {
      setTimeout(() => setIsRendered(true), 50);
    }
  }, [cats]); //чтобы gsap target не было null

  useEffect(() => {
    if (cats.length > 0) {
      // Устанавливаем флаг рендеринга
      setTimeout(() => setIsRendered(true), 50);
      // Устанавливаем видимость только после того, как анимация может начаться
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [cats]);

  useCatListAnimation(isRendered);

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

// export interface Cat {
//   id: string;
//   url: string;
//   breeds: { name?: string; description?: string }[];
// }

// const CatList: React.FC = () => {
//   const { data: cats = [], isLoading } = useFetchCatImagesQuery(10);
//   const [isRendered, setIsRendered] = useState(false);

//   useEffect(() => {
//     if (cats.length > 0) {
//       setTimeout(() => setIsRendered(true), 50);
//     }
//   }, [cats]); //чтобы gsap target не было null

//   useCatListAnimation(isRendered);

//   if (isLoading) return <Cat />;

//   return (
//     <>
//       <section className="cat-list">
//         {cats.map((cat: Cat, index: number) => (
//           <div key={cat.id} className="section cat-item">
//             <div className="wrapper-outer">
//               <div className="wrapper-inner">
//                 <div
//                   className={`background ${index % 2 === 0 ? 'black' : 'grey'}`}
//                 >
//                   <img
//                     src={cat.url}
//                     alt={cat.breeds[0]?.name || 'Cat'}
//                     className="cat-img"
//                     loading="lazy"
//                   />
//                   <h2 className="cat-name">
//                     {cat.breeds[0]?.name || 'Без породы'}
//                   </h2>
//                   <p className="cat-description">
//                     {cat.breeds[0]?.description || 'Описание отсутствует'}
//                   </p>
//                   <CatDetail className="details" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// };

// export default CatList;
