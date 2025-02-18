import React from "react";

const Navbar = () => {
  return (
    <div className=" font-bold text-stone-600 flex shadow-md flex-row justify-between p-4 pr-6 pl-6">
      <p className="text-2xl">
        Bg<span className="text-stone-400">Remover</span>
      </p>
      <p className=" mt-1 cursor-pointer hover:text-stone-400">Log Out</p>
    </div>
  );
};

export default Navbar;
