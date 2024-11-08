import React, { useEffect, useState, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import '../../assets/styles/CatGalleryPage.scss';
import { CatImage } from '../../api/catApi';

const CatGalleryPage: React.FC = () => {
  const [catData, setCatData] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [showImages, setShowImages] = useState<boolean[]>([]); // Для управления анимацией

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_CAT_API_KEY;
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=${apiKey}`
        );
        const data = await response.json();
        setCatData(data);
        setShowImages(new Array(data.length).fill(false)); // Инициализируем массив для анимации
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить данные о котах.');
      } finally {
        setLoading(false);
      }
    };

    fetchCatData();
  }, []);

  useEffect(() => {
    if (galleryRef.current) {
      const locoScroll = new LocomotiveScroll({
        el: galleryRef.current,
        smooth: true,
      });

      return () => {
        locoScroll.destroy();
      };
    }
  }, [catData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(new Array(catData.length).fill(true)); // Показываем изображения через 100 мс после загрузки
    }, 100);

    return () => clearTimeout(timer);
  }, [catData]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (catData.length === 0) return <p>Нет данных о котах.</p>;

  return (
    <main ref={galleryRef} data-scroll-container>
      <header data-scroll-section>
        <div className="wrapper">
          <h1>Привет, любители котов!</h1>
          <p>
            Это галерея котов с использованием библиотеки Locomotive Scroll.
          </p>
        </div>
      </header>
      <section data-scroll-section className="container">
        {catData.map((cat, index) => {
          const { url, breeds } = cat;
          const breed = breeds.length > 0 ? breeds[0] : null;

          return (
            <div
              key={cat.id}
              className={`parallax ${showImages[index] ? 'show' : ''}`}
            >
              <img
                data-scroll
                data-scroll-speed="-5"
                src={url}
                alt={breed ? breed.name : 'Кот'}
              />
              <div data-scroll data-scroll-speed="2" className="text">
                <div className="wrapper">
                  {breed ? (
                    <>
                      <h2>{breed.name}</h2>
                      <p>Темперамент: {breed.temperament}</p>
                      <p>Происхождение: {breed.origin}</p>
                      <p>Продолжительность жизни: {breed.life_span}</p>
                      <p>
                        <a
                          href={breed.wikipedia_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Узнайте больше о {breed.name}
                        </a>
                      </p>
                    </>
                  ) : (
                    <p>Информация о породе недоступна.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default CatGalleryPage;
