import { useState } from 'react'
import CourseCard, { type Course } from '../components/CourseCard'

const ALL_COURSES: Course[] = [
  {
    id: 1,
    icon: '🎨',
    iconBg: 'rgba(139,92,246,0.2)',
    category: 'Design',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn to craft beautiful, user-centred interfaces from wireframes to polished prototypes.',
    duration: '6h 30m',
    lessons: 24,
  },
  {
    id: 2,
    icon: '⚛️',
    iconBg: 'rgba(56,189,248,0.2)',
    category: 'Frontend',
    title: 'React & TypeScript Mastery',
    description: 'Build production-ready apps with React 18, TypeScript, and modern tooling.',
    duration: '9h 15m',
    lessons: 36,
  },
  {
    id: 3,
    icon: '🗄️',
    iconBg: 'rgba(34,197,94,0.2)',
    category: 'Backend',
    title: 'Node.js & REST APIs',
    description: 'Design scalable server-side applications and RESTful APIs with Node, Express, and PostgreSQL.',
    duration: '8h 00m',
    lessons: 30,
  },
  {
    id: 4,
    icon: '🤖',
    iconBg: 'rgba(245,158,11,0.2)',
    category: 'AI / ML',
    title: 'Machine Learning with Python',
    description: 'Go from data wrangling to deploying ML models using scikit-learn and PyTorch.',
    duration: '11h 45m',
    lessons: 42,
  },
  {
    id: 5,
    icon: '☁️',
    iconBg: 'rgba(99,102,241,0.2)',
    category: 'DevOps',
    title: 'Cloud & DevOps Essentials',
    description: 'Master CI/CD pipelines, Docker, Kubernetes, and AWS fundamentals.',
    duration: '7h 20m',
    lessons: 28,
  },
  {
    id: 6,
    icon: '🔐',
    iconBg: 'rgba(239,68,68,0.2)',
    category: 'Security',
    title: 'Web Security & Ethical Hacking',
    description: 'Understand OWASP threats, penetration testing, and how to build secure web apps.',
    duration: '5h 50m',
    lessons: 22,
  },
  {
    id: 7,
    icon: '📊',
    iconBg: 'rgba(20,184,166,0.2)',
    category: 'Data',
    title: 'Data Analysis with Pandas',
    description: 'Turn raw datasets into actionable insights using Python, Pandas, and Matplotlib.',
    duration: '5h 00m',
    lessons: 20,
  },
  {
    id: 8,
    icon: '📱',
    iconBg: 'rgba(236,72,153,0.2)',
    category: 'Mobile',
    title: 'React Native: Mobile Apps',
    description: 'Build cross-platform iOS and Android apps with a single React Native codebase.',
    duration: '10h 30m',
    lessons: 38,
  },
  {
    id: 9,
    icon: '🌐',
    iconBg: 'rgba(251,146,60,0.2)',
    category: 'Frontend',
    title: 'Modern CSS & Animations',
    description: 'Deep-dive into CSS Grid, custom properties, and scroll-driven animations.',
    duration: '4h 15m',
    lessons: 18,
  },
  {
    id: 10,
    icon: '🧩',
    iconBg: 'rgba(167,139,250,0.2)',
    category: 'Algorithms',
    title: 'Data Structures & Algorithms',
    description: 'Crack technical interviews and level up your problem-solving with DSA in JavaScript.',
    duration: '13h 00m',
    lessons: 50,
  },
  {
    id: 11,
    icon: '🛒',
    iconBg: 'rgba(251,191,36,0.2)',
    category: 'Fullstack',
    title: 'Build an E-Commerce App',
    description: 'A project-based course building a full-stack shop with Next.js, Prisma, and Stripe.',
    duration: '12h 20m',
    lessons: 44,
  },
  {
    id: 12,
    icon: '🎙️',
    iconBg: 'rgba(52,211,153,0.2)',
    category: 'Soft Skills',
    title: 'Tech Communication & Writing',
    description: 'Write clear documentation, give compelling tech talks, and lead effective code reviews.',
    duration: '3h 30m',
    lessons: 14,
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(ALL_COURSES.map(c => c.category)))]

export default function Courses() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? ALL_COURSES
    : ALL_COURSES.filter(c => c.category === active)

  return (
    <div className="min-h-[60vh]">

      {/* Page header */}
      <div
        className="border-b border-white/8 px-6 pt-16 pb-12"
        style={{ background: 'linear-gradient(180deg, rgba(79,70,229,0.1) 0%, transparent 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <span className="inline-block text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-indigo-light bg-indigo/18 border border-indigo/30 px-3 py-1 rounded-full mb-3.5">
            All courses
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white-soft mb-2">
            Expand your skillset
          </h1>
          <p className="text-base text-muted">
            {ALL_COURSES.length} courses across design, engineering, data, and more.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-50 bg-navy/92 backdrop-blur-md border-b border-white/8 px-6 py-3">
        <div className="max-w-[1200px] mx-auto flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-[0.82rem] font-medium border cursor-pointer transition-all duration-150
                ${active === cat
                  ? 'bg-indigo text-white border-indigo'
                  : 'bg-transparent text-muted border-white/8 hover:text-white-soft hover:border-white/20 hover:bg-white/5'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-20">
        <p className="text-sm text-muted mb-6">
          Showing <strong className="text-white-soft">{filtered.length}</strong> course{filtered.length !== 1 ? 's' : ''}
          {active !== 'All' ? ` in ${active}` : ''}
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
          {filtered.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

    </div>
  )
}