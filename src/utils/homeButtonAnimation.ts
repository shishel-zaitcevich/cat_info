import gsap from 'gsap';

type Direction = 'left-right' | 'right-diagonal-up' | 'left-diagonal-down';

export const animateImagesEnter = (
  buttonRect: DOMRect,
  imagesRef: React.MutableRefObject<HTMLDivElement[]>,
  direction: Direction = 'left-right'
) => {
  const occupiedPositions: { x: number; y: number }[] = [];

  const validImages = imagesRef.current.filter((img) => img);

  validImages.forEach((img, index) => {
    let randomXOffset = 0;
    let randomYOffset = 0;
    let positionFound = false;

    let baseX = 0;
    let baseY = 0;
    let margin = 0;

    // направление движения
    switch (direction) {
      case 'right-diagonal-up':
        baseX = 50 * index;
        baseY = -30 * index;
        margin = 100;
        break;
      case 'left-diagonal-down':
        baseX = 10 * index;
        baseY = 80 * index;
        margin = 100;
        break;
      case 'left-right':
      default:
        baseX = 50 * index;
        baseY = -20 * index;
        margin = 300;
        break;
    }

    while (!positionFound) {
      randomXOffset = (Math.random() - 0.5) * 50;
      randomYOffset = (Math.random() - 0.5) * 50;

      const newX = buttonRect.left + margin + baseX + randomXOffset;
      const newY = buttonRect.top + baseY + randomYOffset;

      const isOccupied = occupiedPositions.some(
        (pos) => Math.abs(pos.x - newX) < 50 && Math.abs(pos.y - newY) < 50
      );

      if (!isOccupied) {
        occupiedPositions.push({ x: newX, y: newY });
        positionFound = true;
      }
    }

    gsap.fromTo(
      img,
      {
        opacity: 0,
        x: buttonRect.left + margin + baseX + randomXOffset,
        y: buttonRect.top + baseY + randomYOffset,
      },
      {
        opacity: 1,
        duration: 0.5,
        delay: index * 0.2,
        ease: 'power1.out',
      }
    );
  });
};

export const animateImagesLeave = (
  imagesRef: React.MutableRefObject<HTMLDivElement[]>
) => {
  gsap.killTweensOf(imagesRef.current);

  imagesRef.current.forEach((img) => {
    gsap.to(img, {
      opacity: 0,
      duration: 0.3,
    });
  });
};
