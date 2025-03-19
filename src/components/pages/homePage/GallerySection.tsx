import '../../../assets/styles/homePage/GallerySection.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useState } from 'react';

export function GallerySection() {
  // Добавим состояние для контроля загрузки всех изображений
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 3;
  const allImagesLoaded = imagesLoaded === totalImages;

  // Функция для отслеживания загрузки каждого изображения
  const handleImageLoad = useCallback(() => {
    setImagesLoaded((prev) => prev + 1);
  }, []);

  useGSAP(() => {
    // Запускаем анимации только когда все изображения загружены
    if (!allImagesLoaded) return;

    gsap.defaults({ ease: 'power1.out', duration: 1 });

    gsap.to('.gallery__section', {
      backgroundSize: '100%',
      backgroundPosition: '50% 100%',

      scrollTrigger: {
        trigger: '.gallery__section',
        scrub: 1,
        start: 'top 95%',
        end: 'bottom top',
        markers: true,
      },
    });

    const images = ['.one', '.two', '.three'];
    images.forEach((selector) => {
      gsap.to(selector, {
        transform: 'scale(.7)',
        opacity: 0.65,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.gallery__section',
          markers: true,
          scrub: 0.5,
          start: 'top 99%',
          end: 'bottom bottom',
        },
        delay: 0.05,
      });
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.header',
        start: 'top 95%',
        end: 'bottom 100%',
        scrub: 0.5,
      },
    });
    // .fromTo('.header', { opacity: 0.1 }, { opacity: 1 });
    gsap.set('.gallery__section', { opacity: 0.1 });
    gsap.to('.gallery__section', {
      opacity: 1,
      duration: 2.5,
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }, [allImagesLoaded]); // Зависимость от загрузки всех изображений

  return (
    <div
      className="gallery__section"
      id="gallerySection"
      data-scroll-section
      style={{
        opacity: allImagesLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <img
        className="one"
        src="/deniz-uzuner-0ZffcNJ7jP0-unsplash.jpg"
        alt=""
        data-scroll
        data-scroll-speed="-2"
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <img
        className="two"
        src="/sara-groblechner-m5u3tXsY76w-unsplash.jpg"
        alt=""
        data-scroll
        data-scroll-speed="-5"
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <img
        className="three"
        src="/oguzhan-tasimaz-r2Uk2g31JiE-unsplash.jpg"
        alt=""
        data-scroll
        data-scroll-speed="-1"
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <h1 className="header" id="on" data-scroll data-scroll-speed="-4">
        GALLERY
      </h1>
    </div>
  );
}
