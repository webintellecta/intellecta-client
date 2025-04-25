import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter, FaPhone } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#181616] text-white py-12 -mt-12  md:px-36 rounded-t-[50px] ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left ">
        
        {/* Left Section - Contact Info */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-medium">See how we can help you, <br /> Get in Touch Today.</h3>
          <div className="mt-4 flex flex-col items-center">
            <div className="bg-transparent text-center border border-white px-2 py-1 rounded-lg w-64">
              support@intellecta.com
            </div>
            <div className="bg-transparent text-center border border-white px-2 py-1 rounded-lg w-64 mt-2">
              +91 9455522267
            </div>
          </div>
        </div>

        {/* Right Section - Subscription Form */}
        <div className="w-full md:flex md:flex-col md:items-end">
          <h3 className="text-lg font-medium md:mr-10">Don&apos;t Miss Out—Subscribe Now</h3>
          <div className="flex mt-4 p-2 md:p-0">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-3 py-1 border border-white text-white rounded-lg w-64 focus:outline-none"
            />
            <button className="ml-2 px-2 py-1 border border-white text-white font-medium rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Links & Social Icons */}
      <div className="mt-10 text-center border-t border-gray-700 flex justify-between items-center  pt-5 pl-5">
        <h2 className="text-xl font-bold">iNTELLECTA</h2>
        {/* <p className="text-gray-400 text-sm mt-1">© 2025 iNTELLECTA. All rights reserved.</p> */}

        {/* Navigation Links */}
        <div className="md:flex justify-center gap-6  text-gray-200 text-sm hidden">
          <a href="#home" className="hover:text-white font-semibold">Home</a>
          <a href="#works" className="hover:text-white font-semibold">Quick Guide</a>
          <a href="#about" className="hover:text-white font-semibold">About Us</a>
          <a href="#footer" className="hover:text-white font-semibold">Contact Us</a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-lg pr-5">
          <FaPhone className="hover:text-gray-400 cursor-pointer" />
          <FaFacebookF className="hover:text-gray-400 cursor-pointer" />
          <FaWhatsapp className="hover:text-gray-400 cursor-pointer" />
          <FaInstagram className="hover:text-gray-400 cursor-pointer" />
          <FaXTwitter className="hover:text-gray-400 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
