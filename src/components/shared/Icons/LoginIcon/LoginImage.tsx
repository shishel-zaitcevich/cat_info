import { memo } from 'react';

interface LoginImageProps {
  subId?: string | null;
  iconSrc?: string;
  className?: string;
}

const LoginImage: React.FC<LoginImageProps> = ({
  subId,
  iconSrc,
  className,
}) => {
  return (
    <img
      key={iconSrc}
      src={iconSrc}
      alt={subId ? 'Logout icon' : 'Login icon'}
      style={{
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: 1,
        transform: 'scale(1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      className={className}
    />
  );
};
export default memo(LoginImage);
