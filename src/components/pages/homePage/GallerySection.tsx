import { useCallback, useState } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import '../../../assets/styles/homePage/GallerySection.scss';
import { useWindowSize } from 'usehooks-ts';

export function GallerySection() {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { width } = useWindowSize();
  const TABLET_BREAKPOINT = 900;
  const MOBILE_BREAKPOINT = 520;
  const isTablet = width < TABLET_BREAKPOINT;
  const isMobile = width < MOBILE_BREAKPOINT;

  const totalImages = 3;
  const allImagesLoaded = imagesLoaded === totalImages;

  // console.log(isMobile);

  const handleImageLoad = useCallback(() => {
    setImagesLoaded((prev) => prev + 1);
  }, []);

  useGSAP(() => {
    if (!allImagesLoaded) return;

    gsap.defaults({ ease: 'power2.out' });

    gsap.to('.gallery__section', {
      backgroundSize: isTablet ? '170%' : '100%',
      backgroundPosition: isTablet ? '80% 20%' : '50% 70%',
      scrollTrigger: {
        trigger: '.gallery__section',
        start: 'top 90%',
        end: 'bottom top',
        scrub: isTablet || isMobile ? 0.5 : 1,
      },
    });

    const images = ['.one', '.two', '.three'];

    if (isMobile) {
      gsap.set(images, { scale: 0.7 });
      gsap.to(images, {
        scale: 1.3,
        scrollTrigger: {
          trigger: '.gallery__section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      });
    } else {
      gsap.set(images, { opacity: 0.65, scale: 1 });
      images.forEach((selector) => {
        gsap.to(selector, {
          scale: 0.7,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: '.gallery__section',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
            toggleActions: 'play reverse play reverse',
          },
        });
      });
    }

    if (!isMobile) {
      gsap.set('.galleryHeader', { opacity: isMobile ? 0.3 : 0.1 });
      gsap.to('.galleryHeader', {
        opacity: 1,
        duration: isMobile ? 4 : 8.5,
        scrollTrigger: {
          trigger: '.gallery__section',
          start: 'top 50%',
          end: 'bottom 70%',
          scrub: 1,
          toggleActions: 'play reverse play reverse',
        },
      });
    } else {
      gsap.set('.galleryHeader', {
        y: 700,
        opacity: 0,
      });

      gsap.to('.galleryHeader', {
        y: 0,
        opacity: 1,
        duration: 6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery__section',
          start: 'top 80%',
          end: 'top 30%',
          scrub: 6,
          toggleActions: 'play reverse play reverse',
        },
      });
    }
  }, [allImagesLoaded, isMobile]);

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
        // src="/adorable-cat-lifestyle.jpg"
        src="/redcat1.jpg"
        alt=""
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <img
        className="two"
        src="/sara-groblechner-m5u3tXsY76w-unsplash.jpg"
        // src="/bg.jpg"
        alt=""
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <img
        className="three"
        src="/three.jpg"
        alt=""
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <h1 className="galleryHeader" id="on">
        GALLERY
      </h1>
    </div>
  );
}
