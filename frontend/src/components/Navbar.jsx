import React from "react";
import { useAuthContext } from "../store/auth-context";

const Navbar = () => {
  const { logout } = useAuthContext();
  return (
    <div className=" font-bold text-stone-600  bg-stone-200 flex shadow-xl flex-row justify-between p-4 pr-6 pl-6">
      <p className="text-2xl">
        Bg<span className="text-stone-400">Remover</span>
      </p>
      <button
        onClick={logout}
        className=" mt-1 cursor-pointer hover:text-stone-400"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
