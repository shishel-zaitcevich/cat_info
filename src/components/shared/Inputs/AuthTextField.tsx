// src/components/inputs/AuthTextField.tsx
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AuthTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  register: UseFormRegisterReturn;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  isPassword?: boolean;
}

const AuthTextField: React.FC<AuthTextFieldProps> = ({
  register,
  error,
  helperText,
  disabled,
  isPassword = false,
  ...props
}) => {
  return (
    <TextField
      {...register}
      fullWidth
      variant="outlined"
      error={error}
      helperText={helperText}
      disabled={disabled}
      type={isPassword ? 'password' : 'text'}
      sx={{
        '& .MuiOutlinedInput-root': {
          bgcolor: 'rgba(255, 255, 255, 0.08)',
          color: 'white',
          borderRadius: 2,
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
            borderWidth: 2,
          },
        },

        // Текст ввода
        '& .MuiInputBase-input': {
          color: 'white',

          // Плейсхолдер: светло-серый (неактивно)
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
            opacity: 1,
            transition: 'color 0.2s ease',
          },

          // Плейсхолдер: белый (в фокусе)
          '&.Mui-focused::placeholder': {
            color: 'rgba(255, 255, 255, 0.9)',
          },
        },

        // Ярлык (label)
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.6)',
          '&.Mui-focused': {
            color: 'white',
          },
        },
      }}
      {...props}
    />
  );
};

export default AuthTextField;
