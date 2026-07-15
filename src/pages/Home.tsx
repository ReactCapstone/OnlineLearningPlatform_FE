import { Link } from 'react-router-dom'
import CourseCard, { type Course } from '../components/CourseCard'

const FEATURED_COURSES: Course[] = [
  { id: 1, icon: '🎨', iconBg: 'rgba(139,92,246,0.2)', category: 'Design', title: 'UI/UX Design Fundamentals', description: 'Learn to craft beautiful, user-centred interfaces from wireframes to polished prototypes.', duration: '6h 30m', lessons: 24, url: 'https://www.youtube.com/watch?v=2QQQtiFwXjU&list=PLTZYG7bZ1u6oHnGp4Ib3n0y-CmFQdTW6r' },
  { id: 2, icon: '⚛️', iconBg: 'rgba(56,189,248,0.2)', category: 'Frontend', title: 'React & TypeScript Mastery', description: 'Build production-ready apps with React 18, TypeScript, and modern tooling.', duration: '9h 15m', lessons: 36, url: 'https://www.youtube.com/watch?v=TiSGujM22OI&list=PLC3y8-rFHvwi1AXijGTKM0BKtHzVC-LSK' },
  { id: 3, icon: '🗄️', iconBg: 'rgba(34,197,94,0.2)', category: 'Backend', title: 'Node.js & REST APIs', description: 'Design scalable server-side applications and RESTful APIs with Node, Express, and PostgreSQL.', duration: '8h 00m', lessons: 30, url: 'https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q' },
  { id: 4, icon: '🤖', iconBg: 'rgba(245,158,11,0.2)', category: 'AI / ML', title: 'Machine Learning with Python', description: 'Go from data wrangling to deploying ML models using scikit-learn and PyTorch.', duration: '11h 45m', lessons: 42, url: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ&list=PL9ooVrP1hQOHUfd-g8GUpKI3hHOwM_9Dn' },
  { id: 5, icon: '☁️', iconBg: 'rgba(99,102,241,0.2)', category: 'DevOps', title: 'Cloud & DevOps Essentials', description: 'Master CI/CD pipelines, Docker, Kubernetes, and AWS fundamentals.', duration: '7h 20m', lessons: 28, url: 'https://www.youtube.com/watch?v=SOTamWNgDKc&list=PLWKjhJtqVAbkzvvpY12KkfiIGso9A_Ixs' },
  { id: 6, icon: '🔐', iconBg: 'rgba(239,68,68,0.2)', category: 'Security', title: 'Web Security & Ethical Hacking', description: 'Understand OWASP threats, penetration testing, and how to build secure web apps.', duration: '5h 50m', lessons: 22, url: 'https://www.youtube.com/watch?v=oKgnYe_6uh8&list=PLWPirh4EWFpEK7BXbMvKDYuHhA4AiYLDb' },
]

const POPULAR_COURSES: Course[] = [
  { id: 7, icon: '📊', iconBg: 'rgba(20,184,166,0.2)', category: 'Data', title: 'Data Analysis with Pandas', description: 'Turn raw datasets into actionable insights using Python, Pandas, and Matplotlib.', duration: '5h 00m', lessons: 20, url: 'https://www.youtube.com/watch?v=gtjxAH8uaP0' },
  { id: 8, icon: '📱', iconBg: 'rgba(236,72,153,0.2)', category: 'Mobile', title: 'React Native: Mobile Apps', description: 'Build cross-platform iOS and Android apps with a single React Native codebase.', duration: '10h 30m', lessons: 38, url: 'https://www.youtube.com/watch?v=hzzCveeczSQ&list=PLC3y8-rFHvwhiQJD1di4eRVN30WWCXkg1' },
  { id: 9, icon: '🌐', iconBg: 'rgba(251,146,60,0.2)', category: 'Frontend', title: 'Modern CSS & Animations', description: 'Deep-dive into CSS Grid, custom properties, and scroll-driven animations.', duration: '4h 15m', lessons: 18, url: 'https://www.youtube.com/watch?v=jgw82b5Y2MU&list=PL4cUxeGkcC9iGYgmEd2dm3zAKzyCGDtM5' },
  { id: 10, icon: '🧩', iconBg: 'rgba(167,139,250,0.2)', category: 'Algorithms', title: 'Data Structures & Algorithms', description: 'Crack technical interviews and level up your problem-solving with DSA in JavaScript.', duration: '13h 00m', lessons: 50, url: 'https://www.youtube.com/watch?v=yRpLlJmRo2w&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop' },
  { id: 11, icon: '🛒', iconBg: 'rgba(251,191,36,0.2)', category: 'Fullstack', title: 'Build an E-Commerce App', description: 'A project-based course building a full-stack shop with Next.js, Prisma, and Stripe.', duration: '12h 20m', lessons: 44, url: 'https://www.youtube.com/watch?v=glMRU2ER1q8&list=PL7Oro2kvkIzLjKd5pXe6HBMJvExyNiame' },
  { id: 12, icon: '🎙️', iconBg: 'rgba(52,211,153,0.2)', category: 'Soft Skills', title: 'Tech Communication & Writing', description: 'Write clear documentation, give compelling tech talks, and lead effective code reviews.', duration: '3h 30m', lessons: 14, url: 'https://www.youtube.com/watch?v=vT5pcc30Ffw' },
]

const STATS = [
  { value: '120+', label: 'Courses' },
  { value: '40k+', label: 'Students' },
  { value: '95%',  label: 'Completion rate' },
  { value: '4.9★', label: 'Avg. rating' },
]

function SectionLabel({ children, color = 'indigo' }: { children: string, color?: 'indigo' | 'purple' }) {
  const styles = {
    indigo: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/25',
    purple: 'text-purple-400 bg-purple-500/15 border-purple-500/25',
  }
  return (
    <span className={`inline-block text-[0.68rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border mb-3 ${styles[color]}`}>
      {children}
    </span>
  )
}

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

export default function Home() {
  return (
    <div className="bg-[#0D1B2A] min-h-screen text-slate-100" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-6 pt-24 pb-20 text-center"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% -10%, rgba(79,70,229,0.28) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(245,158,11,0.08) 0%, transparent 60%),
            #0D1B2A
          `
        }}
      >
        <div className="relative max-w-[740px] mx-auto flex flex-col items-center gap-5">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_0_3px_rgba(34,197,94,0.2)]" />
            New courses added every week
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-extrabold tracking-tight text-slate-100 leading-[1.1]">
            Learn. Build.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
              Launch your career.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-slate-400 max-w-[520px] leading-relaxed">
            Practical, project-driven courses taught by industry professionals.
            Go from beginner to job-ready on your own schedule.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap justify-center mt-1">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 hover:-translate-y-px shadow-lg shadow-indigo-500/30 transition-all duration-200"
            >
              Browse courses <ArrowRight />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-slate-200 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-200"
            >
              Sign up free
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex bg-white/5 border border-white/10 rounded-2xl overflow-hidden mt-4">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center px-8 py-4 ${i < STATS.length - 1 ? 'border-r border-white/10' : ''}`}
              >
                <span className="text-2xl font-bold text-slate-100 leading-none">{value}</span>
                <span className="text-[0.72rem] text-slate-500 mt-1">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <SectionLabel color="indigo">Handpicked for you</SectionLabel>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-slate-100 mb-1.5">Featured Courses</h2>
        <p className="text-sm text-slate-400 mb-10">Our instructors' top picks across every discipline.</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {FEATURED_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <div className="h-px bg-white/8 max-w-[1200px] mx-auto" />

      {/* ── Popular Courses ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <SectionLabel color="purple">Trending now</SectionLabel>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-slate-100 mb-1.5">Most Popular</h2>
        <p className="text-sm text-slate-400 mb-10">The courses learners keep coming back to.</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {POPULAR_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="px-6 py-16 mt-8 border-t border-white/8"
        style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(168,85,247,0.08) 100%)' }}
      >
        <div className="max-w-[560px] mx-auto text-center flex flex-col items-center gap-4">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-slate-100">
            Ready to start learning?
          </h2>
          <p className="text-sm text-slate-400">
            Join thousands of students already growing with Learnify.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 hover:-translate-y-px shadow-lg shadow-indigo-500/30 transition-all duration-200 mt-1"
          >
            View all courses <ArrowRight />
          </Link>
        </div>
      </section>

    </div>
  )
}