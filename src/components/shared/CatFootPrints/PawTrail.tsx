import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

interface PawTrailProps {
  path: string; // SVG path string
  imageSrc: string; // путь к изображению следа
  steps: number; // количество шагов
  duration: number; // длительность анимации
}

const PawTrail: React.FC<PawTrailProps> = ({
  path,
  imageSrc,
  steps,
  duration,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Очищаем контейнер перед анимацией
    container.innerHTML = '';

    const tl = gsap.timeline();

    for (let i = 0; i < steps; i++) {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.style.position = 'absolute';
      img.style.width = '24px';
      img.style.height = '24px';
      img.style.opacity = '0';
      container.appendChild(img);

      tl.to(
        img,
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            start: i / steps,
            end: (i + 1) / steps,
          },
          opacity: 1,
          duration: duration / steps,
          ease: 'power1.inOut',
          onComplete: () => {
            // Затухание предыдущих следов
            gsap.to(img, {
              opacity: 0.3,
              duration: duration / steps,
              delay: duration / steps,
            });
          },
        },
        i * (duration / steps)
      );
    }
  }, [path, imageSrc, steps, duration]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0 }} />
  );
};

export default PawTrail;
