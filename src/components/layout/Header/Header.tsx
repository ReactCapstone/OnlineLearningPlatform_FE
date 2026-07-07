import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import NotificationMenu from "./NotificationMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex justify-between border-b border-b-gray-100 bg-white px-8 py-3 shadow-md">
        <SearchBar />
        <div className="flex items-center gap-6">
            <NotificationMenu />
            <ProfileMenu />
        </div>
    </header>
  )
}

export default Header;