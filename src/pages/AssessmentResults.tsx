import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AssessmentResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.resultData?.assessmentResult;

  console.log("resultData", resultData);

  // If no result data, redirect back to assessment
  if (!resultData) {
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <p>No results available. Please complete the assessment.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
          onClick={() => navigate("/assessment")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { totalQuestions, correctCount, scorePercentage, weaknesses, aiResponse } = resultData;

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-2 w-full max-w-6xl flex flex-col lg:flex-row items-center">
        {/* Left Section - Progress Bar & Scores */}
        <div className="flex flex-col items-center w-full h-96 p-4 lg:w-1/2 lg:border-r-3 border-gray-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Overall Progress</h2>
          
          {/* Circular Progress */}
          <div className="w-28 h-28 md:w-40 md:h-40 mb-4">
            <CircularProgressbar
              value={scorePercentage}
              text={`${Math.round(scorePercentage)}%`}
              styles={buildStyles({
                textSize: "18px",
                pathColor: scorePercentage <= 40 ? "#eb4034" : scorePercentage <= 74 ? "#f7d232" : "#34eb5b",
                textColor: "#333",
                trailColor: "#eee",
                strokeLinecap: "round",
              })}
            />
          </div>

          {/* Score Breakdown */}
          <div className="text-center mt-2">
            <p className="text-2xl font-bold text-black">{correctCount}</p>
            <p className="text-gray-700 font-semibold">Corrected</p>
          </div>
          <div className="text-center mt-2">
            <p className="text-2xl font-bold text-black">{totalQuestions}</p>
            <p className="text-gray-700 font-semibold">Total Questions</p>
          </div>
        </div>

        {/* Right Section - Remarks & Insights */}
        <div className="w-full lg:w-1/2 px-2 lg:p-5">
          <h2 className="text-lg font-bold text-gray-800 italic">Remarks:</h2>
          <p className="text-green-500 text-md font-semibold italic">{aiResponse.motivationalNote}</p>

          {/* Strengths & Weaknesses */}
          <div className="mt-4">
            <h4 className="font-bold italic text-gray-800">Areas to Improve:</h4>
            <p className="text-red-500 font-semibold italic">{weaknesses.length > 0 ? weaknesses.join(", ").charAt(0).toUpperCase() + weaknesses.join(", ").slice(1).toLowerCase() : "You're doing great! Keep going!"}</p>
          </div>
 
          {/* Next Steps */}
          {aiResponse.nextSteps && (
            <div className="mt-4">
              <h4 className="font-bold text-gray-800 italic">Concentrate On:</h4>
              <ul className="text-yellow-500 list-disc list-inside font-semibold italic">
                {aiResponse.nextSteps.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Learning Paths */}
          {aiResponse?.learningPaths && (
            <div className="mt-4">
              <h4 className="font-bold text-gray-800 italic">AI Recommendations:</h4>
              <ul className="text-gray-700 list-decimal list-inside">
                {aiResponse.learningPaths.map((path: any, index: number) => (
                  <li key={index} className="mt-2">
                    <span className="font-semibold text-blue-600">{path.subject}</span> - {path.learningGoals[0]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back to Home */}
          <button
            className="mt-6 bg-[#BFE5F8] ml-20 lg:-ml-20 px-4 py-2 rounded-md hover:bg-blue-400 transition font-semibold"
            onClick={() => navigate("/courses")}
          >
            View Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;
