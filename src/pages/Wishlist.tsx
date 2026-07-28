import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectWishlistItems } from '../redux/student/wishlistSelectors';
import wishlistService from '../services/wishlistService';
import { setWishlist, removeFromWishlist } from '../redux/student/wishlistSlice';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';

const Wishlist = () => {
  const wishlistItems = useAppSelector(selectWishlistItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const loadWishlist = async (search?: string) => {
    setLoading(true);
    try {
      const data = await wishlistService.getWishlist(search);
      dispatch(setWishlist(data));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to load wishlist', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadWishlist(searchTerm.trim() || undefined);
    }, 350);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  const handleRemove = async (courseId: number) => {
    try {
      await wishlistService.removeFromWishlist(courseId);
      dispatch(removeFromWishlist(courseId));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to remove wishlist item', err);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-600">Wishlist</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-700">
                Saved {wishlistItems.length}
              </p>
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
          {loading && (
            <p className="mt-3 text-sm text-slate-500">Searching wishlist...</p>
          )}
        </div>

        {wishlistItems.length === 0 && !loading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-16 shadow-sm text-center">
            <p className="text-2xl font-semibold text-gray-900">
              {searchTerm ? 'No saved courses match your search' : 'Your wishlist is empty'}
            </p>
            <p className="mt-3 text-sm text-gray-500">
              {searchTerm ? 'Try a different keyword or clear the search field.' : 'Browse courses and save the ones you\'re interested in.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {wishlistItems.map((course) => (
              <div
                key={course.id}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5"
              >
                <button
                  type="button"
                  onClick={() => handleRemove(course.id)}
                  className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-rose-500 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-40 w-full object-cover"
                />

                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-indigo-700">
                      {course.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-900">{course.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-2">{course.description}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-3">
                      <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                        {course.totalLessons} lessons
                      </span>
                      <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                        {course.level}
                      </span>
                    </div>
                    <div className="rounded-3xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
                      ${(course.price ?? 0).toFixed(2)}
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