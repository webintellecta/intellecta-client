import React, { useState, useEffect } from "react";
import { GoChevronRight } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axiosInstance";

type CourseSidebarProps = {
  onClose: () => void;
  showsidebar: boolean;
  subject: string;
  onCoursesUpdate: (courses: any[]) => void;
};

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  onClose,
  showsidebar,
  subject,
  onCoursesUpdate,
}) => {
  const [showSkillLevel, setShowSkillLevel] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showProgressStatus, setShowProgressStatus] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handleGradeChange = (grade: string) => {
    const updatedGrades = selectedGrades.includes(grade)
      ? selectedGrades.filter((g) => g !== grade)
      : [...selectedGrades, grade];
    setSelectedGrades(updatedGrades);
    console.log("Selected Grades:", updatedGrades);
  };

  const handleLevelChange = (level: string) => {
    const updatedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter((l) => l !== level)
      : [...selectedLevels, level];
    setSelectedLevels(updatedLevels);
    console.log("Selected Levels:", updatedLevels);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["filteredCourses", subject, selectedGrades, selectedLevels],
    queryFn: async () => {
      console.log("Fetching courses with filters:", {
        subject,
        gradeLevel: selectedGrades,
        difficultyLevel: selectedLevels,
      });

      try {
        const response = await axiosInstance.get(
          `/courses/${subject}/filter`,
          {
            params: {
              gradeLevel: selectedGrades.length ? selectedGrades.join(",") : undefined,
              difficultyLevel: selectedLevels.length ? selectedLevels.join(",") : undefined,
            },
            withCredentials: true,
          }
        );

        console.log("Full API Response:", response);
        if (!response.data.data) {
          console.warn("No courses found in response:", response.data);
          return [];
        }
        return response.data.data;
      } catch (err) {
        // console.error("API Error:", err.response?.data || err.message);
        throw err;
      }
    },
    enabled: !!subject && (selectedGrades.length > 0 || selectedLevels.length > 0),
  });

  useEffect(() => {
    if (data) {
      console.log("Updating parent with courses:", data);
      onCoursesUpdate(data);
    }
  }, [data, onCoursesUpdate]);


  useEffect(() => {
    if (isLoading) {
      toast.info("Loading courses...", {
        autoClose: 1000,
      });
    } else {
      toast.dismiss("loading-toast"); 
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      toast.error("Error fetching courses");
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && !error && data?.length === 0) {
      toast.warn("No courses found for the selected filters.", {
      });
    }
  }, [isLoading, error, data]);

  return (
    <AnimatePresence>
      {showsidebar && (
        <motion.div
          key="sidebar"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[72px] right-0 z-50 min-h-screen w-64 bg-white shadow-xl border-l border-gray-200 p-5 backdrop-blur-lg"
        >
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h3 className="text-lg font-semibold tracking-wide text-gray-800">Filters</h3>
            <button
              className="text-lg cursor-pointer hover:text-cyan-700 transition-colors"
              onClick={onClose}
            >
              <CgClose />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <div
              className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              onClick={() => setShowSkillLevel(!showSkillLevel)}
            >
              <h3 className="font-medium text-gray-800">Skill Level</h3>
              <span
                className={`text-lg font-bold transform ${
                  showSkillLevel ? "rotate-90 text-cyan-500" : "rotate-0 text-gray-500"
                } transition-transform duration-300`}
              >
                <GoChevronRight />
              </span>
            </div>

            {showSkillLevel && (
              <div className="flex flex-col space-y-2 p-2">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <label key={level} className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level)}
                      onChange={() => handleLevelChange(level)}
                      className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 transition-all"
                    />
                    <span className="text-black text-sm group-hover:text-cyan-600 transition-colors">
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            )}

            <div
              className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              onClick={() => setShowDuration(!showDuration)}
            >
              <h3 className="font-medium text-gray-800">Duration</h3>
              <span
                className={`text-lg font-bold transform ${
                  showDuration ? "rotate-90 text-cyan-500" : "rotate-0 text-gray-500"
                } transition-transform duration-300`}
              >
                <GoChevronRight />
              </span>
            </div>

            {showDuration && (
              <div className="flex flex-col space-y-2 p-2">
                {["1 hour", "2 hours", "3 hours"].map((time) => (
                  <label key={time} className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 transition-all"
                    />
                    <span className="text-black text-sm group-hover:text-cyan-600 transition-colors">
                      {time}
                    </span>
                  </label>
                ))}
              </div>
            )}

            <div
              className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              onClick={() => setShowProgressStatus(!showProgressStatus)}
            >
              <h3 className="font-medium text-gray-800">Grade</h3>
              <span
                className={`text-lg font-bold transform ${
                  showProgressStatus ? "rotate-90 text-cyan-500" : "rotate-0 text-gray-500"
                } transition-transform duration-300`}
              >
                <GoChevronRight />
              </span>
            </div>

            {showProgressStatus && (
              <div className="flex flex-col space-y-2 p-2">
                {[
                  "Grade 1",
                  "Grade 2",
                  "Grade 3",
                  "Grade 4",
                  "Grade 5",
                  "Grade 6",
                  "Grade 7",
                  "Grade 8",
                  "Grade 9",
                  "Grade 10",
                  "Grade 11",
                  "Grade 12"
                ].map((grade) => (
                  <label key={grade} className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedGrades.includes(grade)}
                      onChange={() => handleGradeChange(grade)}
                      className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 transition-all"
                    />
                    <span className="text-black text-sm group-hover:text-cyan-600 transition-colors">
                      {grade}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CourseSidebar;