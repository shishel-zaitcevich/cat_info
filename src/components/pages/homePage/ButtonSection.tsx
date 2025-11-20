import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import {
  animateImagesEnter,
  animateImagesLeave,
} from '../../../utils/homeButtonAnimation';

import '../../../assets/styles/homePage/ButtonSection.scss';

export function ButtonSection() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
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
              maxWidth: '420px',
              width: isMobile ? '220px' : isTablet ? '280px' : '100%',
              maxHeight: isTablet ? '60px' : '90px',
              height: isMobile ? '50px' : '100%',
              fontSize: isMobile ? '2rem' : '1.5rem',
              // backgroundColor: '#aab1b7',
              background: 'linear-gradient(45deg, #2629d4ff, #964ee9)',
              // background: 'linear-gradient(45deg, #f3f2f2, #964ee9)',
              marginLeft: isMobile
                ? '0'
                : isTablet
                  ? '70%'
                  : isMobile
                    ? '85%'
                    : '90%',
              marginTop: isMobile ? '320px' : isTablet ? '450px' : '0',
              padding: isTablet ? '8px 16px' : '16px 40px',
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
