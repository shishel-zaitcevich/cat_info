import React from 'react';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import AuthButton from '../../components/shared/Buttons/AuthButton/AuthButton';

import s from './NavBar.module.scss';
import WaveBackground from '../../components/shared/Backgrounds/WaveBackground';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { path: string; label: string }[];
  currentPath: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isOpen,
  onClose,
  links,
  currentPath,
}) => {
  return (
    <div className={classNames(s.burgerMenu, { [s.open]: isOpen })}>
      <WaveBackground
        children={
          <>
            <div className={s.burgerActions}></div>
            <nav className={s.burgerNav}>
              <AuthButton className={s.authBtn} />
              {links.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    classNames(s.burgerLink, {
                      [s.active]: isActive || currentPath === path,
                    })
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </>
        }
      />
    </div>
  );
};

export default BurgerMenu;
