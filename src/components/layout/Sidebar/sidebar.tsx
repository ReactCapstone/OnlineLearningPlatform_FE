import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuthUser, selectIsAuthenticated } from "../../../redux/auth/authSelectors";
import Modal from "../../common/Modal/Modal";
import SidebarItem from './sidebarItem';
import { sidebarMenu } from './sidebarMenu';

const Sidebar = () => {
    const user = useAppSelector(selectAuthUser);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    return (
        <>
        <div className="sticky top-0 flex h-screen w-64 flex-col border-r border-r-gray-300 bg-white shadow-xl">
            <div className="flex items-center gap-1.5 p-6 shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-1.5 shrink-0">
                    <span className="items-center justify-center w-11 h-8 font-extrabold rounded-lg font-display font-bold text-white bg-indigo-600 pl-1">
                        NV
                    </span>
                    Learn Hub
                </h1>
            </div>
            <div className="flex-1 px-4 space-y-2">
                {sidebarMenu.map((item) => (
                    isAuthenticated || item.path === '/courses' ? (
                        <SidebarItem key={item.title} {...item} />
                    ) : (
                        <button
                            key={item.title}
                            type="button"
                            onClick={() => setShowLoginPrompt(true)}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-slate-500 transition-all hover:bg-gray-100"
                        >
                            <item.icon size={20} />
                            <span className="text-sm font-medium">{item.title}</span>
                        </button>
                    )
                ))}
            </div>
            <div className="p-4 border-t border-t-gray-300">
                <div className="flex items-center gap-3">
                    <img src="src/assets/images/default-user.png" height={50} width={50} className="rounded-full" />
                    <p className="font-semibold">
                        {user?.fullName ?? "Guest"} <br />
                        <b className="text-sm text-gray-600">{user?.email ?? ""}</b>
                    </p>
                </div>
            </div>
        </div>

        {showLoginPrompt && (
            <Modal onClose={() => setShowLoginPrompt(false)} ariaLabel="Login required">
                <div className="w-[min(100%,380px)] rounded-2xl bg-white p-8 text-center shadow-2xl">
                    <h2 className="text-xl font-bold text-gray-900">Login required</h2>
                    <p className="mt-2 text-sm text-gray-500">Please log in to open this section.</p>
                    <Link
                        to="/login"
                        onClick={() => setShowLoginPrompt(false)}
                        className="mt-6 block rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
                    >
                        Go to login
                    </Link>
                </div>
            </Modal>
        )}
        </>
    );
};

export default Sidebar;