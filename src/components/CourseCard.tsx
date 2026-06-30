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
  return (
    <div className="flex flex-col gap-3 p-6 bg-white/4 border border-white/8 rounded-[14px] cursor-default transition-all duration-200 hover:-translate-y-1 hover:border-indigo/40 hover:shadow-xl hover:shadow-indigo/15">

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center text-2xl shrink-0"
        style={{ background: course.iconBg }}
      >
        {course.icon}
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[0.7rem] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-indigo/18 text-indigo-light border border-indigo/25">
          {course.category}
        </span>
        <span className="text-[0.7rem] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-amber/15 text-amber border border-amber/25">
          ⏱ {course.duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-white-soft leading-snug">
        {course.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed flex-1">
        {course.description}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-white/8 text-xs text-muted">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        {course.lessons} lessons
      </div>
    </div>
  )
}

export type { Course }