import { useFetchCatImagesQuery } from '../../../../api/catApi';

import s from './CatDetails.module.scss';

export interface CatDetailsProps {
  index: number;
}

const CatDetails: React.FC<CatDetailsProps> = ({ index }) => {
  const { data: cats = [], isLoading } = useFetchCatImagesQuery(10);

  if (isLoading) return <p>Загрузка...</p>;

  if (!cats || cats.length === 0) return <p>Нет данных по этой породе</p>;

  const breed = cats[index].breeds[0];

  return (
    <div className={s.catCard}>
      <img src={cats[index].url} alt={breed.name} className={s.catImage} />
      <div className={s.catName}>{breed.name}</div>
      <div className={s.catInfo}>
        <div className={s.infoGrid}>
          <span className={s.label}>Weight:</span>
          <span className={s.value}>{breed.weight.metric} kg</span>
          <span className={s.label}>Temperament:</span>
          <span className={s.value}>{breed.temperament}</span>
          <span className={s.label}>Origin:</span>
          <span className={s.value}>{breed.origin}</span>
          <span className={s.label}>Lifespan:</span>
          <span className={s.value}>{breed.life_span} years</span>
          <span className={s.label}>Child Friendliness:</span>
          <span className={s.value}>{breed.child_friendly}/5</span>
          <span className={s.label}>Dog Friendliness:</span>
          <span className={s.value}>{breed.dog_friendly}/5</span>
          <span className={s.label}>Social Needs:</span>
          <span className={s.value}>{breed.social_needs}/5</span>
          <span className={s.label}>Loudness of meow:</span>
          <span className={s.value}>{breed.vocalisation}/5</span>
          <span className={s.label}>Hypoallergenic:</span>
          <span className={s.value}>{breed.hypoallergenic ? 'Yes' : 'No'}</span>
          <span className={s.wikipediaLink}>
            <a
              href={breed.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more on Wikipedia
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CatDetails;
