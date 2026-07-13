import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToWishlist, removeFromWishlist } from '../redux/student/wishlistSlice';
import { selectWishlistItems } from '../redux/student/wishlistSelectors';

interface Course {
  id: number
  icon: string
  iconBg: string
  category: string
  title: string
  description: string
  duration: string
  lessons: number
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);
  const isWished = wishlistItems.some((item) => item.id === course.id);

  const toggleWishlist = () => {
    if (isWished) {
      dispatch(removeFromWishlist(course.id));
    } else {
      dispatch(addToWishlist(course));
    }
  };

  return (
    <div className="relative flex flex-col gap-4 rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={toggleWishlist}
        className={`absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
          isWished
            ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
        }`}
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

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[0.72rem] font-semibold tracking-[0.16em] uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          {course.category}
        </span>
        <span className="text-[0.72rem] font-semibold tracking-[0.16em] uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          ⏱ {course.duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 leading-snug">
        {course.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed flex-1">
        {course.description}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-2 pt-4 text-sm text-slate-500">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        {course.lessons} lessons
      </div>
    </div>
  )
}

export type { Course }