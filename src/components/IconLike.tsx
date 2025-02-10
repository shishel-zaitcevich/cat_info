import '../assets/styles/shared/IconLike.scss'; // Подключаем стили

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';

const MustacheAnimation = forwardRef((props, ref) => {
  const mustacheRef = useRef<SVGSVGElement | null>(null);
  const heartRef = useRef<SVGPathElement | null>(null);

  const animateMustache = () => {
    if (mustacheRef.current && heartRef.current) {
      gsap.to(mustacheRef.current.querySelectorAll(".mustache"), {
        y: "10px",
        rotation: "10deg",
        stagger: 0.1,
        repeat: 2,
        yoyo: true,
        duration: 0.3,
        ease: "power1.inOut",
      });

      gsap.to(heartRef.current, {
        fill: "pink",
        duration: 0.3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 2,
      });
    }
  };

  // Позволяем вызывать `animateMustache` извне
  useImperativeHandle(ref, () => ({
    triggerAnimation: animateMustache,
  }));

  return (
    <div className="svg-container">
      <svg
        ref={mustacheRef}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 840 215"
      >
        {/* Усы */}
        <path
          className="mustache"
          d="M0 0 C3.92262711 2.67286457 6.5390799 4.15265579 11.45361328 3.30297852 C13.87496774 2.02527849 13.87496774 2.02527849 16.07861328 0.17797852 C29.37447464 -9.59606242 43.77374477 -14.06651738 60.25439453 -12.33764648 C71.06044385 -10.17379778 77.14219754 -3.89512545 83.12158203 4.92407227 C87.85905466 13.38483716 87.81751994 23.6646858 85.57861328 32.92016602 C83.10748178 39.82957976 79.74836322 46.13369659 74.45361328 51.30297852..."
          fill="black"
        />
        <path
          className="mustache"
          d="M0 0 C0.97184235 -0.00983917 1.94368469 -0.01967834 2.94497681 -0.02981567 C56.70814375 -0.45731048 109.14359736 4.92645031 161.86328125 15.23828125 C162.55609695 15.37377884 163.24891266 15.50927643 163.96272278 15.64888 C167.53401436 16.34920992 171.10185062 17.06484007 174.66748047 17.79345703 C176.29852734 18.12387369 177.93051696 18.44964372 179.56298828 18.77294922 C190.45108146 20.92973627 201.22555645 23.14379983 211.83447266 26.4309082..."
          fill="black"
        />

        {/* Сердце */}
        <path
          className="heart"
          d="M50 50 C70 30, 90 30, 100 50..."
          fill="red"
        />
      </svg>
    </div>
  );
};

export default MustacheAnimation;
