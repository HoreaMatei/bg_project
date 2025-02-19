import React from "react";

const ImageHeader = () => {
  return (
    <div>
      <video
        className="  h-auto m-auto rounded-4xl max-w[500px]  md:max-w-[550px]  xl:max-w-[620px]"
        autoPlay
        muted
        style={{ height: "auto", width: "auto" }}
      >
        <source src="/video.mp4" type="video/ogg" />
      </video>
      <p className=" m-auto text-stone-500 w-[50vw] lg:w-[24vw] text-2xl md:text-3xl   lg:text-[5vh] font-bold text-left ">
        Remove Image Background
      </p>
    </div>
  );
};

export default ImageHeader;
