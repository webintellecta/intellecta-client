import React from 'react'
// import CourseCard from '../../../components/cards/courseCard/CourseCard'
import { useQuery } from '@tanstack/react-query';
import LearningCards from '../../../components/cards/learingCards/LearningCards';
import axiosInstance from '../../../utils/axiosInstance';

const UserCourse:React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/courses/progress/allusercourse/aa",
        {
          withCredentials: true, // Include cookies
        }
      );
      return response.data.data;
    },
  });
  console.log("respponse data", data);
  if (isLoading) {
    return (
      <div className="h-[500px] flex justify-center items-center">
        <h1>Loading..</h1>
      </div>
    );
  }
  if (error) {
    console.log("error", error);
    return (
      <div className="h-[500px] flex justify-center items-center">
        {error.message + "hello"} 
      </div>
    );
  } 
  return (
    <div className='w-full  mt-10 flex flex-wrap gap-5 justify-around items-center'>
      {
              data?.map((item:any,index:number)=>(
                <LearningCards key={index+1} progress={item.progressPercent} title={item.courseId.title} />
              ))
            }
      
    </div>
  )
}

export default UserCourse
