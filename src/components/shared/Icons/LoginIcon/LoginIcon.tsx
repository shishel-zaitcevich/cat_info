import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginImage from './LoginImage';

import s from './LoginIcon.module.scss';

interface LoginIconProps {
  subId?: string | null;
}

const LoginIcon: React.FC<LoginIconProps> = ({ subId }) => {
  const location = useLocation();
  const isGalleryPage = location.pathname === '/gallery';

  const iconSrc = subId
    ? isGalleryPage
      ? '/logOut.png'
      : '/logoutHome.png'
    : isGalleryPage
      ? '/logIn.png'
      : '/loginHome.png';

  const imgClassName = isGalleryPage ? s.galleryimg : s.homeimg;

  return (
    <LoginImage iconSrc={iconSrc} subId={subId} className={imgClassName} />
  );
};

export default LoginIcon;
