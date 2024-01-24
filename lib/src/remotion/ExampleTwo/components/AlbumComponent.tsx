import { Img } from "remotion";

export const COVER_SIZE = 400;

const Cover: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  const size = COVER_SIZE;
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.7)",
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
};

export const Album: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  return (
    <Cover>
      <Img
        src={imageSrc}
        style={{
          height: COVER_SIZE,
          width: COVER_SIZE,
        }}
      />
      ;
    </Cover>
  );
};
