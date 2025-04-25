import { Link } from "react-router-dom";

export interface leaderboardData {
  userId: string;
  bestScore: null;
  totalTimePlayed: number;
  gamesPlayed: number;
  totalScore: number;
  lastPlayedGame: string;
  lastPlayedDate: Date | null;
  user: {
    name: string;
    profilePic: string;
  };
}
interface LeaderboardProps {
  leaderboard: leaderboardData[] | null;
  leaderboardLoading: boolean;
}

export const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
};

const LeaderboardPreview: React.FC<LeaderboardProps> = ({
  leaderboard,
  leaderboardLoading,
}) => {
  return (
    <div className="mt-10">
      <div className="flex items-center w-full mx-auto my-4">
        <div className="flex-grow h-px bg-white/30"></div>
        <div className="px-4 text-white text-lg font-semibold text-center">
          Top Players
        </div>
        <div className="flex-grow h-px bg-white/30"></div>
      </div>

      <div className={`mt-10 w-full overflow-x-auto bg-[#0f1f4c] p-5 rounded-xl shadow-lg`}>
        <table className="w-[200%] md:w-full text-sm text-white/90 table-auto">
          <thead>
            <tr className="border-b border-white/20">
              <th className="pb-3 text-left w-1/12">Rank</th>
              <th className="pb-3 text-left w-1/4">Player</th>
              <th className="pb-3 text-left w-1/5">Total Time Played</th>
              <th className="pb-3 text-left w-1/5">Last Played</th>
              <th className="pb-3 text-right w-1/5">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardLoading ? (
              <div className="md:ml-96 ml-20 flex items-center justify-around w-full">
                <div className="loader">
                  <div className="loader__bar"></div>
                  <div className="loader__bar"></div>
                  <div className="loader__bar"></div>
                  <div className="loader__bar"></div>
                  <div className="loader__bar"></div>
                  <div className="loader__ball"></div>
                </div>
              </div>
            ) : leaderboard && leaderboard.length > 0 ? (
              leaderboard
                ?.slice(0, 3)
                ?.map((data: leaderboardData, index: number) => (
                  <tr key={index}>
                    <td className="py-3 px-2 align-middle ">#{index + 1}</td>

                    <td className="py-3 px-2 align-middle">
                      <div className="flex items-center gap-2">
                        <img
                          src={data?.user?.profilePic || "/home-bg.png"}
                          alt="Player"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span>{data?.user?.name}</span>
                      </div>
                    </td>

                    <td className="py-3 px-2 align-middle">
                      {formatTime(data.totalTimePlayed)}
                    </td>
                    <td className="py-3 px-2 align-middle">
                      {data.lastPlayedDate &&
                        new Date(data.lastPlayedDate).toLocaleDateString()}
                    </td>
                    <td className=" py-3 px-2 text-right align-middle">
                      {data.totalScore && Math.floor(data.totalScore) || 0}
                    </td>
                  </tr>
                ))
            ) : (
              "No data found"
            )}
          </tbody>
        </table>
      </div>
      <div className="md:mt-6 mt-2 flex justify-end">
        <Link
          to="/games/leaderboard"
          className="text-indigo-400 hover:text-indigo-300 transition font-medium text-sm"
        >
          View Full Leaderboard &rarr;
        </Link>
      </div>
    </div>
  );
};

export default LeaderboardPreview;
