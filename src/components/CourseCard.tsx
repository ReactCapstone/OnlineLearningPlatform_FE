import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToWishlist, removeFromWishlist } from '../redux/student/wishlistSlice';
import { selectWishlistItems } from '../redux/student/wishlistSelectors';
import { useState } from 'react';
import wishlistService from '../services/wishlistService';

interface Course {
  id: number
  icon: string
  iconBg: string
  category: string
  title: string
  description: string
  duration: string
  lessons: number
  url: string
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);
  const isWished = wishlistItems.some((item) => item.id === course.id);

  const [loading, setLoading] = useState(false);

  const toggleWishlist = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (isWished) {
        await wishlistService.removeFromWishlist(course.id);
        dispatch(removeFromWishlist(course.id));
      } else {
        await wishlistService.addToWishlist(course.id);
        dispatch(addToWishlist(course));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Wishlist API error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-4 rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={toggleWishlist}
        disabled={loading}
        aria-busy={loading}
        className={`absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
          isWished
            ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
        } ${loading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={isWished ? '#fff' : 'none'}
            stroke={isWished ? 'none' : 'currentColor'}
            strokeWidth="2"
          />
        </svg>
      </button>

      {/* Icon */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-3xl text-3xl"
        style={{ background: course.iconBg }}
      >
        {course.icon}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[0.68rem] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
          {course.category}
        </span>
        <span className="text-[0.68rem] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
          ⏱ {course.duration}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors duration-200">
        {course.title}
      </h3>

      <p className="text-xs text-gray-500 leading-relaxed flex-1">{course.description}</p>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          {course.lessons} lessons
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Start learning
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export type { Course }