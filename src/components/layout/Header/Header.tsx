import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import NotificationMenu from "./NotificationMenu";

const Header = () => {
  return (
    <header className="flex justify-between border-b px-8 py-5 bg-white">
        <SearchBar />
        <div className="flex items-center gap-8">
            <NotificationMenu />
            <ProfileMenu />
        </div>
    </header>
  )
}

export default Header;