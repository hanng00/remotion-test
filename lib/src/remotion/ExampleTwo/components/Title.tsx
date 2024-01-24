export const Title: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <div
      style={{
        fontFamily: "--apple-system, BlinkMacSystemFont, sans-serif",
        color: "white",
        fontSize: "50px",
        fontWeight: "medium",
        width: "100%",
        position: "absolute",
        textAlign: "center",
        textShadow: "0 0 6px rgba(0, 0, 0, 0.7)",
        paddingLeft: "50px",
        paddingRight: "50px",
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
};
