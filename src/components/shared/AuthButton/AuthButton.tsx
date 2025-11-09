import React, { useEffect } from 'react';

import { openModal } from '../../../api/store/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import { setSubId, clearSubId } from '../../../api/store/authSlice';

import s from './AuthButton.module.scss';
import classNames from 'classnames';

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
      <button className={classNames(s.authBtn, textClassName)}>
        {subId ? 'LOG OUT' : 'LOG IN'}
      </button>
    </div>
  );
};

export default AuthButton;
