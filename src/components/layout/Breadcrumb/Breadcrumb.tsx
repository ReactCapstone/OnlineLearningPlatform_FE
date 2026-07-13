import { useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const segments = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.replace(/-/g, ' '));

  const titleCase = (text: string) =>
    text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <div className="px-8 py-4 text-sm text-blue-800">
      <span>Home</span>
      {segments.map((segment, index) => (
        <span key={segment} className="inline-flex items-center">
          <span className="mx-2">{'>'}</span>
          <span>{titleCase(segment)}</span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;