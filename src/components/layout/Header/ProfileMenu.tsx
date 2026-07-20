import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/auth/authSlice';
 
const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
 
  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };
 
  const handleLogoutClick = () => {
    setIsOpen(false);
    dispatch(logout());
    navigate('/login');
  };
 
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-white p-1 text-slate-700 transition hover:bg-slate-50"
      >
        <img
          src="src/assets/images/default-user.png"
          height={40}
          width={40}
          className="rounded-full"
          alt="Profile"
        />
        <FiChevronDown />
      </button>
 
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={handleProfileClick}
            className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
          >
            Profile
          </button>
          <button
            type="button"
            onClick={handleLogoutClick}
            className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
 
export default ProfileMenu;