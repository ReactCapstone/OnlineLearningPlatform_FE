import { useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import { ALL_COURSES } from '../data/courses'
import Sidebar from '../components/layout/Sidebar/sidebar'


function getEmbedUrl(url: string, index: number): string {
  const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)
  const listIdMatch = url.match(/list=([^&]+)/)
  const videoId = videoIdMatch ? videoIdMatch[1] : ''
  const listId = listIdMatch ? listIdMatch[1] : ''
  let embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&index=${index}`
  if (listId) embedUrl += `&list=${listId}`
  return embedUrl
}

export default function CoursePlayer() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const course = ALL_COURSES.find(c => c.id === Number(courseId))
  const [activeLesson, setActiveLesson] = useState(0)

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h1>
          <button onClick={() => navigate('/courses')} className="text-indigo-600 hover:underline text-sm">
            Back to courses
          </button>
        </div>
      </div>
    )
  }

  const lessons = Array.from({ length: course.lessons }, (_, i) => ({
    index: i,
    label: `Lesson ${i + 1}`,
  }))

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Sidebar ── */}
      <Sidebar />

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-auto">

        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Courses
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <span className="text-sm text-gray-400">{course.category}</span>
        </div>

        <div className="flex-1 px-8 py-8 max-w-[1100px] w-full mx-auto">

          {/* Video player */}
          <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-black aspect-video mb-6">
            <iframe
              key={activeLesson}
              src={getEmbedUrl(course.url, activeLesson)}
              title={`${course.title} — Lesson ${activeLesson + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Course info */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: course.iconBg }}>
                {course.icon}
              </span>
              <span className="text-[0.72rem] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                {course.category}
              </span>
              <span className="text-[0.72rem] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                ⏱ {course.duration}
              </span>
              <span className="text-[0.72rem] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                ✏️ {course.lessons} lessons
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">{course.title}</h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[680px]">{course.description}</p>
          </div>

          {/* ── Playlist ── */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

            {/* Playlist header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Course Playlist</h2>
                <p className="text-xs text-gray-400 mt-0.5">{course.lessons} lessons · {course.duration}</p>
              </div>
              <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                Lesson {activeLesson + 1} of {course.lessons}
              </span>
            </div>

            {/* Lesson list */}
            <div className="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
              {lessons.map(({ index, label }) => {
                const isActive = index === activeLesson
                return (
                  <button
                    key={index}
                    onClick={() => setActiveLesson(index)}
                    className={`w-full flex items-center gap-4 px-6 py-3.5 text-left transition-all duration-150 cursor-pointer
                      ${isActive
                        ? 'bg-indigo-50 border-l-4 border-indigo-500'
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                  >
                    {/* Play indicator */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-150
                      ${isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-500 shadow-md shadow-indigo-200'
                        : 'bg-gray-100'
                      }`}
                    >
                      {isActive ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      ) : (
                        <span className="text-xs font-semibold text-gray-500">{index + 1}</span>
                      )}
                    </div>

                    {/* Label */}
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className={`text-sm font-medium truncate ${isActive ? 'text-indigo-700' : 'text-gray-700'}`}>
                        {label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {course.category} · Part {index + 1}
                      </span>
                    </div>

                    {/* Active badge */}
                    {isActive && (
                      <span className="text-[0.65rem] font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full shrink-0">
                        Now Playing
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}