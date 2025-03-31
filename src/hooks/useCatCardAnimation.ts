import { useGSAP } from '@gsap/react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useSelector } from 'react-redux';
import { RootState } from '../api/store/store';
import { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface CatCardRefs {
  cardRef: React.RefObject<HTMLDivElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  headingRef: React.RefObject<HTMLHeadingElement>;
  descriptionRef: React.RefObject<HTMLParagraphElement>;
  buttonFavRef: React.RefObject<HTMLButtonElement>;
}

const useCatCardAnimation = ({ cardRef, imageRef, headingRef, descriptionRef, buttonFavRef }: CatCardRefs, index: number) => {
    const activeIndex = useSelector((state: RootState) => state.scroll.activeIndex);
    const direction = useSelector((state: RootState) => state.scroll.direction);
      const [isImageLoaded, setIsImageLoaded] = useState(false);

    useGSAP(() => {
        gsap.set([imageRef.current, headingRef.current, descriptionRef.current, buttonFavRef.current], {
          autoAlpha: 0,
          yPercent: 50
        });
      }, []);

    useEffect(() => {
      const img = imageRef.current;
      if (!img) return;

      if (img.complete) {
        setIsImageLoaded(true);
        return;
      }

      // Устанавливаем обработчик загрузки
      const handleLoad = () => setIsImageLoaded(true);
      img.addEventListener("load", handleLoad);

      // Очищаем обработчик при размонтировании
      return () => img.removeEventListener("load", handleLoad);
    }, [imageRef]);
  
    useGSAP(() => {
      if (!cardRef.current || index !== activeIndex ) return;
  
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
  
    //   gsap.set([imageRef.current, headingRef.current, descriptionRef.current, buttonFavRef.current], {
    //     autoAlpha: 0,
    //     yPercent: fromTop ? -50 : 50
    //   });
  
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power1.out" },
        delay: 0.3
      });
  
      tl.to(imageRef.current, { yPercent: -15 * dFactor })
        .fromTo(imageRef.current, { autoAlpha: 0, yPercent: fromTop ? -50 : 50 }, { autoAlpha: 1, yPercent: 0 })
        .fromTo(headingRef.current, { autoAlpha: 0, yPercent: fromTop ? -50 : 50 }, { autoAlpha: 1, yPercent: 0 })
        .fromTo(descriptionRef.current, { autoAlpha: 0, yPercent: fromTop ? -50 : 50 }, { autoAlpha: 1, yPercent: 0 })
        .fromTo(buttonFavRef.current, { autoAlpha: 0, yPercent: fromTop ? -50 : 50 }, { autoAlpha: 1, yPercent: 0 });
  
      return () => tl.kill();
    }, [cardRef, imageRef, headingRef, descriptionRef, buttonFavRef, activeIndex, direction]);
  };
  export default useCatCardAnimation;
  
  