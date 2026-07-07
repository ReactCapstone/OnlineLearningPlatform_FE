import {

selectActivities

}

from "../../../redux/student/studentSelectors";

import { useAppSelector }

from "../../../redux/hooks";

const RecentActivity=()=>{

const activities=

useAppSelector(selectActivities);

return(

<div className="bg-white rounded-xl p-6 shadow-sm">

<h2 className="text-xl font-bold">

Recent Activity

</h2>

<div className="mt-5 space-y-5">

{

activities.map(activity=>(

<div

key={activity.id}

>

<p className="font-medium">

{activity.activity}

</p>

<p className="text-gray-500 text-sm">

{activity.time}

</p>

</div>

))

}

</div>

</div>

)

}

export default RecentActivity;