import { useNavigate } from "react-router-dom";

interface QuizCompletedProps {
    score: number;
    totalQuestions: number;
    setShowCompleted: (val: boolean)=> void
  }
  
  const QuizCompleted = ({ score, totalQuestions, setShowCompleted }: QuizCompletedProps) => {
    const navigate = useNavigate()
    const handleClose = ()=> {
      setShowCompleted(false)
      navigate("/courses")
    }
    const percentage = Math.round((score / totalQuestions) * 100);
    const message =
      percentage >= 80
        ? "Fantastic job! You're a quiz master! 🧠"
        : percentage >= 50
        ? "Great effort! Keep practicing and you’ll get even better! 💪"
        : "Don't worry, you're learning something new every time! 🚀";
  
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
        <div className="relative w-full max-w-4xl bg-white text-gray-800 p-10 rounded-2xl shadow-2xl text-center min-h-[500px] flex flex-col justify-center">
          <button
            className="absolute cursor-pointer top-4 right-4 text-gray-600 text-2xl hover:text-gray-800"
            onClick={handleClose}
          >
            &times;
          </button>
  
          {/* Icon */}
          <div className="inline-flex items-center justify-center mb-6 mx-auto">
            <span className="text-[80px]">🎉</span>
          </div>
  
          <h4 className="text-4xl font-bold mb-2">Quiz Completed!</h4>
          <p className="text-lg mb-4">
            You got <span className="text-green-600 font-bold">{score}</span> out of{" "}
            <span className="text-green-600 font-bold">{totalQuestions}</span> questions correct.
          </p>
  
          <p className="text-md text-gray-600 italic mb-8">{message}</p>
  
          <button
            onClick={handleClose}
            className="inline-block mx-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            Continue Learning
          </button>
        </div>
      </div>
    );
  };
  
  export default QuizCompleted;
  