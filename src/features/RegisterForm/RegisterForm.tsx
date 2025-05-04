import React from 'react';
import { setSubId } from '../../api/store/authSlice';
import { closeModal } from '../../api/store/modalSlice';
import { useAppDispatch } from '../../hooks/useAppSelector';

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubId = `user-${Math.floor(Math.random() * 100000)}`;
    localStorage.setItem('subId', newSubId);
    dispatch(setSubId(newSubId));
    dispatch(closeModal());
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;
