import { useEffect, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import {
  animateFadeIn,
  animateSlideUp,
} from '../components/pages/homePage/lib/basicAnimations';

interface UseImageLoadAnimationParams {
  imageSrc: string;
  imageSelector: string;
  headerSelector?: string;
  fadeInDuration?: number;
  slideUpDelay?: number;
}

/**
 * Хук для управления анимацией при загрузке изображения
 * Сначала fade-in изображения, затем slide-up заголовка
 */
export const useImageLoadAnimation = ({
  imageSrc,
  imageSelector,
  headerSelector,
  fadeInDuration = 0.5,
  slideUpDelay = 0.7,
}: UseImageLoadAnimationParams) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Предзагрузка изображения
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => {
      console.error(`Failed to load image: ${imageSrc}`);
      setIsImageLoaded(true); // Показываем контент даже при ошибке
    };
  }, [imageSrc]);

  // Callback для анимации заголовка
  const animateHeader = useCallback(() => {
    if (headerSelector) {
      animateSlideUp(headerSelector, {
        duration: 2,
        delay: slideUpDelay,
        yStart: 100,
        ease: 'expo.out',
      });
    }
  }, [headerSelector, slideUpDelay]);

  // Запуск анимаций
  useGSAP(
    () => {
      if (isImageLoaded) {
        animateFadeIn(imageSelector, fadeInDuration, animateHeader);
      }
    },
    {
      dependencies: [isImageLoaded],
    }
  );

  return { isImageLoaded };
};
