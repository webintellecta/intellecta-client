// src/pages/admin/AdminLayout.tsx
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LogOutButton from "../../utils/ui/logoutButton";
import RadioButtonAdminSideBar from "../../utils/ui/radioButtonAdminSidebar";
import intellectalogo from "../../assets/Intellecta-logo.svg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationPanel from "./AdminNotifications";
import axiosInstance from "../../utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchStudents, fetchCourses } from "./services/services";

export interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  profilePic?: string;
  role: "student";
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  _id: string;
  title: string;
  subject: string;
  description: string;
  gradeLevel?: number;
  thumbnail?: string;
}

export interface CourseResponse {
  courses: Course[];
  pagination: {
    totalCourses: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface AdminData {
  _id: string;
  name: string;
  email: string;
  data: object;
}

const AdminLayout = () => {
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/user/admin-logout");
      return res.data;
    },
    onSuccess: (data) => {
      console.log("logout", data);
      localStorage.removeItem("isAdmin");
      navigate("/admin_login");
    },
  });

  // Fetch students
  const params = { page: 1, limit: 10, search: "john", catagory: "math", isBlock: false };
  const { data:students, isLoading:isStudentsLoading } = useQuery({
    queryKey: ["students", params],
    queryFn: () => fetchStudents(params),
  });
  

  // Fetch courses
  const { data: courseData, isLoading: isCoursesLoading } = useQuery<CourseResponse>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  useEffect(() => {
    // Optional: Add debugging or side effects for students/courseData
  }, [students, courseData]);

  const currentPage = (() => {
    switch (location.pathname) {
      case "/admin":
        return "Dashboard";
      case "/admin/students":
        return "Students";
      case "/admin/courses":
        return "Courses";
      case "/admin/notification":
        return "Notification";
      default:
        return "Dashboard";
    }
  })();

  const isAddCoursePage = location.pathname === "/admin/addCourse";

  if (isAddCoursePage) {
    return (
      <div className="bg-[#d8ede7] min-h-screen">
        <Outlet />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin_login" replace />;
  }

  // Determine count and label for specific paths
  const getCountInfo = () => {
    if (location.pathname === "/admin/courses") {
      return {
        count: isCoursesLoading ? "Loading..." : courseData?.pagination.totalCourses,
        label: "Courses",
      };
    } else if (location.pathname === "/admin" || location.pathname === "/admin/students") {
      return {
        count: isStudentsLoading ? "Loading..." : students?.length,
        label: "Students",
      };
    }
    return { count: "", label: "" }; 
  };

  const { count, label } = getCountInfo();

  return (
    <div className="flex justify-between min-h-screen bg-[#d8ede7]">
      {/* Sidebar */}
      <aside className="w-16 bg-[#d8ede7] flex flex-col items-center py-6">
        {/* Logo */}
        <div className="p-0.5">
          <img src={intellectalogo} alt="intellecta logo" />
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-4 justify-center py-30 flex-1">
          <RadioButtonAdminSideBar onNotificationClick={() => setShowNotification(!showNotification)} />
        </nav>

        {/* User Profile & Logout - Stick to Bottom on Desktop */}
        <div className="flex flex-col space-y-2 mb-4 z-50">
          <div onClick={() => logoutMutation()}>
            <LogOutButton />
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 relative overflow-hidden">
        {/* Header */}
        <header className="p-4 bg-[#d8ede7] flex justify-between items-center">
          <div>
            {currentPage && (
              <h1 className="text-3xl font-bold flex items-center">
                <span>{currentPage}</span>
              </h1>
            )}
            <p className="text-sm font-semibold">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="text-right">
            {count && (
              <>
                <h2 className="text-3xl font-bold">{count}</h2>
                <p className="text-sm">{label}</p>
              </>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="pr-4 flex-1 bg-[#d8ede7]">
          <Outlet />
        </main>

        {/* Notification Panel */}
        {showNotification && <NotificationPanel onClose={() => setShowNotification(false)} />}
      </div>
    </div>
  );
};

export default AdminLayout;