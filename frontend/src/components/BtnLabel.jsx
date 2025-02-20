const BtnLabel = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-semibold text-left    ${className} `}
    >
      {children}
    </label>
  );
};

export default BtnLabel;
