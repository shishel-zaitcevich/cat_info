import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAddToFavoritesMutation,
  useFetchCatByBreedQuery,
  useFetchFavoritesQuery,
  useRemoveFromFavoritesMutation,
} from '../../../api/catApi';

import '../../../assets/styles/CatDetail.scss';
import { useMustachesShakeAnimation } from '../../../hooks/useMustachesShake';

interface CatDetailProps {
  className?: string;
}

export const CatDetail = React.forwardRef<HTMLDivElement, CatDetailProps>(
  ({ className }, ref) => {
    const { buttonRef, leftMustacheRef, rightMustacheRef } =
      useMustachesShakeAnimation();

    const { breedId } = useParams<{ breedId: string }>();
    const [isFavourite, setIsFavourite] = useState(false);

    const { data: catImages = [], isLoading } = useFetchCatByBreedQuery(
      breedId || ''
    );
    const subId = 'user-99568';
    const { data: favorites = [], refetch } = useFetchFavoritesQuery({ subId });
    const [addToFavorites] = useAddToFavoritesMutation();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();

    const catImage = catImages[0];

    useEffect(() => {
      if (!catImage || isLoading) return;
      const isInFavoriteList = favorites.some(
        (fav) => fav.image_id === catImage.id
      );
      setIsFavourite(isInFavoriteList);
    }, [favorites, catImage, isLoading]);

    const handleFavoriteClick = async () => {
      if (!catImage) return;

      try {
        // Проверяем текущее состояние избранного
        const favoriteEntry = favorites.find(
          (fav) => fav.image_id === catImage.id
        );
        const isInFavoriteList = favorites.some(
          (fav) => fav.image_id === catImage.id
        );

        console.log('favorites:', favorites);
        console.log('catImage.id:', catImage.id);
        console.log('isInFavoriteList:', isInFavoriteList);
        console.log('favoriteEntry:', favoriteEntry);

        if (isInFavoriteList && favoriteEntry) {
          await removeFromFavorites({
            favouriteId: favoriteEntry.id.toString(),
          }).unwrap();
          setIsFavourite(false);
          console.log('Успешно удалено!');
        } else {
          const response = await addToFavorites({
            imageId: catImage.id,
            subId,
          }).unwrap();

          console.log('Успешно добавлено!', response);
          setIsFavourite(true);
          // Ждем обновления данных
          await refetch();

          // После refetch проверяем заново
          const updatedFavorites = (await refetch()).data || favorites;
          const isNowInFavoriteList = updatedFavorites.some(
            (fav) => fav.image_id === catImage.id
          );
          setIsFavourite(isNowInFavoriteList);
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (!catImage) return <p>Информация о породе недоступна.</p>;
    return (
      <div className={`cat-detail ${className || ''}`} ref={ref}>
        {catImages.length > 0 && (
          <button
            onClick={handleFavoriteClick}
            className="button-favourite"
            ref={buttonRef}
          >
            <p className="like-button__text">
              {isFavourite ? 'Remove from favorites' : 'Add to favorites'}
            </p>
            <div className="like-button">
              <img
                src="/mustacheLeft.png"
                alt="Left mustache"
                className="mustache"
                ref={leftMustacheRef}
              />
              <img
                src={isFavourite ? '/inFavourite.png' : '/addToFavourite.png'}
                alt="Favorite icon"
                className="like"
              />
              <img
                src="/mustacheRight.png"
                alt="Right mustache"
                className="mustache"
                ref={rightMustacheRef}
              />
            </div>
          </button>
        )}
      </div>
    );
  }
);
