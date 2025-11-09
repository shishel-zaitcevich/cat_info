// import React from 'react';
// import { setSubId } from '../../api/store/authSlice';
// import { closeModal } from '../../api/store/modalSlice';
// import { useAppDispatch } from '../../hooks/useAppSelector';

// const RegisterForm: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newSubId = `user-${Math.floor(Math.random() * 100000)}`;
//     localStorage.setItem('subId', newSubId);
//     dispatch(setSubId(newSubId));
//     dispatch(closeModal());
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Регистрация</h2>
//       <button type="submit">Зарегистрироваться</button>
//     </form>
//   );
// };

// export default RegisterForm;

// src/modals/RegisterForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppSelector';
import { setSubId } from '../../api/store/authSlice';
import { closeModal } from '../../api/store/modalSlice';
import s from './RegisterForm.module.scss';
import AuthTextField from '../../components/shared/Inputs/AuthTextField';

// Валидация
const schema = z.object({
  email: z.string().email('Wrong email format'),
  password: z.string().min(6, 'Min 6 symbols'),
});

type FormData = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Register:', data.email);

    const newSubId = `cat_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    // localStorage.setItem('subId', newSubId);
    dispatch(setSubId(newSubId));

    setSuccess(true);
    reset();

    setTimeout(() => {
      dispatch(closeModal());
    }, 1500);
  };

  return (
    <Box className={s.registerFrom}>
      <Typography variant="h5" className={s.title}>
        Meow! Welcome
      </Typography>

      <Typography variant="body2" className={s.subtitle}>
        Become a part of the cat galaxy
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <AuthTextField
          label="Email"
          placeholder="you@meow.com"
          register={register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isSubmitting || success}
        />

        <AuthTextField
          label="Password"
          placeholder="Min 6 symbols"
          register={register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isSubmitting || success}
          isPassword
          multiline
          maxRows={3}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting || success}
          className={s.submitBtn}
        >
          {success ? 'Done!' : isSubmitting ? 'Purr...' : 'Register'}
        </Button>

        {/* {success && (
          <Alert severity="success" className={s.alert}>
            Готово! Ты в стае
          </Alert>
        )} */}
      </form>

      <Box className={s.pawPrints}>
        <span></span>
        <span></span>
        <span></span>
      </Box>
    </Box>
  );
};

export default RegisterForm;
