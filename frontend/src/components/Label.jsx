const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-semibold text-left    ${className} `}
    >
      {children}
    </label>
  );
};

export default Label;
