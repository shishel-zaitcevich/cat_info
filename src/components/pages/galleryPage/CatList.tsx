import React from 'react';
import { useFetchCatImagesQuery } from '../../../api/catApi';
import { CatDetail } from './CatDetail';
import '../../../assets/styles/CatList.scss';

const CatList: React.FC = () => {
  const { data: cats = [], isLoading } = useFetchCatImagesQuery(10);

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className="cat-list">
      {cats.map((cat) => (
        <div key={cat.id} className="cat-item">
          <img
            src={cat.url}
            alt={cat.breeds[0]?.name || 'Cat'}
            className="cat-img"
          />
          <h2 className="cat-name">{cat.breeds[0]?.name || 'Без породы'}</h2>
          <p className="cat-description"> {cat.breeds[0]?.description}</p>
          <CatDetail />
        </div>
      ))}
    </div>
  );
};

export default CatList;
