
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

export const usePendulumAnimation = (
    pendulumRef: React.RefObject<HTMLImageElement>,
    triggerSelector: string
  ) => {

    useGSAP(() => {
      const pendulum = pendulumRef.current;
      if (!pendulum) return;
  
      gsap.set(pendulum, { transformOrigin: "top center", rotation: 0 });
  
      const tl = gsap.timeline({
        repeat: 1,
        yoyo: true,
        paused: true,
      });
  
      tl.to(pendulum, {
        rotation: -25,
        duration: 1,
        ease: "power1.inOut",
      }).to(pendulum, {
        rotation: 25,
        duration: 1,
        ease: "power1.inOut",
      });
  
      const startAnimation = () => {
        if (!tl.isActive()) {
          gsap.set(pendulum, { rotation: 0 });
          tl.restart();
        }
      };
  
      const stopAnimation = () => {
        gsap.to(pendulum, {
          rotation: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            tl.pause();
          },
        });
      };
  
      const triggerElement = document.querySelector(triggerSelector);
  
      triggerElement?.addEventListener("mouseenter", startAnimation);
      triggerElement?.addEventListener("mouseleave", stopAnimation);
  
      return () => {
        triggerElement?.removeEventListener("mouseenter", startAnimation);
        triggerElement?.removeEventListener("mouseleave", stopAnimation);
        tl.kill();
      };
    }, [pendulumRef, triggerSelector]);
  };