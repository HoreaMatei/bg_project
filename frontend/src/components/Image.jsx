import React from "react";

const Image = ({ src }) => {
  return (
    <img
      className=" w-[90vw] xl:w-[32vw] rounded-4xl max-h-[70vh]  "
      src={src}
      alt="Uploaded Preview"
      width="200px"
    />
  );
};

export default Image;
