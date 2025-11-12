import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import s from './NavBar.module.scss';
import classNames from 'classnames';
import AuthButton from '../../components/shared/Buttons/AuthButton/AuthButton';
import BurgerMenu from './BurgerMenu';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/images', label: 'Images' },
    { path: '/play', label: 'Play' },
    { path: '/catbot', label: 'CatBot' },
  ];

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img className={s.logo} src="/catslogo.png" alt="logo" />

        <nav className={s.navLinks}>
          {links.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                classNames(s.link, { [s.active]: isActive })
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={s.actions}>
          <AuthButton />
          <button
            className={classNames(s.burgerBtn, { [s.open]: isOpen })}
            onClick={handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <BurgerMenu
        isOpen={isOpen}
        onClose={handleClose}
        links={links}
        currentPath={location.pathname}
      />
    </header>
  );
};

export default NavBar;
