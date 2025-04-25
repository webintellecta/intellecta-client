import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../../../../store/useAuthStore";
import SpinningLoader from "../../../../components/Loaders/SpinningLoader";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useGameStore } from "../../../../store/useGameStore";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function GeographyQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const { user } = useAuthStore();
  const { submitGameSession } = useGameStore();

  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["fetchGeographyQuestion"],
    queryFn: async () => {
      if (questionCount >= 10) return null; // Stop fetching after 10 questions
      const res = await axios.get(
        "https://the-trivia-api.com/api/questions?categories=geography&limit=10"
      );
      if (res.data.length > 0) {
        const q = res.data[0];
        return {
          question: q.question,
          correct_answer: q.correctAnswer, // Ensure correct property name
          incorrect_answers: q.incorrectAnswers || [], // Ensure incorrect_answers exists
        };
      }
      return null;
    },
    enabled: questionCount < 10, // Disable query after 10 questions
  });

  const question = data as Question | null;

  useEffect(() => {
    if (question) {
      setShuffledAnswers(
        shuffleArray([question.correct_answer, ...question.incorrect_answers])
      );
    }
  }, [question]);

  useEffect(() => {
    if (questionCount === 10 && quizFinished) {
      const timeTaken = startTime
        ? Math.floor((Date.now() - startTime) / 1000)
        : 0;
         submitGameSession({
          userId: user?._id || "",
          gameSlug: "word_builder",
          score: score * 10,
          timeTaken,
        });
      setStartTime(null);
      setTimeout(() => {
        setScore(0);
        setQuizFinished(false);
        setQuestionCount(0);
      }, 3000);
    }
  }, [quizFinished]);

  function shuffleArray(array: string[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const handleAnswer = (answer: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setSelectedAnswer(answer);
    if (answer === question?.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      refetch();
      setSelectedAnswer(null);
      setQuestionCount((prevCount) => {
        if (prevCount + 1 === 10) {
          setQuizFinished(true);
        }
        return prevCount + 1;
      });
    }, 1000);
  };


  return (
    <div className="absolute left-0 top-0 w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
        <Link to="/games/allgames">
        <button className="cursor-pointer absolute top-5 left-5 text-2xl font-semibold">
          <IoMdClose />
        </button>
      </Link>
      <div className="w-full max-w-xl h-[400px] p-6 shadow-2xl rounded-xl bg-gray-800 text-center">
        <h1 className="text-3xl font-extrabold mb-6 text-yellow-400">
          Geography Quiz
        </h1>

        {quizFinished ? (
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">Quiz Completed!</p>
            <p className="text-xl font-semibold mt-2 text-yellow-300">
              Final Score: {score}/10
            </p>
          </div>
        ) : isLoading || isFetching ? (
          <div className="flex items-center justify-center mt-28 ">
            <SpinningLoader />
          </div>
        ) : (
          <>
            <p className="text-lg font-semibold my-4 text-blue-300">
              {question?.question}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {shuffledAnswers.map((answer) => (
                <motion.button
                  key={answer}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 border cursor-pointer rounded-lg text-center text-white transition duration-200 text-lg font-semibold shadow-lg ${
                    selectedAnswer
                      ? answer === question?.correct_answer
                        ? "bg-green-500"
                        : answer === selectedAnswer
                        ? "bg-red-500"
                        : "bg-gray-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => handleAnswer(answer)}
                  disabled={!!selectedAnswer}
                >
                  {answer}
                </motion.button>
              ))}
            </div>
            <p className="text-center mt-6 text-xl font-bold text-yellow-400">
              Score: {score}
            </p>
            <p className="text-sm mt-2 text-gray-400">
              Question {questionCount + 1} of 10
            </p>
          </>
        )}
      </div>
    </div>
  );
}
