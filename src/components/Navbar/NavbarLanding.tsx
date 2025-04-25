import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import hamburger & close icons
import logo from "../../assets/Logo.svg";
import DownBarLanding from "./DownBarLanding";

const LandingNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-0 w-full ${!menuOpen ? "bg-[#081a37]" : "bg-[#343e48]"}  text-white py-5 md:px-36 px-5 flex justify-between items-center z-50 `}>      
      {/* Logo Section */}
     <div className="flex  w-full justify-between items-center">
     <div className=" flex items-center text-white">
        <img src={logo} alt="Intellecta Logo" className="h-10 mr-3" /> 
        <div>
          <h1 className="text-xl font-bold">iNTELLECTA</h1>
          <p className="text-sm text-gray-300">Learn, Grow, Succeed</p>
        </div>
      </div>
      {/* Desktop Navigation */}
      {menuOpen == false &&(<ul className="hidden md:flex gap-8 text-xs mr-12">
        <li><a href="#home" className="hover:text-gray-400 py-1 border-white font-semibold">Home</a></li>
        <li><a href="#works" className="hover:text-gray-400 py-1  border-white font-semibold">Quick Guide</a></li>
        <li><a href="#about" className="hover:text-gray-400 py-1 border-white font-semibold">About Us</a></li>
        <li><a href="#footer" className="hover:text-gray-400 py-1 border-white font-semibold">Contact Us</a></li>
      </ul>)}
     </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className=" text-5xl">
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
       < DownBarLanding setfn={setMenuOpen} />
      )}
      
    </nav>
  );
};  

export default LandingNavbar;
