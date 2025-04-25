import wcpagelogo from "../../assets/wcpage-logo.svg";
import elements from "../../assets/elements.png";
import { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

interface AdminFormType {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const [adminForm, setAdminForm] = useState<AdminFormType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { mutate: adminLoginMutation } = useMutation({
    mutationFn: async (values: AdminFormType) => {
      console.log(values);
      
      const res = await axiosInstance.post(
        "https://intellecta-user-service.onrender.com/api/user/admin-login",
        values
      );
      return res.data;
    },
    onSuccess: () => {
      navigate("/admin");
      localStorage.setItem("isAdmin", "true")
      toast.success("Welcome back!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Error, Failed to login");
      console.log(error);
      
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    adminLoginMutation(adminForm);
  };

  return (
    <div className="h-screen w-full">
      <div className="flex h-full">
        <div className="bg-[#00008B] text-white w-4/6 flex flex-col relative overflow-hidden">
          <img
            src={elements}
            className="absolute max-h-screen z-0 opacity-30 pointer-events-none inset-0 w-full object-cover"
            alt="background elements"
          />
          <div className="max-w-sm ml-44 mt-24 space-y-3 z-10">
            <img
              src={wcpagelogo}
              alt="Intellecta Logo"
              className="h-[26px] md:h-[50px] w-16"
            />
            <h1 className="text-6xl font-semibold">Hello</h1>
            <h1 className="text-6xl font-semibold">Intellecta! 👋</h1>
            <p className="text-base text-gray-200">
              Manage courses, monitor student progress, and customize learning
              experiences — all from one place.
            </p>
          </div>
          <div className="flex items-end h-full justify-center py-4 text-center text-sm text-gray-200">
            &copy; {new Date().getFullYear()} Intellecta. All rights reserved.
          </div>
        </div>

        <div className="w-2/6 flex flex-col justify-center p-20">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="font-semibold text-3xl">Welcome Back</h3>

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={adminForm.email}
              onChange={(e) =>
                setAdminForm({ ...adminForm, [e.target.name]: e.target.value })
              }
              
              className="p-[0.875rem] text-base font-[SF_Pro] border-[1.5px] border-black rounded-lg shadow-[2.5px_3px_0_black] outline-none transition-all duration-200 ease-in-out focus:shadow-[5.5px_7px_0_black]"
              required
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={adminForm.password}
              onChange={(e) =>
                setAdminForm({ ...adminForm, [e.target.name]: e.target.value })
              }
              
              className="p-[0.875rem] text-base font-[SF_Pro] border-[1.5px] border-black rounded-lg shadow-[2.5px_3px_0_black] outline-none transition-all duration-200 ease-in-out focus:shadow-[5.5px_7px_0_black]"
              required
            />

            <button
              type="submit"
              className="cursor-pointer mt-5 w-full bg-black text-white rounded-full text-[17px] font-semibold px-8 py-4 border border-white shadow-[0_0_0_0_black] transition-all duration-300 ease-in-out 
              hover:translate-y-[-4px] hover:translate-x-[-2px] hover:shadow-[2px_5px_0_0_black] 
              active:translate-y-[2px] active:translate-x-[1px] active:shadow-[0_0_0_0_black]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
