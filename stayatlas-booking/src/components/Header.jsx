import React, { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/state/features/authSlice";
import logo from "../assets/stay.jpg";
import { Bars3Icon } from '@heroicons/react/24/outline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "../utils/axios"
import toast from "react-hot-toast";

const Header = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const match  = useMatch("/viewExclusive/:id")
  
  const {isLoggedIn:isAuth,firstName} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      const response = await axios.post("/v1/users/logout");
      console.log("Logout response:", response.data);
      if (response.data.statusCode === 200) {
        toast.success("Logout successful");
        dispatch(logout());
        navigate("/login");
      }else{
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <header className="bg-[#00291c] sticky top-0 z-50 shadow-md">
      <div className="max-w-[2560px] mx-auto flex justify-between items-center py-5 px-6 md:px-20">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          {match ? 
            <div className="text-white text-2xl font-light tracking-widest hover:scale-105 transition-transform duration-300 cursor-pointer">
             Stay<span className="italic bg-gradient-to-br from-[#F9F295] to-[#fceb01] bg-clip-text text-transparent">Exclusive</span>
            </div>
            : 
            <img src={logo} alt="StayAtlas Logo" className="h-10 md:h-12 w-auto" />}
        </div>

        {isAuth ? (
          <>
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a
                href="/"
                className="text-[#D6AE7B] font-semibold text-sm relative
                  hover:after:w-full after:transition-all after:duration-300
                  after:absolute after:bottom-0 after:left-0 after:h-0.5
                  after:bg-[#D6AE7B] after:w-0"
              >
                HOME
              </a>

              <div className="relative group">
                <button className="text-[#D6AE7B] font-semibold text-sm flex items-center gap-1 
                                   hover:after:w-full after:transition-all after:duration-300
                                   after:absolute after:bottom-0 after:left-0 after:h-0.5
                                   after:bg-[#D6AE7B] after:w-0">
                  LOCATION {/* <span className="text-xs">▼</span> */}
                </button>
                {/*
                <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 min-w-[180px] shadow-xl rounded-xl overflow-hidden mt-2 z-40">
                  <a
                    href="#"
                    className="px-4 py-3 block hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    Panvel
                  </a>
                  <a
                    href="#"
                    className="px-4 py-3 block hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    Khanavale
                  </a>
                  <a
                    href="#"
                    className="px-4 py-3 block hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    Other Locations
                  </a>
                </div>
                */}
              </div> 

              <div className="relative group">
                <button onClick={() => navigate("/exclusive")} className="text-[#D6AE7B] font-semibold text-sm flex items-center gap-1
                                                                          hover:after:w-full after:transition-all after:duration-300
                                                                          after:absolute after:bottom-0 after:left-0 after:h-0.5
                                                                           after:bg-[#D6AE7B] after:w-0">
                  EXCLUSIVE {/* <span className="text-xs">▼</span> */}
                </button>
                {/*
                <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 min-w-[180px] shadow-xl rounded-xl overflow-hidden mt-2 z-40">
                  <a
                    href="#"
                    className="px-4 py-3 block hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    Villas
                  </a>
                  <a
                    href="#"
                    className="px-4 py-3 block hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    Resorts
                  </a>
                  <a
                    href="#"
                    className="px-4 py-3 block hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    Pool Homes
                  </a>
                </div>
                */}
              </div>

              <div className="relaltive group">
                <a
                  href="/explore"
                  className="text-[#D6AE7B] font-semibold text-sm relative
                  hover:after:w-full after:transition-all after:duration-300
                  after:absolute after:bottom-0 after:left-0 after:h-0.5
                  after:bg-[#D6AE7B] after:w-0"
                >
                  EXPLORE
                </a>
              </div>

              <a
                href="https://wa.me/918591131447"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D6AE7B] font-semibold text-sm relative
                  hover:after:w-full after:transition-all after:duration-300
                  after:absolute after:bottom-0 after:left-0 after:h-0.5
                  after:bg-[#D6AE7B] after:w-0"
              >
                CONTACT US
              </a>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Avatar className="w-10 h-10 cursor-pointer">
                    <AvatarImage src={`https://api.dicebear.com/5.x/initials/svg/seed=${firstName}`} alt={firstName} />
                    <AvatarFallback>{firstName}</AvatarFallback>
                  </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/list")}>
                      List Your Property
                      <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => logoutUser()}>
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            

            {/* Mobile Dropdown */}
            <div className="md:hidden relative">
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="text-[#D6AE7B] font-semibold text-sm flex items-center gap-1"
              >
                  <Bars3Icon className="h-5 w-5 sm:hidden" />
                  <span className="hidden sm:inline">MENU</span>
              </button>

              {isMobileDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 min-w-[180px] shadow-xl rounded-xl overflow-hidden z-50">
                  <a
                    href="/"
                    className="block px-4 py-3 hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    HOME
                  </a>
                  <a
                    href="/exclusive"
                    className="block px-4 py-3 hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    EXCLUSIVE
                  </a>
                  <a
                    href="/explore"
                    className="block px-4 py-3 hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    EXPLORE
                  </a>
                  <a
                    href="https://wa.me/918591131447"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 hover:bg-[#D6AE7B] hover:text-white transition-all duration-200"
                  >
                    CONTACT US
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="/signup"
              className="text-[#D6AE7B] font-semibold text-sm relative
                hover:after:w-full after:transition-all after:duration-300
                after:absolute after:bottom-0 after:left-0 after:h-0.5
                after:bg-[#D6AE7B] after:w-0 cursor-pointer"
            >
              SIGNUP
            </a>
            <a
              href="/login"
              className="text-[#D6AE7B] font-semibold text-sm relative
                hover:after:w-full after:transition-all after:duration-300
                after:absolute after:bottom-0 after:left-0 after:h-0.5
                after:bg-[#D6AE7B] after:w-0"
            >
              LOGIN
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

