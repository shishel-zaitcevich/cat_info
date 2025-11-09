import React, { useEffect } from 'react';

import { openModal } from '../../../api/store/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import { setSubId, clearSubId } from '../../../api/store/authSlice';

import s from './AuthButton.module.scss';
import classNames from 'classnames';

interface AuthButtonProps {
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const subId = useAppSelector((state) => state.auth.subId);

  useEffect(() => {
    const storedSubId = localStorage.getItem('subId');
    if (storedSubId) {
      dispatch(setSubId(storedSubId));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('subId');
    dispatch(clearSubId());
  };

  const handleClick = () => {
    if (subId) {
      handleLogout();
    } else {
      dispatch(
        openModal({
          type: 'Register',
          props: {
            index: 0,
          },
        })
      );
    }
  };

  return (
    <div className={classNames(s.signUpBtn, className)} onClick={handleClick}>
      <button className={s.authBtn}>{subId ? 'LOG OUT' : 'SIGN UP'}</button>
    </div>
  );
};

export default AuthButton;
