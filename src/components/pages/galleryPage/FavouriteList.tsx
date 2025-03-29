import { useState } from 'react';
import {
  useFetchFavoritesQuery,
  useRemoveFromFavoritesMutation,
} from '../../../api/catApi';

const FavoritesList: React.FC = () => {
  const subId = 'user-123';
  const [page, setPage] = useState(1);
  const { data: favorites = [], isLoading } = useFetchFavoritesQuery({
    subId,
    page,
  });
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

      {/* Пагинация */}
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ← Назад
        </button>
        <span>Страница {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Вперед →</button>
      </div>
    </div>
  );
};

export default FavoritesList;
