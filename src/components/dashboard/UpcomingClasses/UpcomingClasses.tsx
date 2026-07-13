import {

selectUpcomingClasses

}

from "../../../redux/student/studentSelectors";

import { useAppSelector }

from "../../../redux/hooks";

const UpcomingClasses=()=>{

const classes=

useAppSelector(selectUpcomingClasses);

return(

<div className="bg-white rounded-xl p-6 shadow-sm">

<h2 className="text-xl font-bold mb-5">

Upcoming Classes

</h2>

{

classes.map(item=>(

<div

key={item.id}

className="border-b py-4"

>

<h3 className="font-semibold">

{item.title}

</h3>

<p className="text-gray-500">

{item.instructor}

</p>

<p className="text-sm">

{item.date}

•

{item.time}

</p>

</div>

))

}

</div>

)

}

export default UpcomingClasses;