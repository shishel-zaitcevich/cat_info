import React from 'react';

import classNames from 'classnames';

import { openModal } from '../../../../api/store/modalSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/useAppSelector';
import { clearSubId } from '../../../../api/store/authSlice';
import LoginIcon from '../../Icons/LoginIcon/LoginIcon';

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
      dispatch(clearSubId());
    } else {
      dispatch(openModal({ type: 'Login' }));
    }
  };

  return (
    <div className={classNames(s.signUpBtn, className)} onClick={handleClick}>
      <button className={classNames(s.authBtn, textClassName)}>
        <LoginIcon subId={subId} />
      </button>
    </div>
  );
};

export default AuthButton;
