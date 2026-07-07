import {FiSearch} from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg px-4 w-96">
        <FiSearch/>
        <input
            type="text"
            placeholder="Search courses..."
            className="ml-2 bg-transparent outline-none w-full"
        />
    </div>
  ) 
}

export default SearchBar;