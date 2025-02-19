import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Label from "./Label.jsx";
import Image from "./Image.jsx";
import Button from "./Button.jsx";
import ImageHeader from "./ImageHeader.jsx";
import ImageProcessingComponent from "./ImageProcessingComponent.jsx";

async function sendImageRequest(imageUrl) {
  const response = await fetch(`http://localhost:3000/api/image`, {
    method: "POST",
    body: JSON.stringify({ image: imageUrl }), //  Sends the URL as JSON
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to process image");
  }

  const { processedImageUrl } = await response.json();
  return processedImageUrl; // Backend should return the processed image URL
}

const ImageComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    setPreview(URL.createObjectURL(file));
    setProcessedImage(null); // Reset processed image when a new file is selected

    setSelectedFile(file); // Store selected file for upload
  };

  // Upload image when selectedFile changes
  useEffect(() => {
    if (!selectedFile) return;

    const uploadImage = async () => {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "cloudinary_ai_images");
      data.append("cloud_name", "dw7ukar2t");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dw7ukar2t/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const uploadedImage = await res.json();

        // Send the image URL to your API
        const resultImage = await sendImageRequest(uploadedImage.url);
        const base64String = Buffer.from(resultImage.data).toString("base64");

        // Set processed image
        setProcessedImage(`data:image/png;base64,${base64String}`);
      } catch (error) {
        console.error(" Error uploading image:", error.message);
      }
    };

    uploadImage();
  }, [selectedFile]);

  return (
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
      <div
        className={` h-[70vh]  flex flex-col lg:flex-row   w-[90vw] md:w-[80vw]  xl:w-[70vw] 2xl:w-[60vw]    ${
          preview ? "m-auto pt-24 lg:pt-[10vh]" : "m-auto pt-24 lg:pt-[16vh]"
        } justify-between`}
      >
        {preview && !processedImage ? (
          <ImageProcessingComponent preview={preview} />
        ) : preview && processedImage ? (
          <div>
            <div className="rounded-4xl w-[90vw] xl:w-[32vw] shadow-xl h-fit">
              <Image src={processedImage} />
            </div>
            <Button className="mb-2" text="Download"></Button>
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
        <div className=" pb-4 mt-[14vh] hidden lg:block  bg-stone-50  shadow-[0_4px_15px_0_rgba(0,0,0,0.2)] w-[25vw] xl:w-[20vw] min-h-fit h-[34vh] rounded-4xl text-center  ">
          <p className="text-md font-bold text-blue-500 w-40 m-auto mt-16 ">
            Remove the background of any image
          </p>
          <Button
            className="mt-4"
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
