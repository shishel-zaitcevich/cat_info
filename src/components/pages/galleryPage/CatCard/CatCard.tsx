import { useRef } from 'react';
import { Cat } from '../CatList';
import FavouriteButton from '../FavouriteButton';
import useCatCardAnimation from '../../../../hooks/useCatCardAnimation';

import s from './CatCard.module.scss';

const CatCard: React.FC<{ cat: Cat; index: number }> = ({ cat, index }) => {
  const subId = 'user-99568';
  const refs = {
    cardRef: useRef<HTMLDivElement>(null),
    imageRef: useRef<HTMLImageElement>(null),
    headingRef: useRef<HTMLHeadingElement>(null),
    descriptionRef: useRef<HTMLParagraphElement>(null),
    buttonFavRef: useRef<HTMLButtonElement>(null),
  };

  useCatCardAnimation(refs, index);

  return (
    <div ref={refs.cardRef} className={s.cat__card}>
      <img
        src={cat.url}
        alt={cat.breeds[0]?.name || 'Cat'}
        className={s.cat__img}
        loading="lazy"
        ref={refs.imageRef}
      />
      <h2 className={s.cat__name} ref={refs.headingRef}>
        {cat.breeds[0]?.name || 'Без породы'}
      </h2>
      <p className={s.cat__description} ref={refs.descriptionRef}>
        {cat.breeds[0]?.description || 'Описание отсутствует'}
      </p>
      <FavouriteButton
        catId={cat.id}
        subId={subId}
        className={s.cat__favourite}
        // className="cat-details"
        ref={refs.buttonFavRef}
      />
    </div>
  );
};

export default CatCard;
