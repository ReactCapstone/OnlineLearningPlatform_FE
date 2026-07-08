import { useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathName = location.pathname.replace(/^\//, '').replace(/-/g, ' ');
  const currentPage = pathName ? pathName.charAt(0).toUpperCase() + pathName.slice(1) : 'Dashboard';

  return (
    <div className="px-8 py-4 text-sm text-blue-800">
      Home
      <span className="mx-2">{'>'}</span>
      {currentPage}
    </div>
  );
};

export default Breadcrumb;