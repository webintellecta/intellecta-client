import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGameStore } from "../../../../store/useGameStore";
import { useAuthStore } from "../../../../store/useAuthStore";

const enemies = [
  { id: 1, name: "Goblin", hp: 10, emoji: "👹" },
  { id: 2, name: "Ogre", hp: 15, emoji: "🧌" },
  { id: 3, name: "Dragon", hp: 20, emoji: "🐉" },
  { id: 4, name: "Pheonix", hp: 30, emoji: "🐦‍🔥" },
];

const generateMathProblem = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;

  const operations = ["+", "-", "*", "/"];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let question, answer;

  switch (operation) {
    case "+":
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case "-":
      question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
      answer = Math.max(num1, num2) - Math.min(num1, num2);
      break;
    case "*":
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case "/":
      const dividend = num1 * num2;
      question = `${dividend} ÷ ${num1}`;
      answer = num2;
      break;
    default:
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
  }
  return {question,answer};
};

const NumberNinja = () => {
  const [mathProblem, setMathProblem] = useState(generateMathProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [shake, setShake] = useState(false);
  const [enemy, setEnemy] = useState(enemies[Math.floor(Math.random() * enemies.length)]);
  const [enemyHp, setEnemyHp] = useState(enemy.hp);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const {submitGameSession} = useGameStore()
  const {user} = useAuthStore()

  useEffect(() => {
    if (enemyHp <= 0) {
      setScore((prevScore) => prevScore + 1);
  
      let newEnemy;
      do {
        newEnemy = enemies[Math.floor(Math.random() * enemies.length)];
      } while (newEnemy.id === enemy.id);
  
      setEnemy(newEnemy);
      setEnemyHp(newEnemy.hp);
      setMathProblem(generateMathProblem());
    }
  }, [enemyHp]);
  
  useEffect(() => {
    const submitSession = async () => {
      if (score >= 3 && startTime && user?._id) {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        await submitGameSession({
          userId: user._id,
          timeTaken,
          gameSlug: "number_ninja",
          score: score * 20
        });
        setScore(0)
        setStartTime(null)
        setStreak(0)
      }
    };
  
    submitSession();
  }, [score]);
  

  const handleAnswerSubmit = () => {
    if (userAnswer === "") return;
    if(!startTime) setStartTime(Date.now())
    if (parseInt(userAnswer) === mathProblem.answer) {
      if (shake) {
        setShake(false);
      }
      setEnemyHp((prevHp) => prevHp - enemy.hp * 0.25);
      setStreak((prevStreak) => prevStreak + 1);
      setMathProblem(generateMathProblem());
    } else {
      setShake(false);
      setTimeout(() => {
        setShake(true);
      }, 10);

      setStreak(0);
    }
    setUserAnswer("");
  };

  return (
    <div className="absolute left-0 top-0 w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <Link to="/games/allgames">
        <button className="cursor-pointer absolute top-5 left-5 text-2xl font-semibold">
          <IoMdClose />
        </button>
      </Link>
      <h1 className="text-4xl font-bold mb-4">⚔️ Number Ninja ⚔️</h1>
      <div className="text-2xl">Defeat enemies by solving math problems!</div>

      <div
        className={`${
          shake ? "shake" : ""
        } border-2 border-amber-600 h-44 w-64 bg-gray-400 rounded-lg mt-5 shadow-lg text-center relative overflow-hidden`}
      >
        <div
          className="absolute top-0 left-0 h-full bg-red-700  transition-all duration-300"
          style={{ width: `${(enemyHp / enemy.hp) * 100}%` }}
        ></div>

        <div className="relative z-10 p-5">
          <div className="text-6xl">{enemy.emoji}</div>
          <h2 className="text-xl font-bold mt-4">{enemy.name}</h2>
          <div className="text-red-200 font-semibold">
            HP: {(enemyHp / enemy.hp) * 100}%
          </div>
        </div>
      </div>

      <div className="mt-6 text-xl">Solve: {mathProblem.question}</div>
      <input
        type="number"
        value={userAnswer}
        onKeyDown={(e) => {
          if (e.key === "Enter" && userAnswer !== "") {
            handleAnswerSubmit();
          }
        }}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="mt-2 p-2 rounded border border-white text-white"
      />
      <button
        className="mt-5 cursor-pointer pushable"
        onClick={handleAnswerSubmit}
      >
        Attack
      </button>

      <div className="mt-4">
        Score: {score} | Streak: {streak}
      </div>
    </div>
  );
};

export default NumberNinja;
