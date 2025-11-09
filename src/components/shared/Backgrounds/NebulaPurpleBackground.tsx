import './Backgrounds.scss';

const NebulaPurpleBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="nebula-purple-bg">
      <div className="nebula-left"></div>
      <div className="nebula-center"></div>
      <div className="nebula-right"></div>
      <div className="bg-content">{children}</div>
    </div>
  );
};

export default NebulaPurpleBackground;
