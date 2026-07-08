import { useMemo, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectWishlistItems } from '../redux/student/wishlistSelectors';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';

const Wishlist = () => {
  const wishlistItems = useAppSelector(selectWishlistItems);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWishlist = useMemo(() => {
    if (!searchTerm.trim()) {
      return wishlistItems;
    }

    const lowerTerm = searchTerm.toLowerCase();
    return wishlistItems.filter((course) =>
      course.title.toLowerCase().includes(lowerTerm) ||
      course.category.toLowerCase().includes(lowerTerm) ||
      course.description.toLowerCase().includes(lowerTerm)
    );
  }, [searchTerm, wishlistItems]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-600">Wishlist</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-700">Saved {wishlistItems.length}</p>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="wishlist-search" className="sr-only">Search wishlist</label>
            <input
              id="wishlist-search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search saved courses"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {filteredWishlist.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-16 shadow-sm text-center">
            <p className="text-2xl font-semibold text-gray-900">No saved courses match your search</p>
            <p className="mt-3 text-sm text-gray-500">Try a different keyword or clear the search field.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {filteredWishlist.map((course) => (
              <div key={course.id} className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5">
                <div className="bg-indigo-50 p-6 text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-sm text-5xl text-indigo-700">
                    {course.icon}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-indigo-700">
                      {course.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-900">{course.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{course.description}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-3">
                      <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">{course.lessons} lessons</span>
                      <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">{course.category}</span>
                    </div>
                    <div className="rounded-3xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
                      {course.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Wishlist;
