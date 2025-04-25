import { useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { BookCopyIcon,BellPlusIcon } from "lucide-react";

const RadioButtonAdminSideBar = ({ onNotificationClick }: { onNotificationClick: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <div className="flex flex-col justify-center items-center relative transition-all duration-[450ms] ease-in-out w-14">
      <article className="w-full ease-in-out duration-500 left-0 rounded-xl inline-block shadow-lg shadow-black/15 bg-white">

        {/* Dashboard */}
        <div
          onClick={() => navigate("/admin")}
          className={`relative w-full h-14 p-4 ease-in-out duration-300 border-solid border-black/10 group flex flex-row gap-3 items-center justify-center text-black rounded-xl cursor-pointer
          ${path === "/admin" ? "shadow-lg border text-[#578c82]" : ""}`}
        >
          <MdDashboard
            className={`text-2xl transition-all duration-300 
              ${path === "/admin" ? "scale-125 text-[#578c82]" : "group-hover:scale-125 group-hover:text-[#578c82]"}`}
          />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300 whitespace-nowrap z-10">
            Dashboard
          </span>
        </div>

        {/* Students */}
        <div
          onClick={() => navigate("/admin/students")}
          className={`relative w-full h-14 p-4 border-solid border-black/10 group flex items-center justify-center text-black rounded-xl cursor-pointer
            ${path.includes("/admin/students") ? "shadow-lg border text-[#578c82]" : ""}`}
        >
          <FaUserGraduate
            className={`text-2xl transition-all duration-300
              ${path.includes("/admin/students") ? "scale-125 text-[#578c82]" : "group-hover:scale-125 group-hover:text-[#578c82]"}`}
          />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300 whitespace-nowrap z-10">
          Students
          </span>
        </div>

        {/* Courses */}
        <div
          onClick={() => navigate("/admin/courses")}
          className={`relative w-full h-14 p-4 border-solid border-black/10 group flex items-center justify-center text-black rounded-xl cursor-pointer
            ${path.includes("/admin/courses") ? "shadow-lg border text-[#578c82]" : ""}`}
        >
          <BookCopyIcon
            className={`text-2xl transition-all duration-300
              ${path.includes("/admin/courses") ? "scale-125 text-[#578c82]" : "group-hover:scale-125 group-hover:text-[#578c82]"}`}
          />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300 whitespace-nowrap z-10">
          Courses
          </span>
        </div>

        {/* Messages */}
        <div
          onClick={onNotificationClick} // 🔁 Changed from navigate(...)
          className={`relative w-full h-14 p-4 border-solid border-black/10 group flex items-center justify-center text-black rounded-xl cursor-pointer
          ${path.includes("/admin/notification") ? "shadow-lg border text-[#578c82]" : ""}`}
        >
          <BellPlusIcon
          className={`text-2xl transition-all duration-300
          ${path.includes("/admin/notification") ? "scale-125 text-[#578c82]" : "group-hover:scale-125 group-hover:text-[#578c82]"}`}
          />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300 whitespace-nowrap z-10">
          Notifications
          </span>
        </div>


        {/* Settings
        <div
          onClick={() => navigate("/admin/settings")}
          className={`relative w-full h-14 p-4 border-solid border-black/10 group flex items-center justify-center text-black rounded-xl cursor-pointer
            ${path.includes("/admin/settings") ? "shadow-lg border text-[#578c82]" : ""}`}
        >
          <FiSettings
            className={`text-2xl transition-all duration-300
              ${path.includes("/admin/settings") ? "scale-125 text-[#578c82]" : "group-hover:scale-125 group-hover:text-[#578c82]"}`}
          />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300 whitespace-nowrap z-10">
            Settings
          </span>
        </div> */}
      </article>
    </div>
  );
};

export default RadioButtonAdminSideBar;
