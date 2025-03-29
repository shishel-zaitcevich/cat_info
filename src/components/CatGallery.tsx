import React, { useEffect, useState } from 'react';
import { fetchCatImages, CatImage } from '../api/catApi';

const CatGallery: React.FC = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_CAT_API_KEY || '';

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const images = await fetchCatImages(apiKey, 10);
        setCatImages(images);
      } catch (e) {
        console.error(e);
        setError('Не удалось загрузить изображения котов.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [apiKey]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main data-scroll-container>
      <header data-scroll-section>
        <div className="wrapper">
          <h1>Привет, любители котов!</h1>
          <p>
            Это пример галереи котов с использованием библиотеки Locomotive
            Scroll.
          </p>
        </div>
      </header>
      {catImages.map((image) => (
        <section key={image.id} data-scroll-section className="container">
          <div className="parallax">
            <img
              data-scroll
              data-scroll-speed="-5"
              src={image.url}
              alt={image.breeds[0]?.name}
            />
          </div>
          <div data-scroll data-scroll-speed="2" className="text">
            <div className="wrapper">
              {image.breeds.length > 0 ? (
                <>
                  <h2>{image.breeds[0].name}</h2>
                  <p>{image.breeds[0].temperament}</p>
                </>
              ) : (
                <h2>Кот без породы</h2>
              )}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default CatGallery;
