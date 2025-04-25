import WcNavbar from "../../components/Navbar/NavbarWelcome";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();

  const handleCourse = () => {
    navigate("/courses");
  };
  return (
    <div>
      <WcNavbar />
      <div className="flex flex-col lg:flex-row justify-center items-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 sm:mt-12 lg:mt-24 gap-8 h-auto">
        
        {/* Left Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:gap-8 lg:w-2/3 ">
          <div className="flex flex-col mt-6 w-full lg:w-1/2 gap-4 p-6 lg:p-8 rounded-lg text-black">
            <h1 className="text-2xl font-bold text-center md:text-left lg:text-left">
              Join a Place Where Every Student Should Be
            </h1>
            <p className="text-base font-medium text-justify">
              Intellecta transforms traditional learning into exciting adventures.
              Our interactive courses combine fun and education, helping students
              develop critical thinking and technical skills while enjoying the
              learning process. With personalized paths and real-time feedback, we
              make education effective and engaging for every child.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={handleCourse}
                className="bg-[#BFE5F8] px-4 py-3 cursor-pointer rounded-md font-semibold shadow-md hover:bg-blue-300 transition"
              >
                View Courses
              </button>
            </div>
          </div>

          <div className="w-full mt-6 lg:w-1/2 flex justify-center items-center">
            <div className="bg-white border-4 border-[#BFE5F8] rounded-xl overflow-hidden shadow-md">
              <img src="HomePage (1).jpg" className="w-full h-auto" alt="Learning Platform" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-4 rounded-lg -mt-8 mb-8 mb:mb-0 w-full lg:h-1/3 md:mt-6 sm:max-w-md lg:max-w-sm space-y-4 sm:space-y-8">
          {[ 
            { icon: <RiGraduationCapFill />, title: "Smart Lessons", desc: "Adaptive curriculum tailored to every learner." },
            { icon: <IoGameController />, title: "Play & Learn", desc: "Learn, play, and earn rewards." },
            { icon: <FaRobot />, title: "AI-Tutor", desc: "Get instant help and personalized support with our smart assistant." }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 sm:gap-6">
              <div className="bg-[#BFE5F8] rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-4 sm:p-5 shadow-md">
                <div className="text-[30px] sm:text-[40px]">{item.icon}</div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                <p className="text-xs sm:text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
