import React, { useState } from "react";
import { Buffer } from "buffer";
import Label from "./Label.jsx";

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
      // const uploadedImageUrl = await uploadImageToImgur(selectedFile);
      // console.log("✅ Image uploaded to:", uploadedImageUrl);

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

  return (
    <div className="mt-20 text-center flex flex-col justify-center">
      <div className="flex flex-row p-5 w-[75vw] m-auto justify-between align-middle text-center">
        <div className="">
          {preview ? (
            <div className="">
              <div className=" bg-white shadow-2xl w-[34vw] h-fit rounded-4xl text-center flex flex-col ">
                <div className="rounded-4xl">
                  <img
                    className="w-auto rounded-4xl "
                    src={preview}
                    alt="Uploaded Preview"
                    width="200px"
                  />
                </div>
              </div>
              <div className=" text-white text-xl pt-2 bg-blue-600 w-[30%] h-12 rounded-l-full rounded-r-full text-center align-middle flex justify-center mt-5 m-auto cursor-pointer hover:bg-blue-500 ">
                <Label
                  className="cursor-pointer font-light"
                  htmlFor="file-upload-2"
                >
                  Change Image
                </Label>
                <input
                  id="file-upload-2"
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <div className="">
              <Label
                className="text-white text-2xl pt-2 bg-blue-600 w-[50%] h-14 rounded-l-full rounded-r-full text-center align-middle flex justify-center m-auto mb-4 cursor-pointer hover:bg-blue-500 "
                htmlFor="file-upload"
              >
                Upload Image
              </Label>
              <p className=" mt-0 mb-16 text-stone-500 font-semibold text-md">
                or drop a file
              </p>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        {processedImage ? (
          <div className="">
            <div className=" bg-white shadow-2xl w-[34vw] h-fit rounded-4xl text-center flex flex-col ">
              {" "}
              <img
                className="w-auto rounded-4xl"
                src={processedImage}
                alt="Processed"
                width="200px"
              />
            </div>
            <p>downoload</p>
          </div>
        ) : (
          <div className=" bg-white shadow-2xl w-[40vw] h-[30vh] rounded-4xl text-center flex flex-col justify-around  m-auto"></div>
        )}
      </div>
      <div className="flex fle-col text-center  m-auto"></div>
    </div>
  );
};

export default ImageComponent;
