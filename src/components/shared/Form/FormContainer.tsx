import React from 'react';
import { Box } from '@mui/material';
import classNames from 'classnames';

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: number;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  className,
  maxWidth = 400,
}) => {
  return (
    <Box
      className={classNames(className)}
      sx={{
        maxWidth,
        mx: 'auto',
        p: 3,
      }}
    >
      {children}
    </Box>
  );
};

export default FormContainer;
