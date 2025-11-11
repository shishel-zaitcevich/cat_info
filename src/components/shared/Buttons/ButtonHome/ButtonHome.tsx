import { MutableRefObject } from 'react';
import { Link } from 'react-router-dom';

import { useWindowSize } from 'usehooks-ts';
import classNames from 'classnames';

import { usePendulumAnimation } from '../../../../hooks/usePendulumanimation';

import s from './ButtonHome.module.scss';

interface ButtonHomeProps {
  redRoundRef: MutableRefObject<HTMLImageElement | null>;
}

const ButtonHome: React.FC<ButtonHomeProps> = ({ redRoundRef }) => {
  const { width } = useWindowSize();

  const MOBILE_BREAKPOINT = 768;
  const isMobile = width < MOBILE_BREAKPOINT;

  usePendulumAnimation(redRoundRef, '.button-home');

  return (
    <Link to={'/'} className={classNames(s.button__home, 'button-home')}>
      {isMobile ? (
        <img src="/pets-home.webp" alt="home" className={s.home} />
      ) : (
        <img src="/home.png" alt="home" className={s.home} />
      )}
      {isMobile ? null : (
        <img
          src="/redRound.png"
          alt="home"
          className={s.red__round}
          ref={redRoundRef}
        />
      )}
      <p className={s.home__link}>Go home</p>
    </Link>
  );
};

export default ButtonHome;
