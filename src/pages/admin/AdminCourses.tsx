import { HoverEffect } from "../../utils/ui/courseCards";
import { Filter, X, SearchIcon } from "lucide-react";
import AddCourseButton from "../../utils/ui/addcourseButton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AllStudentsLoader from "../../utils/ui/allStudentsLoader";

interface Course {
  _id: string;
  title: string;
  subject: string;
  description: string;
  gradeLevel?: number;
  thumbnail?: string;
}

interface CourseResponse {
  courses: Course[];
  pagination: {
    totalCourses: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const fetchAllCourses = async (
  page: number,
  grade: string,
  subject: string,
  search: string
): Promise<CourseResponse> => {
  console.log(grade);
  const response = await axios.get(
    `https://intellecta-content-service.onrender.com/api/courses?page=${page}&limit=6&grade=${grade}&subject=${subject}&search=${search}`
  );
  console.log(response.data);
  return response.data.data;
};

const AdminCoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGrade(e.target.value);
  };

  const handleSearchClick = () => {
    setSearch(searchInput);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["courses", currentPage, grade, subject, search],
    queryFn: () => fetchAllCourses(currentPage, grade, subject, search),
  });

  const transformedCourses = data?.courses.map((course: Course) => ({
    _id: course._id,
    title: course.title,
    thumbnail: course.thumbnail || "https://via.placeholder.com/150",
    gradeLevel: course.gradeLevel ?? 0,
    description: course.description,
    link: `/admin/courses/${course._id}`,
  })) ?? [];


  return (
    <>
      {isLoading ?  <div className="flex justify-center items-center h-[75vh]">
          <AllStudentsLoader />
        </div> :
        <div className="px-6 max-h-[75vh] overflow-y-auto relative scrollbar-hidden">
          <div className="flex justify-between">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Filter />
              <button className="cursor-pointer">Add filter</button>
            </div>

            {isOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50 h-13/14">
                <div
                  className="flex justify-end"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <button className="cursor-pointer">
                    <X />
                  </button>
                </div>
                {/* Your dropdown content here */}
                <p className="text-gray-700 font-bold">Filter Courses</p>
                {/* Example filter options */}
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      className="w-full  border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#999]"
                      value={subject}
                      onChange={handleSubjectChange}
                    >
                      <option value="">Select Subject</option>
                      <option value="maths">Math</option>
                      <option value="science">Science</option>
                      <option value="english">English</option>
                      <option value="coding">Coding</option>
                      <option value="history">History</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <select
                      className="w-full  border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#999]"
                      value={grade}
                      onChange={handleGradeChange}
                    >
                      <option value="">Select Grade</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      {/* Add more grades as needed */}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div>
              <AddCourseButton />
            </div>
          </div>
          <br />
          <div className="flex items-center gap-2">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6a6969]"
            />
            <button
              className="bg-[#5faba5] text-white p-2 rounded-lg hover:bg-[#40595c]"
              onClick={handleSearchClick}
            >
              <SearchIcon />
            </button>
          </div>
          <div>
            <HoverEffect items={transformedCourses} />
          </div>
          <div className="flex justify-center gap-4 my-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={!data?.pagination.hasPrevPage}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold mt-2">
              Page {data?.pagination.currentPage} of {data?.pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  data?.pagination.hasNextPage ? prev + 1 : prev
                )
              }
              disabled={!data?.pagination.hasNextPage}
              className="px-4 py-2 bg-blue-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default AdminCoursesPage;
