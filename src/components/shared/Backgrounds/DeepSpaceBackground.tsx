import './Backgrounds.scss';

const DeepSpaceBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="deep-space-bg">
      <div className="wave-left"></div>
      <div className="glow-arc"></div>
      <div className="wave-bottom"></div>
      <div className="bg-content">{children}</div>
    </div>
  );
};

export default DeepSpaceBackground;
