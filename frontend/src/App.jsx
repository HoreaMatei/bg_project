import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import ImageComponent from "./components/ImageComponent.jsx";

import Navbar from "./components/Navbar.jsx";
import AuthForm from "./components/AuthForm.jsx";
import { useAuthContext } from "./store/auth-context.jsx";
import Header from "./components/Header.jsx";

function App() {
  const { token } = useAuthContext();
  return (
    <div
      style={{
        backgroundImage: "url(/bg4.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "hidden",
      }}
      className="   min-h-screen    relative  "
    >
      {!token ? <Header /> : null}
      {!token ? <AuthForm /> : <ImageComponent />}
      {/* <Navbar />
       */}
    </div>
  );
}

export default App;
