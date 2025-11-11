import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import classNames from 'classnames';

interface AuthSubmitButtonProps extends Omit<ButtonProps, 'type' | 'variant'> {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  children,
  className,
  isLoading = false,
  fullWidth = true,
  disabled,
  ...buttonProps
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      className={classNames(className)}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default AuthSubmitButton;
