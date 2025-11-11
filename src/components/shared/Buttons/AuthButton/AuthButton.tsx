import React from 'react';

import classNames from 'classnames';

import { openModal } from '../../../../api/store/modalSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/useAppSelector';
import { clearSubId } from '../../../../api/store/authSlice';

import s from './AuthButton.module.scss';

interface AuthButtonProps {
  className?: string;
  textClassName?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  className,
  textClassName,
}) => {
  const dispatch = useAppDispatch();
  const subId = useAppSelector((state) => state.auth.subId);

  const handleClick = () => {
    if (subId) {
      // Выход - clearSubId автоматически очистит localStorage
      dispatch(clearSubId());
    } else {
      // Вход
      dispatch(openModal({ type: 'Login' }));
    }
  };

  return (
    <div className={classNames(s.signUpBtn, className)} onClick={handleClick}>
      <button className={classNames(s.authBtn, textClassName)}>
        {subId ? 'LOG OUT' : 'LOG IN'}
      </button>
    </div>
  );
};

export default AuthButton;
