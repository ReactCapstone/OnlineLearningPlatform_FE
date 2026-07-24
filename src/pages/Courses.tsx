// src/pages/Courses.tsx

import { useEffect, useState } from 'react'
import CourseCard, { type Course } from '../components/CourseCard'
import Sidebar from '../components/layout/Sidebar/sidebar'
import courseService from '../services/courseService'
import wishlistService from '../services/wishlistService'
import { useAppDispatch } from '../redux/hooks'
import { setWishlist } from '../redux/student/wishlistSlice'

export default function Courses() {
  const dispatch = useAppDispatch()
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([loadCourses(), loadWishlist()]);
    };

    fetchData();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await wishlistService.getWishlist();
      dispatch(setWishlist(data));
    } catch (err) {
      console.error('Failed to load wishlist', err);
    }
  };

  const loadCourses = async () => {
    try {
      const result = await courseService.getCourses();

      const mapped: Course[] = result.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        category: c.level,
        duration: c.language,
        lessons: c.price,
        icon: "📘",
        iconBg: "rgba(59,130,246,.15)",
        url: `/course/${c.id}`
      }));

      setCourses(mapped);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(courses.map(x => x.category)))
  ];

  const filtered = active === 'All'
    ? courses
    : courses.filter(c => c.category === active)

  return (
    <div className="flex min-h-screen bg-slate-100" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">

        {/* Page header */}
        <div className="border-b border-slate-200 bg-white px-8 pt-12 pb-10 shadow-sm">
          <span className="inline-block text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3.5">
            All courses
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-slate-900 mb-2">
            Expand your skillset
          </h1>
          <p className="text-base text-slate-600">
            {courses.length} courses across design, engineering, data, and more.
          </p>
        </div>

        {/* Filter bar */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-8 py-3 shadow-sm">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-[0.82rem] font-medium border cursor-pointer transition-all duration-150
                  ${active === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-500 text-white border-transparent'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="px-8 pt-8 pb-20">
          <p className="text-sm text-slate-600 mb-6">
            Showing <strong className="text-slate-900">{filtered.length}</strong> course{filtered.length !== 1 ? 's' : ''}
            {active !== 'All' ? ` in ${active}` : ''}
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {filtered.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

