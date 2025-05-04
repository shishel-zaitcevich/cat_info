import { useRef } from 'react';

import classNames from 'classnames';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../../api/store/modalSlice';

import { Cat } from '../CatList';
import FavouriteButton from '../FavouriteButton';
import useCatCardAnimation from '../../../../hooks/useCatCardAnimation';

import s from './CatCard.module.scss';
import { useAppSelector } from '../../../../hooks/useAppSelector';

interface CatCardProps {
  cat: Cat;
  index: number;
  className?: string;
}

const CatCard = ({ cat, index, className }: CatCardProps) => {
  const dispatch = useDispatch();

  // const subId = 'user-99568';

  const subId = useAppSelector((state) => state.auth.subId);

  const refs = {
    cardRef: useRef<HTMLDivElement>(null),
    imageRef: useRef<HTMLImageElement>(null),
    headingRef: useRef<HTMLHeadingElement>(null),
    descriptionRef: useRef<HTMLParagraphElement>(null),
    buttonFavRef: useRef<HTMLButtonElement>(null),
    linkMoreRef: useRef<HTMLButtonElement>(null),
  };

  useCatCardAnimation(refs, index);

  return (
    <div ref={refs.cardRef} className={classNames(s.cat__card, className)}>
      <div className={s.cat__container}>
        <div className={s.image}>
          <img
            src={cat.url}
            alt={cat.breeds[0]?.name || 'Cat'}
            className={s.cat__img}
            loading="lazy"
            ref={refs.imageRef}
          />
          <button
            className={s.knowMore}
            ref={refs.linkMoreRef}
            onClick={() =>
              dispatch(openModal({ type: 'CatDetails', props: { index } }))
            }
          >
            Know more
          </button>
        </div>
        <h2 className={s.cat__name} ref={refs.headingRef}>
          {cat.breeds[0]?.name || 'Без породы'}
        </h2>
      </div>
      <div className={s.cat__container}>
        <p className={s.cat__description} ref={refs.descriptionRef}>
          {cat.breeds[0]?.description || 'Описание отсутствует'}
        </p>
        {subId && (
          <FavouriteButton
            catId={cat.id}
            subId={subId}
            className={s.cat__favourite}
            ref={refs.buttonFavRef}
          />
        )}
      </div>
    </div>
  );
};

export default CatCard;
