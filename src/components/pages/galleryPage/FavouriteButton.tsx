import { forwardRef, RefObject, useEffect, useState } from 'react';
import {
  useAddToFavoritesMutation,
  useFetchFavoritesQuery,
  useRemoveFromFavoritesMutation,
} from '../../../api/catApi';

import '../../../assets/styles/FavouriteButton.scss';
import { useMustachesShakeAnimation } from '../../../hooks/useMustachesShake';

interface FavouriteButtonProps {
  className?: string;
  catId: string;
  subId: string;
}

const FavouriteButton = forwardRef<HTMLButtonElement, FavouriteButtonProps>(
  ({ className, catId, subId }, ref) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const { data: favorites = [] } = useFetchFavoritesQuery({ subId });
    const [addToFavorites] = useAddToFavoritesMutation();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();

    const buttonRef = ref as RefObject<HTMLButtonElement>;

    const { leftMustacheRef, rightMustacheRef } =
      useMustachesShakeAnimation(buttonRef);

    useEffect(() => {
      const isInFavoriteList = favorites.some((fav) => fav.image_id === catId);
      console.log(isInFavoriteList, 'isInFavoriteList');
      console.log(favorites, 'favorites');
      setIsFavourite(isInFavoriteList);
    }, [favorites, catId]);

    const handleFavoriteClick = async () => {
      try {
        const favoriteEntry = favorites.find((fav) => fav.image_id === catId);

        if (isFavourite && favoriteEntry) {
          await removeFromFavorites({
            favouriteId: favoriteEntry.id.toString(),
          }).unwrap();
          console.log('Удалено из избранного');
          setIsFavourite(false);
        } else {
          const response = await addToFavorites({
            imageId: catId,
            subId,
          }).unwrap();
          console.log('Добавлено в избранное!', response);
          // setIsFavourite(true);
        }

        // await refetch();
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    return (
      <button
        ref={ref}
        onClick={handleFavoriteClick}
        className={`button-favourite ${className || ''}`}
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
    );
  }
);

export default FavouriteButton;
