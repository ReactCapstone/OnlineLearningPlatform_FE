import SidebarItem from './sidebarItem';
import {sidebarMenu} from './sidebarMenu';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-white border-r flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-indigo-600">NV Learn Hub</h1>
            </div>
            <div className="flex-1 px-4 space-y-2">
                {sidebarMenu.map((item) => (
                <SidebarItem key={item.title} {...item} />
                ))}
            </div>
           <div className="p-4 border-t">
            <div className='flex items-center gap-3'>
                <img src="src/assets/images/default-user.png" height={50} width={50} className="rounded-full"/>
            </div>
            <div>
                <p className="font-semibold">Komal Gupta</p>
                <p className="text-sm text-gray-500">User</p>
            </div>
               
            </div>
        </div>
    )
}

export default Sidebar;