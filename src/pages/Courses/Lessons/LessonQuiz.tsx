import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NavbarWelcome from "../../../components/Navbar/NavbarWelcome";
import QuizCompleted from "../../../utils/ui/QuizCompleted";
import SpinningLoader from "../../../components/Loaders/SpinningLoader";
import axiosInstance from "../../../utils/axiosInstance";

type Params = {
  courseId?: string;
};

interface currentQsType {
  correctAnswer: string;
}

interface QuizDataType {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subject: string;
  difficulty: string;
}

interface UpdateScoreType {
  courseId: string | undefined;
  score: number;
  totalQuestions: number;
}

const LessonQuiz = () => {
  const { courseId = "" } = useParams<Params>();
  const queryClient = useQueryClient();
  const [showCompleted, setShowCompleted] = useState(false);
  const [quiz, setQuiz] = useState<QuizDataType[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [stepResults, setStepResults] = useState(
    Array(quiz?.length).fill(null)
  );
  const steps = quiz?.length || 0;

  const { mutate: postLessonQuiz, isPending } = useMutation({
    mutationFn: async (courseId: string) => {
      const res = await axiosInstance.post(
        `/courses/generate-quiz`,
        {courseId}
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizLesson"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: quizData, isLoading } = useQuery({
    queryKey: ["quizLesson", courseId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/courses/fetch-quiz/${courseId}`
      );
      return res.data.quiz || [];
    },
    enabled: !!courseId,
  });

  useEffect(() => {
    if (quizData) {
      const shuffled = [...quizData].sort(() => Math.random() - 0.5);
      setQuiz(shuffled);
    }
  }, [quizData]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const currentQuestion: currentQsType = quiz[currentStep];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const newStepResults = [...stepResults];
    newStepResults[currentStep] = isCorrect;
    setStepResults(newStepResults);

    setSelectedOption(null);

    if (currentStep < steps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const { mutate: updateScore } = useMutation({
    mutationFn: async (values: UpdateScoreType) => {
      const res = await axiosInstance.post(
        "/progress/update/quiz-score",
        values,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleSubmitScore = async () => {
    setShowCompleted(true);
    const currentQuestion: currentQsType = quiz[currentStep];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const finalScore = ((score + (isCorrect ? 1 : 0)) / steps) * 100;
    const newStepResults = [...stepResults];
    newStepResults[currentStep] = isCorrect;
    updateScore({ courseId, score: finalScore, totalQuestions: quiz.length });
    setStepResults(newStepResults);
  };

  return (
    <>
      <NavbarWelcome />
      {isPending && (
        <div className="absolute w-screen z-20 flex justify-center items-center min-h-screen bg-white bg-opacity-30">
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 shadow-2xl flex flex-col items-center justify-center text-white text-lg font-semibold relative animate-spin-slow hover:scale-110 transition-transform duration-300">
            <span className="text-4xl animate-pulse">🤖</span>
            <span className="mt-2">Generating Quiz</span>
            <div className="flex space-x-1 mt-2">
              <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
              <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
            </div>
          </div>
        </div>
      )}

      {quiz.length <= 0 ? (
        <div className="min-h-screen flex justify-center items-center px-6 py-8 relative overflow-hidden">
          <button
            onClick={() => postLessonQuiz(courseId)}
            className="w-fit bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Generate Quiz
          </button>
        </div>
      ) : isLoading && !isPending ? (
        <div className="flex justify-center h-[80vh] items-center">
          <SpinningLoader />
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col mt-20 px-6 py-8 relative overflow-hidden">
          <div className="flex items-center justify-between mx-auto w-fit space-x-4 relative mb-10 z-10">
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300 z-0 rounded" />
            {[...Array(steps)].map((_, index) => {
              const result = stepResults[index];
              return (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition duration-300 ${
                    result === undefined
                      ? "bg-gray-200 border-gray-400"
                      : result
                      ? "bg-green-500 border-green-500 shadow-lg"
                      : "bg-red-500 border-red-500 shadow-lg"
                  }`}
                >
                  {result === null ? (
                    <span className="text-gray-600 font-bold">{index + 1}</span>
                  ) : result ? (
                    <IoCheckmarkOutline className="text-white text-xl" />
                  ) : (
                    <IoClose className="text-white text-xl" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mb-2">
            <p className="text-lg font-semibold">
              Score: {score}/{steps}
            </p>
          </div>

          <div className="flex flex-col items-center text-center z-10">
            <h1 className="text-xl font-semibold mb-6">
              {quiz && quiz[currentStep]?.question}
            </h1>

            <div className="grid grid-cols-2 gap-4">
              {quiz &&
                quiz[currentStep]?.options.map((ans, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(ans)}
                    className={`px-6 py-3 cursor-pointer border rounded-lg shadow transition duration-200 ${
                      selectedOption === ans
                        ? "bg-green-100 border-green-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {ans}
                  </button>
                ))}
            </div>
          </div>

          <div className="flex justify-center z-10 space-x-4 mt-6">
            {currentStep < steps - 1 ? (
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className={` group relative inline-block cursor-pointer bg-black rounded-[0.75em] font-bold text-[17px]`}
              >
                <span className={`${selectedOption === null ? "bg-[#e8e8e8]" : "bg-[#1ea956] text-white"} block box-border border-2 border-black rounded-[0.75em] px-6 py-3  text-black transform transition-transform duration-100 ease-in-out group-hover:-translate-y-1 group-active:translate-y-0`}>
                  Next
                </span>
              </button>
            ) : (
              <button
                onClick={handleSubmitScore}
                disabled={selectedOption === null}
                className="group relative inline-block cursor-pointer bg-black rounded-[0.75em] font-bold text-[17px]"
              >
                <span className="block box-border border-2 border-black rounded-[0.75em] px-6 py-3 bg-[#22b433] text-white transform transition-transform duration-100 ease-in-out group-hover:-translate-y-1 group-active:translate-y-0">
                  Submit
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {showCompleted && (
        <QuizCompleted
          score={score}
          totalQuestions={quiz.length || 0}
          setShowCompleted={setShowCompleted}
        />
      )}
    </>
  );
};

export default LessonQuiz;
