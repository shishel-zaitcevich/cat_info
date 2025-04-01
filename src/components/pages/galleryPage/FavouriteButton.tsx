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
    // Локальное состояние, не зависящее от RTK Query
    const [isFavourite, setIsFavourite] = useState(false);
    const [favId, setFavId] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Опция `refetchOnFocus: true` заставит запрос выполняться при фокусе окна
    // `refetchOnReconnect: true` - при восстановлении сетевого соединения
    // `refetchOnMountOrArgChange: true` - при монтировании компонента
    const { data: favorites = [], refetch } = useFetchFavoritesQuery(
      { subId },
      {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        // Важно: не кешировать данные слишком долго
        pollingInterval: 10000, // Опционально: обновлять каждые 10 секунд
      }
    );

    const [addToFavorites] = useAddToFavoritesMutation();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();

    const buttonRef = ref as RefObject<HTMLButtonElement>;

    const { leftMustacheRef, rightMustacheRef } =
      useMustachesShakeAnimation(buttonRef);

    // Проверяем, находится ли изображение в избранном при загрузке данных
    useEffect(() => {
      if (favorites && favorites.length > 0) {
        const favoriteEntry = favorites.find((fav) => fav.image_id === catId);
        // console.log(
        //   'Результат поиска в избранном:',
        //   favoriteEntry ? 'Найдено' : 'Не найдено'
        // );
        // console.log('ID изображения для поиска:', catId);
        // console.log('Количество элементов в избранном:', favorites.length);

        // Более подробное логирование для диагностики
        // if (favorites.length > 0) {
        //   console.log(
        //     'Первые несколько ID изображений в избранном:',
        //     favorites.slice(0, 5).map((f) => f.image_id)
        //   );
        // }

        const isInFavoriteList = Boolean(favoriteEntry);
        // console.log(isInFavoriteList, 'isInFavoriteList');
        // console.log('favoriteEntry', favoriteEntry);

        setIsFavourite(isInFavoriteList);

        if (favoriteEntry) {
          setFavId(favoriteEntry.id.toString());
          console.log('Найден ID избранного:', favoriteEntry.id.toString());
        } else {
          setFavId(null);
        }
      }
    }, [favorites, catId]);

    const handleFavoriteClick = async () => {
      if (isUpdating) return; // Предотвращаем двойные клики

      setIsUpdating(true);

      try {
        if (isFavourite) {
          if (favId) {
            // console.log('Попытка удаления из избранного с ID:', favId);
            await removeFromFavorites({
              favouriteId: favId,
            }).unwrap();
            // console.log('Удалено из избранного');
          } else {
            // Если ID не сохранен локально, поищем его еще раз
            const favoriteEntry = favorites.find(
              (fav) => fav.image_id === catId
            );
            if (favoriteEntry) {
              // console.log(
              //   'Найден ID избранного для удаления:',
              //   favoriteEntry.id.toString()
              // );
              await removeFromFavorites({
                favouriteId: favoriteEntry.id.toString(),
              }).unwrap();
              // console.log('Удалено из избранного');
            } else {
              console.error('Не удалось найти ID для удаления из избранного');
            }
          }

          // Принудительно обновляем локальное состояние
          setIsFavourite(false);
          setFavId(null);
        } else {
          // console.log('Добавление в избранное изображения:', catId);
          const response = await addToFavorites({
            imageId: catId,
            subId,
          }).unwrap();
          // console.log('Добавлено в избранное!', response);

          // Принудительно обновляем локальное состояние
          setIsFavourite(true);
          setFavId(response.id.toString());
        }

        // Принудительно запрашиваем обновленные данные с сервера
        await refetch();

        // Для гарантии можно сделать повторный запрос с задержкой
        setTimeout(() => {
          refetch().catch((err) =>
            console.error('Ошибка при повторном запросе:', err)
          );
        }, 1000);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        // В случае ошибки пытаемся обновить данные
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
