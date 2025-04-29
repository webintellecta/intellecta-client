import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCourseDetails, Lesson } from "../services/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LessonForm from "./LessonForm";
import AllStudentsLoader from "../../../utils/ui/allStudentsLoader";
import axiosInstance from "../../../utils/axiosInstance";
import { IoChevronBackOutline } from "react-icons/io5";

const EditCourseForm = () => {
  const { courseId } = useParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["editcourse", courseId],
    queryFn: () => fetchCourseDetails(courseId || ""),
    enabled: !!courseId,
  });

  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
  const [deletedLessonIds, setDeletedLessonIds] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null); // Video file state
  const [course, setCourse] = useState({
    _id: "",
    title: "",
    subject: "",
    description: "",
    gradeLevel: 0,
    difficultyLevel: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (data?.course) {
      setCourse({
        _id: data.course._id || "",
        title: data.course.title || "",
        subject: data.course.subject || "",
        description: data.course.description || "",
        gradeLevel: Number(data.course.gradeLevel) || 0,
        difficultyLevel: data.course.difficultyLevel || "",
        thumbnail: data.course.thumbnail || "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.lessons) {
      setCourseLessons(data?.lessons);
    }
  }, [data]);

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse({ ...course, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleLessonChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!courseLessons) {
      return null;
    }
    const updatedLessons = [...courseLessons];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [e.target.name]: e.target.value,
    };

    setCourseLessons(updatedLessons);
  };

  const [lessonVisibility, setLessonVisibility] = useState<boolean[]>(
    (data && data?.lessons?.map(() => true)) || []
  );

  const handleSave = async () => {
    try {
      await axiosInstance.put(
        `/courses/editCourse/${course._id}`,
        course
      );
      toast.success("course updated successfully!");

      if (courseLessons?.length) {
        await Promise.all(
          courseLessons.map(async (lesson) => {
            const formData = new FormData();

            if (videoFile) {
              formData.append("video", videoFile);
            }

            if (lesson._id) {
              formData.append("lessonData", JSON.stringify(lesson));
              await axiosInstance.put(
                `/lessons/editLesson/${lesson._id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
              );
            } else {
              const {
                title = "",
                content = "",
                resources = [],
                notes = [],
                order = 0,
              } = lesson;

              formData.append("title", title);
              formData.append("content", content);
              formData.append("type", "video");
              formData.append("order", order.toString());
              formData.append("resources", JSON.stringify(resources));
              formData.append("notes", JSON.stringify(notes));
              formData.append("courseId", courseId || "");

              await axiosInstance.post(
                `/lessons`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
              );
              toast.success("lessons updated successfully!");
            }
          })
        );
      }

      if (deletedLessonIds.length > 0) {
        await Promise.all(
          deletedLessonIds.map((id) =>
            axiosInstance.delete(`/lessons/${id}`)
          )
        );
        toast.success("lessons deleted successfully!");
      }
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      queryClient.invalidateQueries({ queryKey: ["editcourse"] });
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save changes");
    }
  };

  const addLesson = () => {
    setCourseLessons((prevLessons) => {
      const newLesson = {
        title: "",
        url: "",
        content: "",
        type: "",
        notes: "",
        resources: [],
        order: prevLessons.length + 1,
      };

      const updatedLessons = [...prevLessons, newLesson];
      setLessonVisibility(
        updatedLessons.map((_, index) => index === updatedLessons.length - 1)
      );

      return updatedLessons;
    });
  };

  const removeLesson = (index: number) => {
    if (!courseLessons?.length || !lessonVisibility) return;

    const lessonToRemove = courseLessons[index];
    if (lessonToRemove._id) {
      setDeletedLessonIds((prev) => [...prev, lessonToRemove._id as string]);
    }

    const updatedLessons = courseLessons.filter((_, i) => i !== index);
    const updatedVisibility = lessonVisibility.filter((_, i) => i !== index);
    setCourseLessons(updatedLessons);
    setLessonVisibility(updatedVisibility);
  };

  const toggleLessonVisibility = (index: number) => {
    const updated = [...lessonVisibility];
    updated[index] = !updated[index];
    setLessonVisibility(updated);
  };

  return (
    <>
      {!isLoading && (
        <Link to="/admin/courses">
          <button className="absolute ml-44 z-10 cursor-pointer mt-5 text-4xl text-slate-600 hover:text-slate-800">
            <IoChevronBackOutline />
          </button>
        </Link>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-[75vh]">
          <AllStudentsLoader />
        </div>
      ) : (
        <div className="relative flex items-center justify-center min-h-screen p-4 mb-10">
          <div
            ref={scrollRef}
            className="w-full max-w-5xl max-h-[80vh] scrollbar-hide overflow-y-auto rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md p-8 shadow-xl scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent"
          >
            <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 uppercase tracking-wide">
              Edit Course
            </h2>

            {/* Course Info */}
            <div className="space-y-4 border border-indigo-300 bg-indigo-100 rounded-2xl p-6 mb-6">
              {[
                {
                  label: "Course Title",
                  name: "title",
                  type: "text",
                  value: course.title,
                },
                {
                  label: "Subject",
                  name: "subject",
                  type: "text",
                  value: course.subject,
                },
                {
                  label: "Description",
                  name: "description",
                  type: "text",
                  value: course.description,
                },
              ].map(({ label, name, type, value }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-indigo-800 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleCourseChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="w-full rounded-xl bg-white border border-indigo-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
                  />
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-indigo-800 mb-1">
                    Grade Level
                  </label>
                  <input
                    type="number"
                    name="gradeLevel"
                    value={course.gradeLevel}
                    onChange={handleCourseChange}
                    className="w-full rounded-xl bg-white border border-indigo-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-indigo-800 mb-1">
                    Difficulty
                  </label>
                  <select
                    name="difficultyLevel"
                    value={course.difficultyLevel}
                    onChange={handleCourseChange}
                    className="w-full rounded-xl bg-white border border-indigo-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-semibold text-indigo-800 mb-1">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full rounded-xl bg-white border border-indigo-300 px-4 py-2 text-slate-800"
                  />
                  {course.thumbnail && (
                    <div className="mt-4">
                      <h4 className="text-indigo-700 font-medium mb-2">
                        Thumbnail Preview
                      </h4>
                      <img
                        src={course.thumbnail}
                        alt="Course Thumbnail"
                        className="w-32 h-32 object-cover rounded-xl border border-indigo-400"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lessons Form */}
            <LessonForm
              removeLesson={removeLesson}
              courseLessons={courseLessons}
              handleLessonChange={handleLessonChange}
              lessonVisibility={lessonVisibility}
              toggleLessonVisibility={toggleLessonVisibility}
              addLesson={addLesson}
              setVideoFile={setVideoFile}
            />

            <div className="text-center">
              <button
                onClick={handleSave}
                className={`mt-6 ${deletedLessonIds.length > 0 ? "bg-red-500 hover:bg-red-600" : " bg-indigo-600"} cursor-pointer hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300`}
              >
                {deletedLessonIds.length > 0 ? "Remove Lesson" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCourseForm;
