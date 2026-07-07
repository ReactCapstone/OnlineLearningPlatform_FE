import RecommendedCourseCard

from "./RecommendedCourseCard";

import { useAppSelector }

from "../../../redux/hooks";

import {

selectRecommendedCourses

}

from "../../../redux/student/studentSelectors";

const RecommendedCourses=()=>{

const courses=

useAppSelector(selectRecommendedCourses);

return(

<div>

<div className="flex justify-between mb-5">

<h2 className="text-2xl font-bold">

Recommended Courses

</h2>

<button

className="text-indigo-600"

>

View All

</button>

</div>

<div className="grid grid-cols-2 gap-5">

{

courses.map(course=>(

<RecommendedCourseCard

key={course.id}

course={course}

/>

))

}

</div>

</div>

)

}

export default RecommendedCourses;