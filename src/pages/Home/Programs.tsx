import React from "react";
import {
  MdCalculate,
  MdCode,
  MdMenuBook,
  MdPublic,
  MdScience,
} from "react-icons/md";
import { Link } from "react-router-dom";
import NavbarWelcome from "../../components/Navbar/NavbarWelcome";

const topThreePrograms = [
  {
    id: 1,
    icon: <MdMenuBook className="text-3xl text-gray-900" />,
    title: "Reading & Writing",
    category:"english",
    description:
      "Boost literacy with storytelling, writing, and guided reading.",
  },
  {
    id: 2,
    icon: <MdCalculate className="text-3xl text-gray-900" />,
    title: "Maths & Logics",
    category:"maths",
    description: "Master math through quizzes and real-world problem-solving.",
  },
];

const bottomFourPrograms = [
  {
    id: 3,
    icon: <MdScience className="text-3xl text-gray-900" />,
    title: "Science & Exploration",
    category:"science",
    description: "Explore science through hands-on experiments and discovery.",
  },
  {
    id: 4,
    icon: <MdCode className="text-3xl text-gray-900" />,
    title: "Coding",
    category:"coding",
    description: "Learn programming with resources.",
  },
  {
    id: 5,
    icon: <MdPublic className="text-3xl text-gray-900" />,
    title: "History & Cultures",
    category:"history",
    description: "Explore history and cultures through interactive stories.",
  },
];


const Programs: React.FC = () => {
  return (
    <>
    <NavbarWelcome />
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-60 my-6">
      {/* Top Grid: 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 p-2">
        <div className="max-w-xs flex flex-col space-y-4 min-w-[250px] sm:min-w-[275px] p-2">
          <h2 className="text-xl sm:text-2xl font-bold">Our Programs For Your Kids</h2>
          <p className="font-medium text-gray-800 text-sm sm:text-base">
            Engaging educational programs designed to foster creativity and
            critical thinking in children. Each course offers interactive lessons,
            hands-on activities, and expert guidance to help your child develop
            essential skills for the future.
          </p>
          <button className="flex justify-center items-center cursor-pointer bg-[#0b317d] px-3 text-white py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold shadow-md text-base">
            Select One ⇩
          </button>
        </div>

        {topThreePrograms.slice(0, 2).map((program) => (
          <Link to={`/courses/${program.category}`} key={program.id}>
            <div
              className="w-full max-w-[320px] h-[300px] bg-white border cursor-pointer hover:border-blue-400 hover:border-2 border-[#32c6f7] p-5 rounded-2xl shadow-md flex flex-col justify-center items-center"
            >
              <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-[#b6e7f5] rounded-full mb-4">
                {program.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-center">{program.title}</h3>
              <p className="text-xs sm:text-sm text-center text-gray-600">
                {program.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Grid: 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-8 mt-4 sm:mt-2 sm:gap-10">
        {bottomFourPrograms.slice(0, 3).map((program) => (
          <Link to={`/courses/${program.category}`} key={program.id}>
            <div
              className="w-full max-w-[320px] h-[300px] bg-white border cursor-pointer hover:border-blue-400 hover:border-2 border-[#32c6f7] p-5 rounded-2xl shadow-md flex flex-col justify-center items-center"
            >
              <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-[#b6e7f5] rounded-full mb-4">
                {program.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-center">{program.title}</h3>
              <p className="text-xs sm:text-sm text-center text-gray-600">
                {program.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default Programs;
