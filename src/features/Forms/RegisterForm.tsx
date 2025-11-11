import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button, Typography } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopy';

import { useAppDispatch } from '../../hooks/useAppSelector';
import { setSubId } from '../../api/store/authSlice';
import { closeModal } from '../../api/store/modalSlice';

import AuthTextField from '../../components/shared/Inputs/AuthTextField';
import AuthSubmitButton from '../../components/shared/Buttons/AuthSubmitButton/AuthSubmitButton';
import FormContainer from '../../components/shared/Form/FormContainer';
import FormSubtitle from '../../components/shared/Form/FormSubtitle';
import FormTitle from './FormTitle';

import s from './RegisterForm.module.scss';

const schema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

type FormData = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [generatedSubId, setGeneratedSubId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log('Register:', data.email);

    // Генерируем уникальный subId
    const newSubId = `cat_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    dispatch(setSubId(newSubId));

    // Показываем сгенерированный ID
    setGeneratedSubId(newSubId);

    reset();
  };

  const handleCopySubId = async () => {
    if (generatedSubId) {
      try {
        await navigator.clipboard.writeText(generatedSubId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (generatedSubId) {
    return (
      <FormContainer className={s.registerFrom}>
        <FormTitle className={s.title}>
          🎉 Meow! Registration successful
        </FormTitle>

        <FormSubtitle className={s.subtitle}>
          Save this ID—you'll need it to log in:
        </FormSubtitle>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              flex: 1,
            }}
          >
            {generatedSubId}
          </Typography>
          <Button
            onClick={handleCopySubId}
            size="small"
            color={copied ? 'success' : 'primary'}
          >
            <ContentCopyOutlinedIcon />
          </Button>
        </Box>

        {copied && (
          <Typography
            variant="caption"
            color="success.main"
            sx={{ mb: 2, display: 'block' }}
          >
            ✓ ID copied to clipboard!
          </Typography>
        )}

        <AuthSubmitButton onClick={handleClose} className={s.submitBtn}>
          Start research
        </AuthSubmitButton>
      </FormContainer>
    );
  }

  return (
    <FormContainer className={s.registerFrom}>
      <FormTitle className={s.title}>Meow! Welcome!</FormTitle>

      <FormSubtitle className={s.subtitle}>
        Become part of the cat galaxy
      </FormSubtitle>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <AuthTextField
          label="Email"
          placeholder="you@meow.com"
          register={register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isSubmitting}
        />

        <AuthTextField
          label="Password"
          placeholder="Minimum 6 characters"
          register={register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isSubmitting}
          isPassword
        />

        <AuthSubmitButton isLoading={isSubmitting} className={s.submitBtn}>
          {isSubmitting ? 'Murr...' : 'Sign up'}
        </AuthSubmitButton>
      </form>
    </FormContainer>
  );
};

export default RegisterForm;
