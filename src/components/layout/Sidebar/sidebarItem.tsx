import {NavLink} from "react-router-dom";

interface Props{
    title: string;
    icon: any;
    path:string;
}

const SidebarItem = ({title, icon: Icon, path}:Props) => {
    return (
        <NavLink to={path} className={({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${isActive ? "bg-indigo-400 text-olive-100 border-1" : "text-white-soft hover:bg-gray-100"}`}>
            <Icon size={20}/>
            <span className="text-sm font-medium">{title}</span>
        </NavLink>
    )
}

export default SidebarItem;