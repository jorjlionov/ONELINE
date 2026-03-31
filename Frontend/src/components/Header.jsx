import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo/logo.webp';
import SearchBar from './SearchBar'


function Header({ onSearch }) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-4 pb-8 gap-4 mb-8">
      <Link to= '/' className="shrink-0">
        <img src={logo} alt="logo" className="w-48 h-auto"/>
      </Link>

      <div className="flex-1 max-w-2xl">
        <SearchBar onSearch ={onSearch}/>
      </div>

      <h1 className="text-white text-right font-bolt text-3xl shrink-0 ml-3.5">
        КАТАЛОГ
      </h1>
    </div>
  );
}

export default Header;