import '../../../assets/styles/homePage/GallerySection.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useCallback, useState } from 'react';

export function GallerySection() {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const totalImages = 3;
  const allImagesLoaded = imagesLoaded === totalImages;

  const isTablet = window.innerWidth <= 768;
  const isMobile = window.innerWidth <= 520;

  console.log(isMobile);

  const handleImageLoad = useCallback(() => {
    setImagesLoaded((prev) => prev + 1);
  }, []);

  useGSAP(() => {
    if (!allImagesLoaded) return;

    gsap.defaults({ ease: 'power2.out' });

    // Анимация фона
    gsap.to('.gallery__section', {
      backgroundSize: isTablet ? '170%' : '100%',
      backgroundPosition: isTablet ? 'center center' : '50% 100%',
      scrollTrigger: {
        trigger: '.gallery__section',
        start: 'top 90%',
        end: 'bottom top',
        scrub: 1,
        markers: true,
      },
    });

    const images = ['.one', '.two', '.three'];

    gsap.set(images, { opacity: 0.65, scale: 1 });

    // Анимация изображений
    images.forEach((selector) => {
      gsap.to(selector, {
        scale: 0.7,
        opacity: 1,
        duration: 1.5, // Увеличиваем длительность
        scrollTrigger: {
          trigger: '.gallery__section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1, // Делаем анимацию двусторонней и плавной
          toggleActions: 'play reverse play reverse', // Реакция на скролл вверх/вниз
        },
      });
    });

    // gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.galleryHeader',
    //     start: 'top 95%',
    //     end: 'bottom 100%',
    //     scrub: 0.5,
    //   },
    // });
    // Анимация заголовка
    gsap.set('.galleryHeader', { opacity: 0.1 });
    gsap.to('.galleryHeader', {
      opacity: 1,
      // y: '80%',
      duration: 8.5,
      scrollTrigger: {
        trigger: '.gallery__section',
        start: 'top 50%',
        end: 'bottom 70%',
        scrub: 1,
        toggleActions: 'play reverse play reverse',
      },
    });
  }, [allImagesLoaded]);

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
      <h1 className="galleryHeader" id="on" data-scroll data-scroll-speed="-4">
        GALLERY
      </h1>
    </div>
  );
}
