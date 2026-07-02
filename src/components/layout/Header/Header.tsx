import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import NotificationMenu from "./NotificationMenu";

const Header = () => {
  return (
    <header className="flex justify-between border-b border-b-gray-100 px-8 py-3 bg-white shadow-md">
        <SearchBar />
        <div className="flex items-center gap-6">
            <NotificationMenu />
            <ProfileMenu />
        </div>
    </header>
  )
}

export default Header;