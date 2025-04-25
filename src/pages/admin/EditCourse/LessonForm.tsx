import { useState } from "react";
import { Lesson } from "../services/services";

interface LessonFormProps {
  addLesson: () => void;
  toggleLessonVisibility: (index: number) => void;
  lessonVisibility: boolean[];
  courseLessons: Lesson[];
  handleLessonChange: (index: number, e: any) => void;
  removeLesson: (index: number) => void;
  setVideoFile:(file:File)=> void;
}

const LessonForm: React.FC<LessonFormProps> = ({
  addLesson,
  removeLesson,
  toggleLessonVisibility,
  lessonVisibility,
  courseLessons,
  handleLessonChange,
  setVideoFile
}) => {
  const [uploadType, setUploadType] = useState<string[]>([]); // one entry per lesson

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file); // Update video file state
    }
  };

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-indigo-800 uppercase tracking-wide">
          Lessons
        </h3>
        <button
          onClick={addLesson}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl transition-all duration-300 shadow-lg font-semibold"
        >
          + Add Lesson
        </button>
      </div>

      {courseLessons?.map((lesson: Lesson, index: number) => (
        <div
          key={index}
          className="border border-indigo-300 bg-white/70 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-indigo-800">
              Lesson {index + 1}
            </h4>
            <button
              onClick={() => toggleLessonVisibility(index)}
              className="text-sm font-medium text-indigo-500 hover:underline"
            >
              {lessonVisibility && lessonVisibility[index] ? "Hide" : "Show"}{" "}
            </button>
          </div>

          {lessonVisibility && lessonVisibility[index] && (
            <div className="grid gap-4">
              {[
                {
                  label: "Lesson Title",
                  name: "title",
                  type: "text",
                  value: lesson.title,
                },
                // {
                //   label: "Video URL",
                //   name: "url",
                //   type: "text",
                //   value: lesson.url,
                // },
                {
                  label: "Notes",
                  name: "notes",
                  type: "text",
                  value: lesson.notes,
                },
                {
                  label: "Lesson Order",
                  name: "order",
                  type: "number",
                  value: lesson.order,
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
                    onChange={(e) => handleLessonChange(index, e)}
                    className="w-full rounded-xl bg-white border border-indigo-300 px-4 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={label}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-indigo-800 mb-1">
                  Upload Type
                </label>
                <select
                  className="w-full rounded-xl border border-indigo-300 px-4 py-2"
                  value={uploadType[index] || "url"}
                  onChange={(e) => {
                    const newType = [...uploadType];
                    newType[index] = e.target.value;
                    setUploadType(newType);
                  }}
                >
                  <option value="url">Paste Video URL</option>
                  <option value="video">Upload Video File</option>
                </select>
              </div>

              {uploadType[index] === "video" ? (
                <div>
                  <label className="block text-sm font-semibold text-indigo-800 mb-1 mt-2">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange} // Handle video file change
                    className="w-full rounded-xl border border-indigo-300 px-4 py-2"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-indigo-800 mb-1 mt-2">
                    Video URL
                  </label>
                  <input
                    type="text"
                    name="url"
                    value={lesson.url || ""}
                    onChange={(e) => handleLessonChange(index, e)}
                    className="w-full rounded-xl border border-indigo-300 px-4 py-2"
                    placeholder="Paste video URL"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-indigo-800 mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  value={lesson.content}
                  onChange={(e) => handleLessonChange(index, e)}
                  className="w-full rounded-xl bg-white border border-indigo-300 px-4 py-2 text-slate-800 h-24 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Lesson content"
                />
              </div>
            </div>
          )}

          <button
            onClick={() => removeLesson(index)}
            className="text-red-500 text-sm font-medium hover:underline mt-4 block"
          >
            Remove Lesson
          </button>
        </div>
      ))}
    </div>
  );
};

export default LessonForm;
