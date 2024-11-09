import gsap from 'gsap';

export const animateImagesEnter = (
    buttonRect: DOMRect,
    imagesRef: React.MutableRefObject<HTMLDivElement[]>
  ) => {
    // массив для хранения занятых координат 
    
    const occupiedPositions: { x: number; y: number }[] = [];
  
    imagesRef.current.forEach((img, index) => {
     //случайные смещения
      let randomXOffset = 0;
      let randomYOffset = 0;
      let positionFound = false;
  
      // ищем свободную позицию для текущей лапы
      while (!positionFound) {
        randomXOffset = (Math.random() - 0.5) * 50; // случайное смещение по X
        randomYOffset = (Math.random() - 0.5) * 50; // случайное смещение по Y
  
        // рассчет новой позиции
        const newX = buttonRect.left + 300 + index * 50 + randomXOffset;
        const newY = buttonRect.top - index * 20 + randomYOffset;
  
        //проверка, не занята ли эта позиция (с определенным диапазоном близости)
        const isOccupied = occupiedPositions.some(
          (pos) => Math.abs(pos.x - newX) < 50 && Math.abs(pos.y - newY) < 50
        );
  
        // если позиция не занята, то принимаем ее
        if (!isOccupied) {
          occupiedPositions.push({ x: newX, y: newY });
          positionFound = true;
        }
      }
  
   
      gsap.fromTo(
        img,
        {
          opacity: 0,
          x: randomXOffset + buttonRect.left + 300 + index * 50,
          y: randomYOffset + buttonRect.top - index * 20,
        },
        {
          opacity: 1,
          duration: 0.5,
        //   trigger: '.gallery-button-container',
          delay: index * 0.2,
          ease: 'power1.out',
        }
      );
    });
  };
  
  export const animateImagesLeave = (imagesRef: React.MutableRefObject<HTMLDivElement[]>) => {
    gsap.killTweensOf(imagesRef.current);

    imagesRef.current.forEach((img) => {
      gsap.to(img, {
        opacity: 0,
        duration: 0.3,
      });
    });
  };
