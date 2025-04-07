import React from "react";

const DownloadBtn = ({ handleDownload, className }) => {
  return (
    <button
      className={` ${className} font-semibold text-white text-md   xl:text-lg py-3 xl:py-3 bg-blue-600    h-12 xl:h-14 rounded-l-full   rounded-r-full align-middle flex justify-center m-auto mt-6  cursor-pointer hover:bg-blue-500 `}
      onClick={handleDownload}
    >
      Download
    </button>
  );
};

export default DownloadBtn;
