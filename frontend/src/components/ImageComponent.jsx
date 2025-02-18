import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Label from "./Label.jsx";

import Button from "./Button.jsx";
import ImageHeader from "./ImageHeader.jsx";

async function sendImageRequest(imageUrl) {
  const response = await fetch(`http://localhost:3000/api/image`, {
    method: "POST",
    body: JSON.stringify({ image: imageUrl }), // 🔹 Sends the URL as JSON
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to process image");
  }

  const { processedImageUrl } = await response.json();
  return processedImageUrl; // ✅ Backend should return the processed image URL
}

const ImageComponent = () => {
  const [preview, setPreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  async function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const data = new FormData();
    data.append("file", selectedFile);

    setPreview(URL.createObjectURL(selectedFile));
    data.append("upload_preset", "cloudinary_ai_images");
    data.append("cloud_name", "dw7ukar2t");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dw7ukar2t/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImage = await res.json();
    console.log(uploadedImage.url);

    const uploadedImageUrl = uploadedImage.url;

    try {
      console.log("Uploading image...");

      const resultImage = await sendImageRequest(uploadedImageUrl);
      const buffer = resultImage;
      const base64String = Buffer.from(buffer.data).toString("base64");

      // Step 2: Create a data URL
      const dataUrl = `data:image/png;base64,${base64String}`; // Assuming PNG format
      setProcessedImage(dataUrl);
      console.log(dataUrl);
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  }

  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 300); // Adjust speed if needed

    return () => clearInterval(interval);
  }, []);

  return (
    // <div className="mt-20 text-center flex flex-col justify-center">
    //   <div className="flex  flex-row p-5 w-[75vw] md:w-[80vw] h-fit m-auto justify-between align-middle text-center">
    //     <div className="lg:w-[34vw]  md:w-[54vw] h-fit text-center">
    //       {preview ? (
    //         <div className="lg:w-[34vw]  md:w-[54vw]">
    //           <div className=" bg-white  shadow-2xl w-[34vw] h-fit rounded-4xl text-center flex flex-col ">
    //             <div className="rounded-4xl">
    //               <img
    //                 className="w-auto rounded-4xl "
    //                 src={preview}
    //                 alt="Uploaded Preview"
    //                 width="200px"
    //               />
    //             </div>
    //             :
    //           </div>
    //           <Button text="Change Image">
    //             <input
    //               id="file-upload-2"
    //               type="file"
    //               className="hidden"
    //               onChange={handleChange}
    //             />
    //           </Button>
    //         </div>
    //       ) : (
    //         <div className="bg-white  shadow-2xl w-[34vw] h-[50vh] rounded-4xl text-center flex flex-col">
    //           <Button text="Upload Image">
    //             <input
    //               id="file-upload-2"
    //               type="file"
    //               className="hidden"
    //               onChange={handleChange}
    //             />
    //           </Button>
    //         </div>
    //       )}
    //     </div>
    //     {processedImage ? (
    //       <div className="lg:relative absolute z-1 lg:w-[34vw]  md:w-[54vw] m-auto">
    //         <div className=" bg-white shadow-2xl lg:w-[34vw]  md:w-[54vw] h-fit rounded-4xl text-center flex flex-col ">
    //           {" "}
    //           <img
    //             className="w-auto rounded-4xl"
    //             src={processedImage}
    //             alt="Processed"
    //             width="200px"
    //           />
    //         </div>
    //         <p>downoload</p>
    //       </div>
    //     ) : (
    //       <div className=" bg-white shadow-2xl w-[34vw] h-[50vh] rounded-4xl text-center flex flex-col justify-around  m-auto"></div>
    //     )}
    //   </div>
    //   <div className="flex fle-col text-center  m-auto"></div>
    // </div>
    <div
      style={{
        backgroundImage: "url(/bg4.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "93.3vh",
        overflow: "hidden",
      }}
    >
      {" "}
      <div className="h-[70vh] flex flex-col lg:flex-row   w-[90vw] md:w-[80vw] xl:w-[60vw]     m-auto pt-24 lg:pt-40 justify-between ">
        {preview && !processedImage ? (
          <div className="rounded-4xl xl:w-[32vw] shadow-xl h-fit relative rounded-">
            <div className="xl:w-[32vw] absolute inset-0 flex flex-col justify-center items-center bg-black opacity-40 rounded-4xl">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="absolute xl:w-[32vw] inset-0  flex  justify-center items-center mt-16  text-white ">
              <p className="abosolute text-left w-20">Processing{dots}</p>
            </p>
            <img
              className="w-auto rounded-4xl  "
              src={preview}
              alt="Uploaded Preview"
              width="200px"
            />
          </div>
        ) : preview && processedImage ? (
          <div className="rounded-xl xl:w-[32vw] shadow-xl h-fit">
            <img
              className="w-auto rounded-4xl  "
              src={processedImage}
              alt="Uploaded Preview"
              width="200px"
            />
          </div>
        ) : (
          <ImageHeader />
        )}

        <Button
          className="lg:hidden"
          text={!preview ? "Upload Image" : "Change Image"}
        >
          <input
            id="file-upload-2"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
        </Button>
        <div className=" mt-32 hidden lg:block  bg-stone-50  shadow-[0_4px_15px_0_rgba(0,0,0,0.2)] w-[20vw] h-[34vh] rounded-4xl text-center  ">
          <p className="text-md font-bold text-blue-500 w-40 m-auto mt-12 ">
            Remove the background of any image
          </p>
          <Button
            className="mt-10"
            text={!preview ? "Upload Image" : "Change Image"}
          >
            <input
              id="file-upload-2"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
          </Button>
          <p className="text-xs font-bold text-stone-600 w-34 m-auto mt-6">
            {!preview
              ? "Add an image to remove its background"
              : "Try another image"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
