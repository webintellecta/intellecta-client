import { Link } from "react-router-dom";
import WcNavbar from "../components/Navbar/NavbarWelcome";
import axiosInstance from "../utils/axiosInstance";
import { userEndPoints } from "../api/endPoints/userEndPoints";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
    const { data } = await axiosInstance.get(userEndPoints.USER.GET_PROFILE);
    return data.data.user; 
};

const WelcomePage = () => {
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });

    return (
        <div>
            <WcNavbar />
            <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
                <div className="text-center my-6 sm:my-20">
                    <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold">
                        Welcome to iNTELLECTA, {user?.name}!
                    </h1>
                    <h5 className="text-xs mt-2 sm:text-base sm:mt-4">
                        We&apos;re excited to help you, to learn in a way that works best for you.
                    </h5>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-5xl gap-8 md:gap-10">
                    <div className="space-y-4 w-full md:w-1/2">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#F7D232] text-lg sm:text-xl text-white px-4 py-2 text-center rounded-full flex-shrink-0">
                                1
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-left">
                                Take a quick assessment to personalize your learning.
                            </h4>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-[#F7D232] text-lg sm:text-xl text-white px-4 py-2 text-center rounded-full flex-shrink-0">
                                2
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-left">
                                Get a custom learning path designed just for you.
                            </h4>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-[#F7D232] text-lg sm:text-xl text-white px-4 py-2 text-center rounded-full flex-shrink-0">
                                3
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-left">
                                Learn with our AI tutor that adapts to how you learn best.
                            </h4>
                        </div>

                        <div className="flex justify-center flex-col items-center pt-4">
                            <Link to="/assessment">
                                <button className="bg-[#F7D232] px-4 py-2 rounded-md text-sm sm:text-base shadow-md cursor-pointer font-semibold">
                                    Get Started
                                </button>
                            </Link>
                            <p className="my-4 text-xs sm:text-sm">
                                Initial assessment takes about 15 minutes
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src="welcome-bg.png"
                            alt="welcome-banner"
                            className="w-full max-w-xs sm:max-w-sm md:max-w-lg object-contain sm:-mt-16"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;