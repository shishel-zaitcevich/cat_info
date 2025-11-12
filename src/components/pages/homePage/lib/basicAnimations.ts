import gsap from 'gsap';

export const animateFadeIn = (
  selector: string,
  duration = 0.5,
  onComplete?: () => void
) => {
  gsap.to(selector, {
    opacity: 1,
    duration,
    onComplete,
  });
};

export const animateSlideUp = (
  selector: string,
  {
    duration = 2,
    delay = 0,
    yStart = 100,
    ease = 'expo.out',
  }: {
    duration?: number;
    delay?: number;
    yStart?: number;
    ease?: string;
  } = {}
) => {
  gsap.set(selector, { visibility: 'hidden', opacity: 0, y: yStart });
  gsap.to(selector, {
    opacity: 1,
    visibility: 'visible',
    y: 0,
    ease,
    duration,
    delay,
  });
};

export interface AnimationConfig {
  background: {
    size: string;
    position: string;
    scrub: number;
  };
  images: {
    initialScale: number;
    targetScale: number;
    scrub: number;
    initialOpacity?: number;
    targetOpacity?: number;
  };
  header: {
    initialY?: number;
    initialOpacity: number;
    targetY?: number;
    targetOpacity: number;
    scrub: number;
  };
}

export const createAnimationConfig = (
  isTablet: boolean,
  isMobile: boolean
): AnimationConfig => ({
  background: {
    size: isTablet ? '170%' : '100%',
    position: isTablet ? '80% 20%' : '50% 70%',
    scrub: isTablet || isMobile ? 0.5 : 1,
  },
  images: isMobile
    ? {
        initialScale: 0.7,
        targetScale: 1.3,
        scrub: 0.5,
      }
    : {
        initialScale: 1,
        initialOpacity: 0.65,
        targetScale: 0.7,
        targetOpacity: 1,
        scrub: 1,
      },
  header: isMobile
    ? {
        initialY: 1200,
        initialOpacity: 0,
        targetY: 0,
        targetOpacity: 1,
        scrub: 6,
      }
    : {
        initialOpacity: 0.1,
        targetOpacity: 1,
        scrub: 1,
      },
});

export const animateGalleryBackground = (
  config: AnimationConfig['background']
) => {
  gsap.to('.gallery__section', {
    backgroundSize: config.size,
    backgroundPosition: config.position,
    scrollTrigger: {
      trigger: '.gallery__section',
      start: 'top 90%',
      end: 'bottom top',
      scrub: config.scrub,
    },
  });
};

export const animateGalleryImages = (
  selectors: string[],
  config: AnimationConfig['images'],
  isMobile: boolean
) => {
  if (isMobile) {
    gsap.set(selectors, { scale: config.initialScale });
    gsap.to(selectors, {
      scale: config.targetScale,
      scrollTrigger: {
        trigger: '.gallery__section',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: config.scrub,
      },
    });
  } else {
    gsap.set(selectors, {
      opacity: config.initialOpacity,
      scale: config.initialScale,
    });

    selectors.forEach((selector) => {
      gsap.to(selector, {
        scale: config.targetScale,
        opacity: config.targetOpacity,
        duration: 1.5,
        scrollTrigger: {
          trigger: '.gallery__section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: config.scrub,
          toggleActions: 'play reverse play reverse',
        },
      });
    });
  }
};

export const animateGalleryHeader = (
  config: AnimationConfig['header'],
  isMobile: boolean
) => {
  if (isMobile) {
    gsap.set('.galleryHeader', {
      y: config.initialY,
      opacity: config.initialOpacity,
    });

    gsap.to('.galleryHeader', {
      y: config.targetY,
      opacity: config.targetOpacity,
      duration: 6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.gallery__section',
        start: 'top 80%',
        end: 'top 30%',
        scrub: config.scrub,
        toggleActions: 'play reverse play reverse',
      },
    });
  } else {
    gsap.set('.galleryHeader', { opacity: config.initialOpacity });
    gsap.to('.galleryHeader', {
      opacity: config.targetOpacity,
      duration: 8.5,
      scrollTrigger: {
        trigger: '.gallery__section',
        start: 'top 50%',
        end: 'bottom 70%',
        scrub: config.scrub,
        toggleActions: 'play reverse play reverse',
      },
    });
  }
};
