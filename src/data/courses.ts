export interface Course {
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

export const ALL_COURSES: Course[] = [
  { id: 1, icon: '🎨', iconBg: 'rgba(139,92,246,0.2)', category: 'Design', title: 'UI/UX Design Fundamentals', description: 'Learn to craft beautiful, user-centred interfaces from wireframes to polished prototypes.', duration: '6h 30m', lessons: 24, url: 'https://www.youtube.com/watch?v=2QQQtiFwXjU&list=PLTZYG7bZ1u6oHnGp4Ib3n0y-CmFQdTW6r' },
  { id: 2, icon: '⚛️', iconBg: 'rgba(56,189,248,0.2)', category: 'Frontend', title: 'React & TypeScript Mastery', description: 'Build production-ready apps with React 18, TypeScript, and modern tooling.', duration: '9h 15m', lessons: 36, url: 'https://www.youtube.com/watch?v=TiSGujM22OI&list=PLC3y8-rFHvwi1AXijGTKM0BKtHzVC-LSK' },
  { id: 3, icon: '🗄️', iconBg: 'rgba(34,197,94,0.2)', category: 'Backend', title: 'Node.js & REST APIs', description: 'Design scalable server-side applications and RESTful APIs with Node, Express, and PostgreSQL.', duration: '8h 00m', lessons: 30, url: 'https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q' },
  { id: 4, icon: '🤖', iconBg: 'rgba(245,158,11,0.2)', category: 'AI / ML', title: 'Machine Learning with Python', description: 'Go from data wrangling to deploying ML models using scikit-learn and PyTorch.', duration: '11h 45m', lessons: 42, url: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ&list=PL9ooVrP1hQOHUfd-g8GUpKI3hHOwM_9Dn' },
  { id: 5, icon: '☁️', iconBg: 'rgba(99,102,241,0.2)', category: 'DevOps', title: 'Cloud & DevOps Essentials', description: 'Master CI/CD pipelines, Docker, Kubernetes, and AWS fundamentals.', duration: '7h 20m', lessons: 28, url: 'https://www.youtube.com/watch?v=SOTamWNgDKc&list=PLWKjhJtqVAbkzvvpY12KkfiIGso9A_Ixs' },
  { id: 6, icon: '🔐', iconBg: 'rgba(239,68,68,0.2)', category: 'Security', title: 'Web Security & Ethical Hacking', description: 'Understand OWASP threats, penetration testing, and how to build secure web apps.', duration: '5h 50m', lessons: 22, url: 'https://www.youtube.com/watch?v=oKgnYe_6uh8&list=PLWPirh4EWFpEK7BXbMvKDYuHhA4AiYLDb' },
  { id: 7, icon: '📊', iconBg: 'rgba(20,184,166,0.2)', category: 'Data', title: 'Data Analysis with Pandas', description: 'Turn raw datasets into actionable insights using Python, Pandas, and Matplotlib.', duration: '5h 00m', lessons: 20, url: 'https://www.youtube.com/watch?v=gtjxAH8uaP0' },
  { id: 8, icon: '📱', iconBg: 'rgba(236,72,153,0.2)', category: 'Mobile', title: 'React Native: Mobile Apps', description: 'Build cross-platform iOS and Android apps with a single React Native codebase.', duration: '10h 30m', lessons: 38, url: 'https://www.youtube.com/watch?v=hzzCveeczSQ&list=PLC3y8-rFHvwhiQJD1di4eRVN30WWCXkg1' },
  { id: 9, icon: '🌐', iconBg: 'rgba(251,146,60,0.2)', category: 'Frontend', title: 'Modern CSS & Animations', description: 'Deep-dive into CSS Grid, custom properties, and scroll-driven animations.', duration: '4h 15m', lessons: 18, url: 'https://www.youtube.com/watch?v=jgw82b5Y2MU&list=PL4cUxeGkcC9iGYgmEd2dm3zAKzyCGDtM5' },
  { id: 10, icon: '🧩', iconBg: 'rgba(167,139,250,0.2)', category: 'Algorithms', title: 'Data Structures & Algorithms', description: 'Crack technical interviews and level up your problem-solving with DSA in JavaScript.', duration: '13h 00m', lessons: 50, url: 'https://www.youtube.com/watch?v=yRpLlJmRo2w&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop' },
  { id: 11, icon: '🛒', iconBg: 'rgba(251,191,36,0.2)', category: 'Fullstack', title: 'Build an E-Commerce App', description: 'A project-based course building a full-stack shop with Next.js, Prisma, and Stripe.', duration: '12h 20m', lessons: 44, url: 'https://www.youtube.com/watch?v=glMRU2ER1q8&list=PL7Oro2kvkIzLjKd5pXe6HBMJvExyNiame' },
  { id: 12, icon: '🎙️', iconBg: 'rgba(52,211,153,0.2)', category: 'Soft Skills', title: 'Tech Communication & Writing', description: 'Write clear documentation, give compelling tech talks, and lead effective code reviews.', duration: '3h 30m', lessons: 14, url: 'https://www.youtube.com/watch?v=vT5pcc30Ffw' },
]