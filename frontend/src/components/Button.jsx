import React from "react";
import Label from "./Label.jsx";

const Button = ({ children, text, className }) => {
  return (
    <div
      className={` ${className}   text-white text-lg py-3 bg-blue-600  w-70 lg:w-[40%]   h-14 rounded-l-full   rounded-r-full align-middle flex justify-center m-auto mt-6  cursor-pointer hover:bg-blue-500 `}
    >
      <Label className="cursor-pointer font-light" htmlFor="file-upload-2">
        {text}
      </Label>
      {children}
    </div>
  );
};

export default Button;
