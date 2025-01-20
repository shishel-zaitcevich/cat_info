import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchCatByBreedQuery } from '../../../api/catApi';
import { toggleFavorite } from '../../../store/catSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import '../../../assets/styles/CatDetail.scss';

export const CatDetail: React.FC = () => {
  const { breedId } = useParams<{ breedId: string }>();
  const dispatch = useAppDispatch();
  // const favorites = useAppSelector((state) => state.cats.favorites);

  const isFavorite = useAppSelector((state) =>
    breedId ? state.cats.favorites[breedId] : false
  );

  const { data: catImages = [], isLoading } = useFetchCatByBreedQuery(
    breedId || ''
  );

  if (isLoading) return <p>Загрузка...</p>;

  // const isFavorite = breedId ? favorites[breedId] : false;

  return (
    <div className="cat-detail">
      {catImages.length > 0 ? (
        <>
          {/* <img src={catImages[0].url} alt={catImages[0].breeds[0]?.name} />
          <h2>{catImages[0].breeds[0]?.name}</h2> */}
          <p className="cat-details"></p>
          <button
            onClick={() => {
              dispatch(toggleFavorite(breedId || ''));
              console.log(isFavorite);
            }}
            className="button-favourite"
          >
            {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            <img
              src={isFavorite ? '/mustaches_pink.png' : '/mustaches.png'}
              alt="mustaches"
            />
          </button>
        </>
      ) : (
        <p>Информация о породе недоступна.</p>
      )}
    </div>
  );
};
