import { useCallback, useState, useMemo } from 'react';
import { useWindowSize } from 'usehooks-ts';

import '../../../assets/styles/homePage/GallerySection.scss';
import { useGalleryAnimations } from '../../../hooks/useBasicAnimations';

const TABLET_BREAKPOINT = 900;
const MOBILE_BREAKPOINT = 520;
const TOTAL_IMAGES = 3;
const IMAGE_SELECTORS = ['.one', '.two', '.three'];

const IMAGES = [
  { src: '/redcat1.jpg', className: 'one', alt: 'Cat 1' },
  {
    src: '/sara-groblechner-m5u3tXsY76w-unsplash.jpg',
    className: 'two',
    alt: 'Cat 2',
  },
  { src: '/three.jpg', className: 'three', alt: 'Cat 3' },
] as const;

export function GallerySection() {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const { width } = useWindowSize();

  const breakpoints = useMemo(
    () => ({
      isTablet: width < TABLET_BREAKPOINT,
      isMobile: width < MOBILE_BREAKPOINT,
    }),
    [width]
  );

  const { isTablet, isMobile } = breakpoints;

  const allImagesLoaded = useMemo(
    () => imagesLoaded === TOTAL_IMAGES,
    [imagesLoaded]
  );

  const handleImageLoad = useCallback(() => {
    setImagesLoaded((prev) => prev + 1);
  }, []);

  useGalleryAnimations({
    isTablet,
    isMobile,
    allImagesLoaded,
    imageSelectors: IMAGE_SELECTORS,
  });

  return (
    <div
      className="gallery__section"
      id="gallerySection"
      data-scroll-section
      // style={{
      //   // opacity: allImagesLoaded ? 1 : 0,
      //   transition: 'opacity 0.5s ease',
      // }}
    >
      {IMAGES.map((image) => (
        <img
          key={image.className}
          className={image.className}
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
        />
      ))}
      <h1 className="galleryHeader" id="on">
        GALLERY
      </h1>
    </div>
  );
}
