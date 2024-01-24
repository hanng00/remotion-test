interface CircleProps {
  size: number;
}

export const Circle: React.FC<
  CircleProps & React.HTMLProps<HTMLDivElement>
> = ({ size, children, ...rest }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size / 2}px`,
        background: "white",
        overflow: "hidden",
        position: "absolute",
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
};
