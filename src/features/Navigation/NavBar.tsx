import React, { useMemo, useState, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';
import classNames from 'classnames';
import AuthButton from '../../components/shared/Buttons/AuthButton/AuthButton';
import BurgerMenu from './BurgerMenu';

import s from './NavBar.module.scss';

const TABLET_BREAKPOINT = 900;

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { width } = useWindowSize();

  const isTablet = useMemo(() => width < TABLET_BREAKPOINT, [width]);

  const links = useMemo(
    () => [
      { path: '/', label: 'Home' },
      { path: '/gallery', label: 'Gallery' },
      { path: '/favourites', label: 'Favourutes' },
      { path: '/funfacts', label: 'Fun facts' },
      { path: '/images', label: 'Images' },
      { path: '/play', label: 'Play' },

      ...(isTablet ? [{ path: '/catbot', label: 'CatBot' }] : []),
    ],
    [isTablet]
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavLink to={'/'}>
          <img className={s.logo} src="/catslogo.png" alt="logo" />
        </NavLink>

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

        <AuthButton className={s.homeAuth} />

        <div className={s.actions}>
          <button
            className={classNames(s.burgerBtn, { [s.open]: isOpen })}
            onClick={handleToggle}
            aria-label="Toggle menu"
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
