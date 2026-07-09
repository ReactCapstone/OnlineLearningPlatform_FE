import { Link } from 'react-router-dom'

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

const FEATURED_COURSES: Course[] = [
  {
    id: 1,
    icon: '🎨',
    iconBg: 'rgba(139,92,246,0.1)',
    category: 'Design',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn to craft beautiful, user-centred interfaces from wireframes to polished prototypes.',
    duration: '6h 30m',
    lessons: 24,
  },
  {
    id: 2,
    icon: '⚛️',
    iconBg: 'rgba(56,189,248,0.1)',
    category: 'Frontend',
    title: 'React & TypeScript Mastery',
    description: 'Build production-ready apps with React 18, TypeScript, and modern tooling.',
    duration: '9h 15m',
    lessons: 36,
  },
  {
    id: 3,
    icon: '🗄️',
    iconBg: 'rgba(34,197,94,0.1)',
    category: 'Backend',
    title: 'Node.js & REST APIs',
    description: 'Design scalable server-side applications and RESTful APIs with Node, Express, and PostgreSQL.',
    duration: '8h 00m',
    lessons: 30,
  },
  {
    id: 4,
    icon: '🤖',
    iconBg: 'rgba(245,158,11,0.1)',
    category: 'AI / ML',
    title: 'Machine Learning with Python',
    description: 'Go from data wrangling to deploying ML models using scikit-learn and PyTorch.',
    duration: '11h 45m',
    lessons: 42,
  },
  {
    id: 5,
    icon: '☁️',
    iconBg: 'rgba(99,102,241,0.1)',
    category: 'DevOps',
    title: 'Cloud & DevOps Essentials',
    description: 'Master CI/CD pipelines, Docker, Kubernetes, and AWS fundamentals.',
    duration: '7h 20m',
    lessons: 28,
  },
  {
    id: 6,
    icon: '🔐',
    iconBg: 'rgba(239,68,68,0.1)',
    category: 'Security',
    title: 'Web Security & Ethical Hacking',
    description: 'Understand OWASP threats, penetration testing, and how to build secure web apps.',
    duration: '5h 50m',
    lessons: 22,
  },
]

const POPULAR_COURSES: Course[] = [
  {
    id: 7,
    icon: '📊',
    iconBg: 'rgba(20,184,166,0.1)',
    category: 'Data',
    title: 'Data Analysis with Pandas',
    description: 'Turn raw datasets into actionable insights using Python, Pandas, and Matplotlib.',
    duration: '5h 00m',
    lessons: 20,
  },
  {
    id: 8,
    icon: '📱',
    iconBg: 'rgba(236,72,153,0.1)',
    category: 'Mobile',
    title: 'React Native: Mobile Apps',
    description: 'Build cross-platform iOS and Android apps with a single React Native codebase.',
    duration: '10h 30m',
    lessons: 38,
  },
  {
    id: 9,
    icon: '🌐',
    iconBg: 'rgba(251,146,60,0.1)',
    category: 'Frontend',
    title: 'Modern CSS & Animations',
    description: 'Deep-dive into CSS Grid, custom properties, and scroll-driven animations.',
    duration: '4h 15m',
    lessons: 18,
  },
  {
    id: 10,
    icon: '🧩',
    iconBg: 'rgba(167,139,250,0.1)',
    category: 'Algorithms',
    title: 'Data Structures & Algorithms',
    description: 'Crack technical interviews and level up your problem-solving with DSA in JavaScript.',
    duration: '13h 00m',
    lessons: 50,
  },
  {
    id: 11,
    icon: '🛒',
    iconBg: 'rgba(251,191,36,0.1)',
    category: 'Fullstack',
    title: 'Build an E-Commerce App',
    description: 'A project-based course building a full-stack shop with Next.js, Prisma, and Stripe.',
    duration: '12h 20m',
    lessons: 44,
  },
  {
    id: 12,
    icon: '🎙️',
    iconBg: 'rgba(52,211,153,0.1)',
    category: 'Soft Skills',
    title: 'Tech Communication & Writing',
    description: 'Write clear documentation, give compelling tech talks, and lead effective code reviews.',
    duration: '3h 30m',
    lessons: 14,
  },
]

const STATS = [
  { value: '120+', label: 'Courses' },
  { value: '40k+', label: 'Students' },
  { value: '95%', label: 'Completion rate' },
  { value: '4.9★', label: 'Avg. rating' },
]

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="flex flex-col gap-3 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-default">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
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
      <h3 className="text-sm font-semibold text-gray-900 leading-snug">{course.title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed flex-1">{course.description}</p>
      <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100 text-xs text-gray-400">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        {course.lessons} lessons
      </div>
    </div>
  )
}

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

export default function Home() {
  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-6 pt-24 pb-20 text-center"
        style={{
          background: 'linear-gradient(135deg, #f8f7ff 0%, #fff 50%, #fffbf0 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #4F46E5 0%, transparent 70%)' }} />

        <div className="relative max-w-[740px] mx-auto flex flex-col items-center gap-5">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            New courses added every week
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Learn. Build.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              Launch your career.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-500 max-w-[520px] leading-relaxed">
            Practical, project-driven courses taught by industry professionals.
            Go from beginner to job-ready on your own schedule.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap justify-center mt-1">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 hover:-translate-y-px shadow-lg shadow-indigo-200 transition-all duration-200"
            >
              Browse courses <ArrowRight />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              Sign up free
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm mt-4">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center px-8 py-4 ${i < STATS.length - 1 ? 'border-r border-gray-100' : ''}`}
              >
                <span className="text-2xl font-bold text-gray-900 leading-none">{value}</span>
                <span className="text-[0.72rem] text-gray-400 mt-1">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <span className="inline-block text-[0.68rem] font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-3">
          Handpicked for you
        </span>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-900 mb-1.5">Featured Courses</h2>
        <p className="text-sm text-gray-500 mb-10">Our instructors' top picks across every discipline.</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {FEATURED_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <div className="h-px bg-gray-100 max-w-[1200px] mx-auto" />

      {/* ── Popular Courses ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <span className="inline-block text-[0.68rem] font-semibold tracking-widest uppercase text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full mb-3">
          Trending now
        </span>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-900 mb-1.5">Most Popular</h2>
        <p className="text-sm text-gray-500 mb-10">The courses learners keep coming back to.</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {POPULAR_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-6 py-16 bg-gradient-to-r from-indigo-600 to-purple-500 mt-8">
        <div className="max-w-[560px] mx-auto text-center flex flex-col items-center gap-4">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white">
            Ready to start learning?
          </h2>
          <p className="text-sm text-indigo-100">
            Join thousands of students already growing with Learnify.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-indigo-600 bg-white hover:bg-indigo-50 hover:-translate-y-px shadow-lg transition-all duration-200 mt-1"
          >
            View all courses <ArrowRight />
          </Link>
        </div>
      </section>

    </div>
  )
}