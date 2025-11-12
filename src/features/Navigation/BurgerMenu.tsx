import React from 'react';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import AuthButton from '../../components/shared/Buttons/AuthButton/AuthButton';

import s from './NavBar.module.scss';

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
      <nav className={s.burgerNav}>
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

      <div className={s.burgerActions}>
        <AuthButton className={s.authBtn} />
      </div>
    </div>
  );
};

export default BurgerMenu;
