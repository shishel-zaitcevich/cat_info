import React from 'react';
import { Typography, Link } from '@mui/material';

interface FormLinkProps {
  text: string;
  linkText: string;
  onClick: () => void;
}

const FormLink: React.FC<FormLinkProps> = ({ text, linkText, onClick }) => {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        mt: 3,
        color: '#aaa',
      }}
    >
      {text}{' '}
      <Link
        component="button"
        onClick={onClick}
        sx={{
          color: '#9977f1ff',
          textDecoration: 'underline',
          cursor: 'pointer',
          display: 'inline',
          verticalAlign: 'baseline',
          font: 'inherit',
          p: 0,
        }}
      >
        {linkText}
      </Link>
    </Typography>
  );
};

export default FormLink;
