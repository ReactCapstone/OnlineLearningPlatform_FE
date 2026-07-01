import {FiChevronDown} from 'react-icons/fi';

const ProfileMenu = () => {
  return (
    <div className="flex items-center gap-3">
            <img src="src/assets/images/default-user.png" height={50} width={50} className="rounded-full "/>
            <div>
                <p className='font-semibold'>Komal Gupta</p>
                <p className='text-xs'>User</p>
            </div>
            <FiChevronDown/>
    </div>
  )
}

export default ProfileMenu;