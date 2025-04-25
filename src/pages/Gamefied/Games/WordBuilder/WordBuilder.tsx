import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGameStore } from "../../../../store/useGameStore";
import { useAuthStore } from "../../../../store/useAuthStore";

const words = [
  "apple",
  "banana",
  "cherry",
  "orange",
  "grape",
  "mango",
  "strawberry",
  "pineapple",
  "blueberry",
  "watermelon",
  "kiwi",
  "papaya",
  "pear",
  "raspberry",
  "coconut",
  "guava",
];

const shuffleWord = (word: string) => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
export default function WordBuilder() {
  const [currentWord, setCurrentWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(100);
  const [message, setMessage] = useState("");
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const { submitGameSession } = useGameStore();
  const { user } = useAuthStore();
  const [startTime, setStartTime] = useState<number | null>(null);
  useEffect(() => {
    resetGame();
  }, []);

  const newRound = async (nextRound: number) => {
    if (nextRound === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (nextRound >= 10) {
      setGameOver(true);
      const timeTaken = startTime? Math.floor((Date.now() - startTime) / 1000): 0;

      console.log("Game Over. Submitting Score:", score);
      await submitGameSession({
        userId: user?._id || "",
        gameSlug: "word_builder",
        score,
        timeTaken,
      });
      return;
    }

    // Continue the game
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setShuffledWord(shuffleWord(word));
    setInput("");
    setMessage("");
  };

  const checkAnswer = () => {
    if (!input) return;

    if (input.toLowerCase() === currentWord.toLowerCase()) {
      setMessage("Correct");
      setScore((prev) => Math.max(0, prev + 10));
    } else {
      setMessage("Incorrect");
      setScore((prev) => Math.max(0, prev - 5));
    }

    const nextRound = round + 1;
    setRound(nextRound);
    setTimeout(() => newRound(nextRound), 1000);
  };

  const resetGame = () => {
    setScore(100);
    setGameOver(false);
    setStartTime(Date.now());
    setRound(1);
    newRound(1);
  };

  return (
    <div className="absolute left-0 top-0 w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a40] via-[#301934] to-[#0f0c29] text-white p-6 overflow-hidden">
      {/* Close Button */}
      <Link to="/games/allgames">
        <button className="cursor-pointer absolute top-5 left-5 text-3xl text-white hover:text-red-400 transition duration-300">
          <IoMdClose />
        </button>
      </Link>

      {/* Title */}
      <h1 className="text-6xl font-extrabold mb-12 text-neon-pink drop-shadow-[0_0_15px_rgba(255,105,180,0.8)] tracking-widest">
        Word Scramble
      </h1>

      {/* Game Container */}
      <div className="flex flex-col items-center w-[90%] max-w-3xl py-12 justify-center rounded-3xl bg-gradient-to-tr from-[#311b92] to-[#512da8] text-white p-8 shadow-[0_0_25px_rgba(0,255,255,0.5)] border-4 border-dashed border-cyan-400 relative overflow-hidden">
        {/* Round Indicator */}
        <p className="absolute top-4 right-4 text-xl font-bold text-lime-300 drop-shadow-[0_0_5px_rgba(0,255,0,0.6)]">
          Round {round} / 10
        </p>

        {/* Game Over State */}
        {gameOver ? (
          <>
            <p className="text-6xl font-extrabold text-yellow-300 drop-shadow-[0_0_15px_rgba(255,255,0,0.7)] animate-bounce">
              🎉 Game Over!
            </p>
            <p className="text-2xl mt-4 text-cyan-200 font-semibold">
              Final Score: {score}
            </p>
            <motion.button
              className="mt-8 bg-gradient-to-r from-red-500 to-orange-500 px-12 py-5 rounded-2xl shadow-[0_0_20px_rgba(255,0,0,0.8)] hover:from-red-700 hover:to-orange-600 transition-all duration-300 text-2xl font-bold text-white border-2 border-yellow-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
            >
              Play Again
            </motion.button>
          </>
        ) : (
          <>
            {/* Scrambled Word */}
            <p className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text px-12 py-6 rounded-2xl shadow-[0_0_15px_rgba(255,165,0,0.7)] tracking-widest border-4 border-dashed border-purple-500 text-center">
              {shuffledWord}
            </p>

            {/* Input Field */}
            <motion.input
              className="w-80 text-3xl text-black px-8 py-5 rounded-2xl bg-gradient-to-br from-white to-gray-200 outline-none border-4 border-solid border-lime-400 focus:border-lime-600 text-center font-bold tracking-wider shadow-[0_0_15px_rgba(0,255,0,0.6)] placeholder-gray-500 transition duration-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              placeholder="Type the Word!"
              whileFocus={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0,255,255,0.8)",
              }}
            />

            {/* Feedback Message */}
            <p
              className={`mt-6 text-3xl font-bold ${
                message.includes("Correct") ? "text-green-400" : "text-red-500"
              } drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
            >
              {message}
            </p>

            {/* Submit Button */}
            <motion.button
              className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.7)] hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 text-xl font-bold border-2 border-white"
              whileTap={{ scale: 0.9 }}
              onClick={checkAnswer}
            >
              Submit
            </motion.button>
          </>
        )}
      </div>

      {/* Score Display */}
      <p className="mt-6 text-2xl font-bold text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,0,0.7)]">
        🌟 Score: {score}
      </p>
    </div>
  );
}
