import React from "react";
import SpinningLoader from "../../components/Loaders/SpinningLoader";

type PropType = {
  topPerfomers: {
    totalLessons: number;
    user: {
      name: string;
    };
  }[];
  topStudentsLoading: boolean;
};

export const TopPerformingStudentsCard: React.FC<PropType> = ({
  topPerfomers,
  topStudentsLoading,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full col-span-6 min-h-60">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Top Performing Students
      </h2>
      {topStudentsLoading ? (
        <div className="relative flex justify-center items-center mt-20">
          <SpinningLoader />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center text-sm text-gray-500 font-semibold pb-3 border-b border-gray-200">
            <div className="flex gap-8">
              <span>Rank</span>
              <span>Name</span>
            </div>
            <span>Lessons Completed</span>
          </div>

          <ul className="divide-y divide-gray-100">
            {topPerfomers?.map((student, index) => (
              <li
                key={student?.user?.name}
                className="flex justify-between items-center py-3"
              >
                <div className="flex items-center gap-8">
                  <span className="text-gray-600 font-medium">
                    #{index + 1}
                  </span>
                  <span className="text-gray-800 font-semibold">
                    {student?.user?.name}
                  </span>
                </div>
                <span className="text-emerald-500 font-semibold">
                  {student?.totalLessons}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
