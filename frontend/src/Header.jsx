import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-center p-5 bg-white/60 text-white shadow-lg rounded-b-2xl backdrop-blur-lg">
      <img
        src="/Srmseal.png"
        alt="Logo"
        className="w-8 h-8 mr-3 sm:w-16 sm:h-16 rounded-full shadow-md"
      />
      <h1 className="text-lg sm:text-xl font-extrabold tracking-wide text-gray-800">
        <Link to="/">SRM Agri Project</Link>
      </h1>
    </header>
  );
};

export default Header;
