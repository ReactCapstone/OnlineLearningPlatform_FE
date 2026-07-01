import {FiBell} from 'react-icons/fi';

const  NotificationMenu = () => {
  return (
    <div className="relative cursor-pointer">  
      <FiBell size={22} />
      <span className='absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center'>3</span>
    </div>
  )
}

export default NotificationMenu;