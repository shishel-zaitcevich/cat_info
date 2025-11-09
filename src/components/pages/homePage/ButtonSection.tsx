import '../../../assets/styles/homePage/ButtonSection.scss';

import { useRef } from 'react';
import { Button } from '@mui/material';
import {
  animateImagesEnter,
  animateImagesLeave,
} from '../../../utils/homeButtonAnimation';
import { Link } from 'react-router-dom';

export function ButtonSection() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      // console.log(buttonRect);
      animateImagesEnter(buttonRect, imagesRef);
    }
  };

  const handleMouseLeave = () => {
    animateImagesLeave(imagesRef);
  };

  const isTablet = window.innerWidth <= 768;
  const isMobile = window.innerWidth <= 520;

  return (
    <>
      <div
        className="gallery-button-container "
        data-scroll
        data-scroll-section
      >
        <Link to={'/gallery'} data-scroll>
          <Button
            ref={buttonRef}
            variant="contained"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              maxWidth: '300px',
              width: isMobile ? '220px' : '100%',
              maxHeight: '70px',
              height: isMobile ? '50px' : '100%',
              fontSize: isMobile ? '2rem' : '1.5rem',
              backgroundColor: '#aab1b7',
              marginLeft: isMobile ? '0' : isTablet ? '150%' : '90%',
              marginTop: isMobile ? '520px' : isTablet ? '650px' : '0',
              borderRadius: '10px',
              fontWeight: '600',
            }}
            className="home-button"
          >
            Go to Gallery
          </Button>
        </Link>

        {[0, 1, 2, 3].map((_, index) => (
          <div
            key={index}
            ref={(el) => (imagesRef.current[index] = el!)}
            className="gallery-image"
          >
            <img src="/paw.png" alt="Gallery" data-scroll />
          </div>
        ))}
      </div>
    </>
  );
}
