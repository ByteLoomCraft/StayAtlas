import React, { useState } from "react";
import logo from "../assets/stay.jpg"; // Replace with actual file path and name
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const navigate= useNavigate()
  return (
    <header className="bg-[#00291c] sticky top-0 z-50 shadow-md">
      <div className="max-w-[2560px] mx-auto flex justify-between items-center py-5 px-6 md:px-20">
        {/* Logo */}
        {/* <div className="text-white text-2xl font-light tracking-widest hover:scale-105 transition-transform duration-300 cursor-pointer">
          StayAtlas
        </div> */}
        <div onClick={()=>navigate("/")} className="cursor-pointer">
          <img src={logo} alt="StayAtlas Logo" className="h-10 md:h-12 w-auto" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="/" className="text-[#D6AE7B] font-semibold text-sm relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#D6AE7B] after:w-0">HOME</a>

          {/* Location Dropdown */}
          <div className="relative group">
            <button className="text-[#D6AE7B] font-semibold text-sm flex items-center gap-1">LOCATION <span className="text-xs">▼</span></button>
            <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 min-w-[180px] shadow-xl rounded-xl overflow-hidden mt-2 z-40">
              <a href="#" className="px-4 py-3 block hover:bg-[#D6AE7B] hover:text-white transition-all duration-200">Panvel</a>
              <a href="#" className="px-4 py-3 block hover:bg-[#D6AE7B] hover:text-white transition-all duration-200">Khanavale</a>
              <a href="#" className="px-4 py-3 block hover:bg-[#D6AE7B] hover:text-white transition-all duration-200">Other Locations</a>
            </div>
          </div>

          {/* Exclusive Dropdown */}
          <div className="relative group">
            <button className="text-[#D6AE7B] font-semibold text-sm flex items-center gap-1">EXCLUSIVE <span className="text-xs">▼</span></button>
            <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 min-w-[180px] shadow-xl rounded-xl overflow-hidden mt-2 z-40">
              <a href="#" className="px-4 py-3 block hover:bg-blue-500 hover:text-white transition-all duration-200">Villas</a>
              <a href="#" className="px-4 py-3 block hover:bg-blue-500 hover:text-white transition-all duration-200">Resorts</a>
              <a href="#" className="px-4 py-3 block hover:bg-blue-500 hover:text-white transition-all duration-200">Pool Homes</a>
            </div>
          </div>

          <a href="https://wa.me/918591131447" target="_blank" rel="noopener noreferrer" className="text-[#D6AE7B] font-semibold text-sm relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#D6AE7B] after:w-0">CONTACT US</a>
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            className="text-[#D6AE7B] font-semibold text-sm flex items-center gap-1"
          >
            MENU <span className="text-xs">▼</span>
          </button>

          {isMobileDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-gray-800 min-w-[180px] shadow-xl rounded-xl overflow-hidden z-50">
              <a href="/" className="block px-4 py-3 hover:bg-[#D6AE7B] hover:text-white transition-all duration-200">HOME</a>
              <a href="https://wa.me/918591131447" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-[#D6AE7B] hover:text-white transition-all duration-200">CONTACT US</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
