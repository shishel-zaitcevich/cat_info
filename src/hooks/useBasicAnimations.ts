import { useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  createAnimationConfig,
  animateGalleryBackground,
  animateGalleryImages,
  animateGalleryHeader,
} from '../components/pages/homePage/lib/basicAnimations';

interface UseGalleryAnimationsParams {
  isTablet: boolean;
  isMobile: boolean;
  allImagesLoaded: boolean;
  imageSelectors: string[];
}

/**
 * Хук для управления всеми анимациями галереи
 */
export const useGalleryAnimations = ({
  isTablet,
  isMobile,
  allImagesLoaded,
  imageSelectors,
}: UseGalleryAnimationsParams) => {
  // Мемоизируем конфигурацию анимаций
  const animationConfig = useMemo(
    () => createAnimationConfig(isTablet, isMobile),
    [isTablet, isMobile]
  );

  // Анимация фона
  const handleBackgroundAnimation = useCallback(() => {
    animateGalleryBackground(animationConfig.background);
  }, [animationConfig.background]);

  // Анимация изображений
  const handleImagesAnimation = useCallback(() => {
    animateGalleryImages(imageSelectors, animationConfig.images, isMobile);
  }, [imageSelectors, animationConfig.images, isMobile]);

  // Анимация заголовка
  const handleHeaderAnimation = useCallback(() => {
    animateGalleryHeader(animationConfig.header, isMobile);
  }, [animationConfig.header, isMobile]);

  // Запуск всех анимаций
  useGSAP(
    () => {
      if (!allImagesLoaded) return;

      gsap.defaults({ ease: 'power2.out' });

      handleBackgroundAnimation();
      handleImagesAnimation();
      handleHeaderAnimation();
    },
    {
      dependencies: [allImagesLoaded, isMobile, isTablet],
      revertOnUpdate: true,
    }
  );

  return {
    animationConfig,
  };
};
