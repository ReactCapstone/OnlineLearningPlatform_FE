import { FiStar } from "react-icons/fi";

import { RecommendedCourse }

from "../../../redux/student/studentTypes";

interface Props{

course:RecommendedCourse;

}

const RecommendedCourseCard=({course}:Props)=>{

return(

<div className="bg-white rounded-xl shadow-sm overflow-hidden">

<img

src={course.image}

className="w-full h-40 object-cover"

/>

<div className="p-5">

<h3 className="font-semibold">

{course.title}

</h3>

<p className="text-gray-500 mt-2">

{course.instructor}

</p>

<div className="flex justify-between mt-4">

<div className="flex items-center gap-1">

<FiStar className="text-yellow-500"/>

{course.rating}

</div>

<span>

{course.duration}

</span>

</div>

<button

className="w-full mt-5 bg-indigo-600 text-white py-2 rounded-lg"

>

View Course

</button>

</div>

</div>

)

}

export default RecommendedCourseCard;