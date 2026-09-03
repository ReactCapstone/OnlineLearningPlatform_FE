import {
    FiHome,
    FiAward,
    FiBookOpen,
    FiHeart,
    FiFileText,
    FiBarChart2,
    FiTarget,
} from "react-icons/fi";

export const sidebarMenu = [
    {
        title: 'Dashboard',
        icon: FiHome,
        path: '/'
    },
    {
        title: 'My Courses',
        icon: FiBookOpen,
        path: '/courses'
    },
    {
        title: 'Progress',
        icon: FiBarChart2,
        path: '/progress'
    },
    {
        title: 'Wishlist',
        icon: FiHeart,
        path: '/wishlist'
    },
    {
        title: 'Certificates',
        icon: FiAward,
        path: '/certificates'
    },
    {
        title: 'Notifications',
        icon: FiFileText,
        path: '/student/notifications'
    },
    {
        title: 'Profile',
        icon: FiTarget,
        path: '/profile'
    }
];