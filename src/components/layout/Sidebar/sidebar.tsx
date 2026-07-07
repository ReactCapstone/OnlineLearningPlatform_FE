import SidebarItem from './sidebarItem';
import {sidebarMenu} from './sidebarMenu';

const Sidebar = () => {
    return (
        <div className="sticky top-0 flex h-screen w-64 flex-col border-r border-r-gray-300 bg-white shadow-xl">
            <div className="flex items-center gap-1.5 p-6 shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-1.5 shrink-0">
                    <span className="items-center justify-center w-11 h-8 font-extrabold rounded-lg font-display font-bold text-white bg-indigo-600 pl-1">
                        NV 
                    </span>
                    Learn Hub</h1>
            </div>
            <div className="flex-1 px-4 space-y-2">
                {sidebarMenu.map((item) => (
                <SidebarItem key={item.title} {...item} />
                ))}
            </div>
           <div className="p-4 border-t border-t-gray-300">
            <div className='flex items-center gap-3'>
                <img src="src/assets/images/default-user.png" height={50} width={50} className="rounded-full"/>
                 <p className="font-semibold">Komal Gupta <br/><b className='text-sm text-gray-600'>xyz@email.com</b></p>
                 {/* <p className="text-sm text-gray-500">User</p> */}
            </div>
            <div>
               
                
            </div>
               
            </div>
        </div>
    )
}

export default Sidebar;