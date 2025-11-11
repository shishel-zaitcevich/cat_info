import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useAppDispatch } from '../../hooks/useAppSelector';
import { setSubId } from '../../api/store/authSlice';
import { closeModal, openModal } from '../../api/store/modalSlice';

import AuthTextField from '../../components/shared/Inputs/AuthTextField';
import AuthSubmitButton from '../../components/shared/Buttons/AuthSubmitButton/AuthSubmitButton';
import FormContainer from '../../components/shared/Form/FormContainer';
import FormSubtitle from '../../components/shared/Form/FormSubtitle';
import FormLink from './FormLink';
import FormTitle from './FormTitle';

import s from './RegisterForm.module.scss';

const schema = z.object({
  subId: z
    .string()
    .min(1, 'Введите Cat ID')
    .regex(/^cat_\d+_\d+$/, 'Неверный формат Cat ID'),
});

type FormData = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    dispatch(setSubId(data.subId));
    dispatch(closeModal());
  };

  const handleRegisterClick = () => {
    dispatch(openModal({ type: 'Register' }));
  };

  return (
    <FormContainer className={s.registerFrom}>
      <FormTitle className={s.title}> Meow! Login</FormTitle>

      <FormSubtitle className={s.subtitle}>
        Enter your Cat ID to log in
      </FormSubtitle>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <AuthTextField
          label="Cat ID"
          placeholder="cat_1739123456789_1234"
          register={register('subId')}
          error={!!errors.subId}
          helperText={errors.subId?.message}
          disabled={isSubmitting}
        />

        <AuthSubmitButton isLoading={isSubmitting} className={s.submitBtn}>
          {isSubmitting ? 'In progress...' : 'Login'}
        </AuthSubmitButton>
      </form>

      <FormLink
        text="Don't have an account?"
        linkText="Sign Up"
        onClick={handleRegisterClick}
      />
    </FormContainer>
  );
};

export default LoginForm;
