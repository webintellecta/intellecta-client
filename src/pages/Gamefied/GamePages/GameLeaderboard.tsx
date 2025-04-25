import { useGameStore } from "../../../store/useGameStore";
import { formatTime, leaderboardData } from "./LeaderboardPreview";

const LeaderboardPreview = () => {
  const { leaderboard, leaderboardLoading } = useGameStore();  
  console.log(leaderboard);
  

  return (
    <div className=" md:w-full overflow-x-auto">
      <div className="min-h-screen md:mx-36 mx-4 py-10 w-[200%] md:w-auto">
        <div className="flex items-center w-full mx-auto mb-8">
          <div className="flex-grow h-px bg-white/30 "></div>
          <div className="px-4 text-white text-3xl font-bold text-center">
            Leaderboard
          </div>
          <div className="flex-grow h-px bg-white/30"></div>
        </div>

        {leaderboardLoading ? (
          <div className="flex justify-center items-center ">
            <div className="loader">
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__ball"></div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto max-h-[800px] custom-scrollbar overflow-y-auto bg-[#0f1f4c] rounded-2xl shadow-2xl">
            <table className=" w-full text-white/90 table-auto border-collapse">
              <thead>
                <tr className="sticky top-0 bg-[#0a173b] border-b border-white/20 text-lg">
                  <th className="p-4 text-left w-1/12">Rank</th>
                  <th className="p-4 text-left w-1/4">Player</th>
                  <th className="p-4 text-left w-1/5">Total Time Played</th>
                  <th className="p-4 text-left w-1/5">Last Played</th>
                  <th className="p-4 text-right w-1/5">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard
                  ?.slice(0, 3)
                  ?.map((data: leaderboardData, index: number) => (
                    <tr key={index}>
                      <td className="py-3 px-3 align-middle ">#{index + 1}</td>

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

                      <td className="py-3 px-4 align-middle">
                        {formatTime(data.totalTimePlayed)}
                      </td>
                      <td className="py-3 px-4 align-middle">
                        {data.lastPlayedDate &&
                          new Date(data.lastPlayedDate).toLocaleDateString()}
                      </td>
                      <td className=" py-3 px-5 text-right">
                        {data.totalScore && Math.floor(data.totalScore) || 0}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPreview;
