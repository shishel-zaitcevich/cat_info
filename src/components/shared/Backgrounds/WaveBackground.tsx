import { ReactNode } from 'react';
import './Backgrounds.scss';

const WaveBackground = ({ children }: { children: ReactNode }) => {
  return (
    <div className="wave-bg">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="bg-content">{children}</div>
    </div>
  );
};

export default WaveBackground;
