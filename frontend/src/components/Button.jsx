import React from "react";
import BtnLabel from "./BtnLabel.jsx";

const Button = ({ children, text, className }) => {
  return (
    <div
      className={` ${className}   text-white text-md   xl:text-lg py-3 xl:py-3 bg-blue-600   h-12 xl:h-14 rounded-l-full   rounded-r-full align-middle flex justify-center m-auto mt-6  cursor-pointer hover:bg-blue-500 `}
    >
      <BtnLabel className="cursor-pointer font-light" htmlFor="file-upload-2">
        {text}
      </BtnLabel>
      {children}
    </div>
  );
};

export default Button;
