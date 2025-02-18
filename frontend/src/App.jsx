import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import ImageComponent from "./components/ImageComponent.jsx";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" bg-stone-50  min-h-screen">
      <Navbar />
      <ImageComponent />
    </div>
  );
}

export default App;
