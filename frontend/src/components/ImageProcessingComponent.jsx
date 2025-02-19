import { useEffect, useState } from "react";
import Image from "./Image.jsx";

const ImageProcessingComponent = ({ preview }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 300); // Adjust speed if needed

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="rounded-4xl xl:w-[32vw] shadow-xl h-fit relative rounded-">
      <div className="xl:w-[32vw] absolute inset-0 flex flex-col justify-center items-center bg-black opacity-40 rounded-4xl">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <div className="absolute xl:w-[32vw] inset-0  flex  justify-center items-center mt-16  text-white ">
        <p className="abosolute text-left w-20">Processing{dots}</p>
      </div>

      <Image src={preview} />
    </div>
  );
};

export default ImageProcessingComponent;
