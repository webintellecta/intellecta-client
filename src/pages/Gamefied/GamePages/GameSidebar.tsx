import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaGamepad, FaTrophy } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../../../assets/Logo.svg";

const GameSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed top-0 w-20 h-screen bg-[#0d1423] text-white p-4 shadow-lg flex flex-col items-center">
      <img src={logo} alt="" className="text-red-500 h-8 mt-2" />

      <ul className="space-y-6 mt-14 w-full flex flex-col items-center">
        <li>
          <NavLink to="/games" end className="block">
            <div
              className={`p-3 rounded-xl transition-all duration-300 ${
                pathname === "/games"
                  ? "bg-violet-600 text-white"
                  : "hover:bg-[#1f2f5a] text-white"
              }`}
            >
              <FaHome className="text-xl" />
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/games/allgames" className="block">
            <div
              className={`p-3 rounded-xl transition-all duration-300 ${
                pathname === "/games/allgames"
                  ? "bg-violet-600 text-white"
                  : "hover:bg-[#1f2f5a] text-white"
              }`}
            >
              <FaGamepad className="text-xl" />
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/games/leaderboard" className="block">
            <div
              className={`p-3 rounded-xl transition-all duration-300 ${
                pathname === "/games/leaderboard"
                  ? "bg-violet-600 text-white"
                  : "hover:bg-[#1f2f5a] text-white"
              }`}
            >
              <FaTrophy className="text-xl" />
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/games/myprofile" className="block">
            <div
              className={`p-3 rounded-xl transition-all duration-300 ${
                pathname === "/games/myprofile"
                  ? "bg-violet-600 text-white"
                  : "hover:bg-[#1f2f5a] text-white"
              }`}
            >
              <BsPersonCircle className="text-xl" />
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default GameSidebar;
