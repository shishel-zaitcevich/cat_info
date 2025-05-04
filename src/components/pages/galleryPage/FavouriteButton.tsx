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
  imageContainerRef: React.RefObject<HTMLDivElement>;
}

const FavouriteButton = forwardRef<HTMLButtonElement, FavouriteButtonProps>(
  ({ className, catId, subId, imageContainerRef }, ref) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const [favId, setFavId] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const { data: favorites = [], refetch } = useFetchFavoritesQuery(
      { subId },
      {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,

        pollingInterval: 10000,
      }
    );

    const [addToFavorites] = useAddToFavoritesMutation();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();

    const buttonRef = ref as RefObject<HTMLButtonElement>;

    const { leftMustacheRef, rightMustacheRef } =
      useMustachesShakeAnimation(buttonRef);

    useEffect(() => {
      if (favorites && favorites.length > 0) {
        const favoriteEntry = favorites.find((fav) => fav.image_id === catId);

        const isInFavoriteList = Boolean(favoriteEntry);

        setIsFavourite(isInFavoriteList);

        if (favoriteEntry) {
          setFavId(favoriteEntry.id.toString());
          console.log('Найден ID избранного:', favoriteEntry.id.toString());
        } else {
          setFavId(null);
        }
      }

      if (isFavourite && imageContainerRef.current) {
        const video = document.createElement('video');
        video.src = '/scene.webm';
        video.autoplay = true;
        video.muted = true;
        video.loop = false;
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '50%';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.pointerEvents = 'none';
        video.style.zIndex = '10';
        video.style.overflow = 'hidden';

        const container = imageContainerRef.current;
        container.style.position = 'relative';
        container.appendChild(video);

        const removeVideo = () => {
          video.remove();
        };

        video.addEventListener('ended', removeVideo);

        return () => {
          video.removeEventListener('ended', removeVideo);
          video.remove();
        };
      }
    }, [favorites, catId, imageContainerRef, isFavourite]);

    const handleFavoriteClick = async () => {
      if (isUpdating) return;

      setIsUpdating(true);

      try {
        if (isFavourite) {
          if (favId) {
            await removeFromFavorites({
              favouriteId: favId,
            }).unwrap();
          } else {
            const favoriteEntry = favorites.find(
              (fav) => fav.image_id === catId
            );
            if (favoriteEntry) {
              await removeFromFavorites({
                favouriteId: favoriteEntry.id.toString(),
              }).unwrap();
            } else {
              console.error('Не удалось найти ID для удаления из избранного');
            }
          }

          setIsFavourite(false);
          setFavId(null);
        } else {
          const response = await addToFavorites({
            imageId: catId,
            subId,
          }).unwrap();

          setIsFavourite(true);
          setFavId(response.id.toString());
        }

        await refetch();

        setTimeout(() => {
          refetch().catch((err) =>
            console.error('Ошибка при повторном запросе:', err)
          );
        }, 1000);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);

        refetch().catch((err) =>
          console.error('Ошибка при запросе после ошибки:', err)
        );
      } finally {
        setIsUpdating(false);
      }
    };

    return (
      <button
        ref={ref}
        onClick={handleFavoriteClick}
        className={`button-favourite ${className || ''}`}
        disabled={isUpdating}
      >
        <p className="like-button__text">
          {isUpdating
            ? 'Updating...'
            : isFavourite
              ? 'Remove from favorites'
              : 'Add to favorites'}
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
