import { useRef } from "react";
import { RefObject } from "react";

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';


export const useMustachesShakeAnimation = (buttonRef: RefObject<HTMLButtonElement>) => {

  const leftMustacheRef = useRef<HTMLImageElement | null>(null);
  const rightMustacheRef = useRef<HTMLImageElement | null>(null);
  
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const leftMustache = leftMustacheRef.current;
    const rightMustache = rightMustacheRef.current;

    if (!button || !leftMustache || !rightMustache) {
      return;
    }

    const handleMouseEnter = () => {

      if (tlRef.current) {
        tlRef.current.kill();
      }

      if (!leftMustache || !rightMustache) {
        console.warn("Элементы усов не найдены!");
        return;
      }
      
      tlRef.current = gsap.timeline();
      
      tlRef.current.to({}, {
        duration: 0.05,
        repeat: 8,
        onUpdate: function() {
   
          const randomY = gsap.utils.random(-2, 2);
          
          gsap.set([leftMustache, rightMustache], {
            y: randomY
          });
        }
      });
    };

    const handleMouseLeave = () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
        
        gsap.to([leftMustache, rightMustache], {
          x: 0,
          y: 0,
          duration: 0.2,
          ease: "power1.out"
        });
      }
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [buttonRef.current, leftMustacheRef.current, rightMustacheRef.current]);

  return { 
    buttonRef, 
    leftMustacheRef, 
    rightMustacheRef 
  };
};