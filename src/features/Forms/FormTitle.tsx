import React from 'react';
import { Typography } from '@mui/material';
import classNames from 'classnames';

interface FormTitleProps {
  children: React.ReactNode;
  className?: string;
}

const FormTitle: React.FC<FormTitleProps> = ({ children, className }) => {
  return (
    <Typography
      variant="h5"
      className={classNames(className)}
      sx={{
        mb: 1,
        fontWeight: 600,
      }}
    >
      {children}
    </Typography>
  );
};

export default FormTitle;
