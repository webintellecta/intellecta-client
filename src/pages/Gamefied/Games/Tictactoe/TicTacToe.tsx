import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useGameStore } from "../../../../store/useGameStore";

const initialBoard = Array(9).fill(null);
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const { user } = useAuthStore();
  const { submitGameSession } = useGameStore();

  const [board, setBoard] = useState<string[]>(initialBoard);
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningCombo, setWinningCombo] = useState<number[]>([]);
  const [xScore, setXScore] = useState<number>(0);
  const [oScore, setOScore] = useState<number>(0);
  const [mode, setMode] = useState<"AI" | "PVP" | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const checkWinner = (newBoard: (string | null)[])=> {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinningCombo(combo);
        return newBoard[a];
      }
    }
    return newBoard.includes(null) ? null : "Draw";
  };

  const handleClick = async(index: number) => {
    if (board[index] || winner) return;
    if (!startTime) setStartTime(Date.now());

    const newBoard: string[] = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      const timeTaken = startTime
        ? Math.floor((Date.now() - startTime) / 1000)
        : 0;
      setWinner(result);
      if (result === "X") setXScore((prev) => prev + 1);
      if (result === "O") setOScore((prev) => prev + 1);
      if (mode === "AI" && result === "X") {
        await submitGameSession({ 
          userId: user?._id || "",
          gameSlug:"tic_tac_toe",
          score: 50,
          timeTaken
        });
      }
    } else {
      const nextTurnIsX = !isXTurn;
      setIsXTurn(nextTurnIsX);
      if (mode === "AI" && !nextTurnIsX) {
        setTimeout(() => aiMove(newBoard), 500);
      }
    }
  };

  const aiMove = async(currentBoard: string[]) => {
    const emptyIndices: number[] = currentBoard
      .map((val, idx) => (val === null ? idx : -1))
      .filter((val) => val !== -1);

    if (emptyIndices.length === 0 || winner) return;

    const randomIdx =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard: string[] = [...currentBoard];
    newBoard[randomIdx] = "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      const timeTaken = startTime
        ? Math.floor((Date.now() - startTime) / 1000)
        : 0;
        await submitGameSession({ 
          userId: user?._id || "",
          gameSlug:"tic_tac_toe",
          score: 50,
          timeTaken
        });

      setWinner(result);
      if (result === "O") setOScore((prev) => prev + 1);
    } else {
      setIsXTurn(true);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
    setWinner(null);
    setStartTime(null);
    setWinningCombo([]);
    setMode(null);
  };

  const handleModeChange = (newMode: "AI" | "PVP") => {
    resetGame();
    setMode(newMode);
    setStartTime(Date.now());
  };

  

  const renderWinningLine = () => {
    if (winningCombo.length === 0) return null;
    const getLineClass = () => {
      const comboString = winningCombo.sort().toString();
      switch (comboString) {
        case "0,1,2":
          return "w-full h-1 top-[15%] left-0";
        case "3,4,5":
          return "w-full h-1 top-1/2 left-0";
        case "6,7,8":
          return "w-full h-1 top-[85%] left-0";
        case "0,3,6":
          return "h-full w-1 left-[15%] top-0";
        case "1,4,7":
          return "h-full w-1 left-1/2 top-0";
        case "2,5,8":
          return "h-full w-1 right-[15%] top-0";
        case "0,4,8":
          return "w-[140%] h-1 rotate-45 top-1/2 left-[-20%]";
        case "2,4,6":
          return "w-[140%] h-1 -rotate-45 top-1/2 left-[-20%]";
        default:
          return "";
      }
    };

    return (
      <div
        className={`absolute bg-yellow-400 rounded-xl z-10 ${getLineClass()}`}
      ></div>
    );
  };
  return (
    <div className="absolute left-0 top-0 w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <Link to="/games/allgames">
        <button className="cursor-pointer absolute top-5 left-5 text-2xl font-semibold">
          <IoMdClose />
        </button>
      </Link>
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Tic Tac Toe
      </motion.h1>

      {mode === null ? (
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            onClick={() => handleModeChange("PVP")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-2 py-3 rounded-xl shadow-2xl w-72 text-lg font-semibold transition-all duration-200"
          >
            Play with Another Player
          </motion.button>
          <motion.button
            onClick={() => handleModeChange("AI")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-2 py-3 rounded-xl shadow-2xl w-72 text-lg font-semibold transition-all duration-200"
          >
            Play with AI
          </motion.button>
        </div>
      ) : (
        <div className="mb-4 text-lg font-medium text-gray-300">
          Selected Mode:{" "}
          <span className="text-yellow-400 font-bold">
            {mode === "AI" ? "AI (Single Player)" : "PVP (Two Players)"}
          </span>
        </div>
      )}

      {mode && (
        <div className="mb-4 text-xl">
          {mode === "AI"
            ? isXTurn
              ? "Turn: You"
              : "Turn: AI"
            : isXTurn
            ? "Turn: Player X"
            : "Turn: Player O"}
        </div>
      )}

      <div className="flex gap-10 mb-4 text-lg">
        <div>
          {mode === "AI" ? "You" : "Player X"}: {xScore}
        </div>
        <div>
          {mode === "AI" ? "AI" : "Player O"}: {oScore}
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-4">
        {renderWinningLine()}
        {board.map((cell, index) => (
          <motion.div
            key={index}
            onClick={() => handleClick(index)}
            className={`${
              cell === "X" ? "text-blue-300" : "text-red-400"
            } w-24 h-24 bg-gray-700 hover:bg-gray-600 border-2 border-gray-500 flex items-center justify-center text-3xl font-bold rounded-2xl shadow-xl cursor-pointer transition duration-200`}
            whileTap={{ scale: 0.9 }}
          >
            {cell}
          </motion.div>
        ))}
      </div>

      {winner && (
        <motion.div
          className="mt-6 text-2xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
        </motion.div>
      )}
      <button
        onClick={resetGame}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow-lg"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
