import { useState, useEffect, useRef } from "react";
import wcpagelogo from "../../assets/wcpage-logo.svg";
import { MdLeaderboard, MdSettings } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import axiosInstance from "../../utils/axiosInstance";
import { userEndPoints } from "../../api/endPoints/userEndPoints";
import { useQuery } from "@tanstack/react-query";
import student from "../../assets/Profile.jpg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import SpinningLoader from "../Loaders/SpinningLoader";
import { IoNotifications } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa6";

const fetchUser = async () => {
  const { data } = await axiosInstance.get(userEndPoints.USER.GET_PROFILE);
  return data.data.user;
};

const NavbarWelcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Logging out");
      await axiosInstance.post(userEndPoints.USER.LOGOUT);
      localStorage.removeItem("isAuthenticated");
      toast.success("You are successfully logged out");
      navigate("/");
    } catch (error: any) {
      console.error("Error during logout:", error);
      const errorMessage =
        error.response?.data?.message || "Error logging user";
      toast.error(errorMessage);
    }
  };

  const handleProfileClick = () => {
    setLoading(true);
    setIsOpen(false);
    setTimeout(() => {
      navigate("/profile");
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Full-Screen Loader */}
      {loading && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#041336] to-[#031532] bg-opacity-95 flex flex-col justify-center items-center z-50 backdrop-blur-sm">
          <SpinningLoader />
          <p className="mt-12 text-base font-medium text-slate-200 tracking-wide animate-pulse">
            Loading your profile. Please wait...
          </p>
        </div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-[#031532]/90 backdrop-blur-lg border-b border-slate-800 px-4 md:px-36 py-3 shadow-xl relative z-40">
        {/* Logo Section */}
        <Link to="/home">
          <div className="flex items-center gap-2 text-white">
            <img src={wcpagelogo} alt="Logo" className="h-[26px] md:h-[32px]" />
            <div className="leading-tight">
              <h1 className="text-sm md:text-lg font-semibold text-blue-100 tracking-wide">
                iNTELLECTA
              </h1>
              <h5 className="text-slate-400 text-[10px] md:text-xs">
                Learn. Grow. Succeed.
              </h5>
            </div>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex space-x-8 text-slate-300 font-medium text-sm">
          <Link
            to="/home"
            className="relative group text-slate-200 hover:text-blue-400 transition-all ease-in duration-300"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>

          <Link
            to="/courses"
            className="relative group text-slate-200 hover:text-blue-400 transition-all ease-in duration-300"
          >
            Courses
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>

          <Link
            to="/games"
            className="relative group text-slate-200 hover:text-blue-400 transition-all ease-in duration-300"
          >
            Games
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/userdash"
            className="relative group text-slate-200 hover:text-blue-400 transition-all ease-in duration-300"
          >
            Overview
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Link to="/notification">
            <span className="text-slate-300 text-xl cursor-pointer hover:text-blue-400 transition">
              <IoNotifications />
            </span>
          </Link>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={user?.profilePic || student}
              className="w-9 h-9 rounded-full border-2 border-slate-600 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200"
              alt="User"
              onClick={() => setIsOpen(!isOpen)}
            />

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#0f172a]/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-xl z-50 transition-all duration-200">
                <ul className="py-2 text-sm text-slate-200">
                  <li>
                    <button
                      className="flex items-center gap-2 px-4 py-2 w-full hover:bg-slate-800 transition"
                      onClick={handleProfileClick}
                      disabled={loading}
                    >
                      <MdSettings className="text-lg" />
                      Profile Settings
                    </button>
                  </li>
                  <Link to="/userdash" className="md:hidden block">
                    <li className="flex items-center gap-2 px-4 py-2 w-full hover:bg-slate-800 transition">
                      <MdLeaderboard />
                      Overview
                    </li>
                  </Link>
                  <Link to="/games" className="md:hidden block">
                    <li className="flex items-center gap-2 px-4 py-2 w-full hover:bg-slate-800 transition">
                      <FaGamepad className="text-lg" />
                      Games
                    </li>
                  </Link>

                  <li>
                    <button
                      className="flex items-center gap-2 px-4 py-2 w-full hover:bg-red-600/20 text-red-300 hover:text-white transition"
                      onClick={handleLogout}
                    >
                      <GoSignOut className="text-lg" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Username */}
          <h5 className="hidden md:block text-sm text-slate-300 font-medium">
            {user?.name}
          </h5>
        </div>
      </nav>
    </>
  );
};

export default NavbarWelcome;
