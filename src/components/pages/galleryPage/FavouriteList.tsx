import {
  useFetchFavoritesQuery,
  useRemoveFromFavoritesMutation,
} from '../../../api/catApi';

import { useAppSelector } from '../../../hooks/useAppSelector';

const FavoritesList: React.FC = () => {
  const subId = useAppSelector((state) => state.auth.subId);

  const { data: favorites = [], isLoading } = useFetchFavoritesQuery({
    subId: subId ?? '',
  });
  console.log(subId);
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();

  if (isLoading) return <p>Загрузка избранных котов...</p>;

  return (
    <div className="favorites">
      <h2>Избранные коты</h2>
      <div className="favorites-grid">
        {favorites.map((fav) => (
          <div key={fav.id} className="favorite-item">
            <img src={fav.image.url} alt="Favorite Cat" />
            <button
              onClick={() =>
                removeFromFavorites({ favouriteId: fav.id.toString() })
              }
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
