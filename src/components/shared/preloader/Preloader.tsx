import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Preloader.scss';

const Cat: React.FC = () => {
  const catRef = useRef<HTMLDivElement>(null);
  const leftEyePupilRef = useRef<HTMLDivElement>(null);
  const rightEyePupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (
        catRef.current &&
        leftEyePupilRef.current &&
        rightEyePupilRef.current
      ) {
        const { left, top, width, height } =
          catRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const angleDeg =
          Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);

        gsap.to([leftEyePupilRef.current, rightEyePupilRef.current], {
          duration: 0.1,
          rotation: angleDeg,
          x: Math.cos(angleDeg * (Math.PI / 180)) * 10,
          y: Math.sin(angleDeg * (Math.PI / 180)) * 10,
          ease: 'power2.out',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="cat" ref={catRef}>
      <div className="ear ear--left"></div>
      <div className="ear ear--right"></div>
      <div className="face">
        <div className="eye eye--left">
          <div className="eye-pupil" ref={leftEyePupilRef}></div>
        </div>
        <div className="eye eye--right">
          <div className="eye-pupil" ref={rightEyePupilRef}></div>
        </div>
        <div className="muzzle"></div>
      </div>
    </div>
  );
};

export default Cat;
