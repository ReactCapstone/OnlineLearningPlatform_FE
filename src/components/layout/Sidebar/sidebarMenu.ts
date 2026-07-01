import {
    FiHome,
    FiAward,
    FiBookOpen,
    FiHeart,
    FiFileText,
    FiBarChart2,
} from "react-icons/fi";

export const sidebarMenu = [  
    {
     title:"Dashboard",
     icon: FiHome,   
     path:"/"
    },
    {
        title:"My Courses",
        icon: FiBookOpen,
        path:"/courses"
    },
    {
        title:"My Progress",
        icon: FiBarChart2,     
        path:"/progress"
    },
    {
        title:"Assessments",
        icon: FiFileText, 
        path:"/assessments"
    },
    {
        title:"My Certificates",
        icon: FiAward,
        path:"/certificates"
    },
    {
        title:"Wishlist",
        icon: FiHeart,
        path:"/wishlist"
    }


];