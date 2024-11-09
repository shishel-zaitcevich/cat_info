import '../../../assets/styles/ButtonSection.scss';

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
      console.log(buttonRect);
      animateImagesEnter(buttonRect, imagesRef);
    }
  };

  const handleMouseLeave = () => {
    animateImagesLeave(imagesRef);
  };

  return (
    <div className="gallery-button-container " data-scroll data-scroll-section>
      <Link to={'/gallery'}>
        <Button
          ref={buttonRef}
          variant="contained"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            maxWidth: '300px',
            width: '100%',
            maxHeight: '70px',
            height: '100%',
            fontSize: '1.5rem',
            backgroundColor: '#aab1b7',
            marginLeft: '90%',
            borderRadius: '10px',
            fontWeight: '600',
          }}
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
          <img src="/paw.png" alt="Gallery" />
        </div>
      ))}
    </div>
  );
}
