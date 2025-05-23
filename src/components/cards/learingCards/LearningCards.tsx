import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import React from "react";
import { data, useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "../../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

interface LearningCardProp {
  course: {
    courseId: {
      _id:string
    }
  }
  progress: number;
  title: string;
}

const LearningCards: React.FC<LearningCardProp> = ({
  course,
  progress,
  title,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  console.log(course);
  
  const { data: courseData } = useQuery({
    queryKey: ['courseDataUser'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/courses/${course.courseId._id}`)
      return response.data.data.course || [];
    },
    enabled: !!course
  })
  
  const handleCourse = () => {
    if(courseData){
      navigate(`/course/${courseData.subject}/${courseData.title}/${courseData._id}`);
    }
  };

  
  return (
    <motion.div
      className="w-96 h-44 px-4 flex items-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 justify-between gap-3 max-w-md"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="text-4xl text-gray-500"
        whileHover={{ rotate: 15 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* <GiLaptop /> */}
      </motion.div>

      <div className="flex-1 py-2 flex flex-col gap-3">
        <motion.h1
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <div className="w-48 h-6 rounded-full overflow-hidden bg-gray-100 p-1 border border-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          ></motion.div>
        </div>
      </div>
      <motion.button
        className="ml-2 px-2 py-1 text-black/50 hover:text-black border text-xs font-medium rounded-lg transition-colors duration-300 flex justify-center items-center gap-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCourse} // Navigate to /courses
      >
        Continue <FaArrowRight />
      </motion.button>
    </motion.div>
  );
};

export default LearningCards;
