import React from 'react';
import { Typography } from '@mui/material';
import classNames from 'classnames';

interface FormSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const FormSubtitle: React.FC<FormSubtitleProps> = ({ children, className }) => {
  return (
    <Typography
      variant="body2"
      className={classNames(className)}
      sx={{
        mb: 3,
        color: 'text.secondary',
      }}
    >
      {children}
    </Typography>
  );
};

export default FormSubtitle;
