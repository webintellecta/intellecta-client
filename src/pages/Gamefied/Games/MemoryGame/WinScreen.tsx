interface WinScreenProps {
  moves: number;
  onRestart: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ moves, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full animate-bounce-in">
        <h2 className="text-4xl font-bold text-purple-700 mb-4">🎉 You Won!</h2>
        <p className="text-lg text-gray-700 mb-6">
          You completed the game in <span className="font-bold">{moves}</span> moves!
        </p>
        <button
          onClick={onRestart}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-lg shadow"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
