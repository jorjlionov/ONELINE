import React from "react";
import logo from "../assets/logo/logo.webp"; // ← импорт

function Header() {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <img src={logo} alt="лого" className="w-64 h-auto ml-9" />
        <h1 className="text-white text-right font-bold text-4xl m-6 p-4">
          КАТАЛОГ
        </h1>
      </div>
    </>
  );
}

export default Header;
