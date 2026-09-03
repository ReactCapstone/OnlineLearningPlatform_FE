export type CourseProgress = {
  id: number
  title: string
  category: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  enrollmentDate: string
  lastActive: string
  status: 'In Progress' | 'Completed' | 'Not Started'
}

export type UserRecord = {
  id: number
  name: string
  email: string
  phone: string
  role: 'Student' | 'Admin'
  joinDate: string
  lastActive: string
  status: 'Active' | 'Inactive' | 'Pending'
  avatar: string
  totalCourses: number
  completedCourses: number
  avgProgress: number
  courses: CourseProgress[]
}

export const mockUsers: UserRecord[] = [
  {
    id: 1,
    name: 'Aisha Patel',
    email: 'aisha.patel@example.com',
    phone: '+91 98765 43210',
    role: 'Student',
    joinDate: '2024-01-12',
    lastActive: '2 hours ago',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    totalCourses: 4,
    completedCourses: 1,
    avgProgress: 68,
    courses: [
      { id: 101, title: 'React Fundamentals', category: 'Frontend', progress: 90, lessonsCompleted: 18, totalLessons: 20, enrollmentDate: '2024-02-01', lastActive: '2 days ago', status: 'In Progress' },
      { id: 102, title: 'UI/UX Design Basics', category: 'Design', progress: 72, lessonsCompleted: 11, totalLessons: 15, enrollmentDate: '2024-02-18', lastActive: '1 week ago', status: 'In Progress' },
      { id: 103, title: 'JavaScript for Beginners', category: 'Programming', progress: 100, lessonsCompleted: 12, totalLessons: 12, enrollmentDate: '2024-01-10', lastActive: '3 days ago', status: 'Completed' },
      { id: 104, title: 'Node.js API Development', category: 'Backend', progress: 42, lessonsCompleted: 6, totalLessons: 14, enrollmentDate: '2024-03-04', lastActive: '5 hours ago', status: 'In Progress' },
    ],
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 91234 56789',
    role: 'Student',
    joinDate: '2023-11-08',
    lastActive: 'Yesterday',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    totalCourses: 3,
    completedCourses: 2,
    avgProgress: 81,
    courses: [
      { id: 201, title: 'Full Stack Web Development', category: 'Development', progress: 84, lessonsCompleted: 21, totalLessons: 25, enrollmentDate: '2023-11-09', lastActive: '1 day ago', status: 'In Progress' },
      { id: 202, title: 'Python Essentials', category: 'Programming', progress: 100, lessonsCompleted: 10, totalLessons: 10, enrollmentDate: '2023-12-01', lastActive: '4 days ago', status: 'Completed' },
      { id: 203, title: 'Data Visualization', category: 'Analytics', progress: 60, lessonsCompleted: 9, totalLessons: 15, enrollmentDate: '2024-01-25', lastActive: '2 weeks ago', status: 'In Progress' },
    ],
  },
  {
    id: 3,
    name: 'Sneha Verma',
    email: 'sneha.verma@example.com',
    phone: '+91 99887 66554',
    role: 'Student',
    joinDate: '2024-03-20',
    lastActive: '6 days ago',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
    totalCourses: 2,
    completedCourses: 0,
    avgProgress: 35,
    courses: [
      { id: 301, title: 'Marketing Fundamentals', category: 'Marketing', progress: 40, lessonsCompleted: 4, totalLessons: 10, enrollmentDate: '2024-03-22', lastActive: '1 week ago', status: 'In Progress' },
      { id: 302, title: 'Content Strategy', category: 'Marketing', progress: 30, lessonsCompleted: 3, totalLessons: 10, enrollmentDate: '2024-04-05', lastActive: '6 days ago', status: 'In Progress' },
    ],
  },
  {
    id: 4,
    name: 'Harsh Singh',
    email: 'harsh.singh@example.com',
    phone: '+91 97654 32109',
    role: 'Student',
    joinDate: '2024-02-14',
    lastActive: 'Just now',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    totalCourses: 5,
    completedCourses: 3,
    avgProgress: 77,
    courses: [
      { id: 401, title: 'Digital Marketing Masterclass', category: 'Marketing', progress: 100, lessonsCompleted: 14, totalLessons: 14, enrollmentDate: '2024-02-15', lastActive: '3 hours ago', status: 'Completed' },
      { id: 402, title: 'Productivity Systems', category: 'Business', progress: 83, lessonsCompleted: 15, totalLessons: 18, enrollmentDate: '2024-02-20', lastActive: '20 minutes ago', status: 'In Progress' },
      { id: 403, title: 'SQL Crash Course', category: 'Data', progress: 65, lessonsCompleted: 9, totalLessons: 14, enrollmentDate: '2024-03-10', lastActive: '1 hour ago', status: 'In Progress' },
      { id: 404, title: 'Brand Building', category: 'Business', progress: 100, lessonsCompleted: 8, totalLessons: 8, enrollmentDate: '2024-01-28', lastActive: '4 days ago', status: 'Completed' },
      { id: 405, title: 'AI for Professionals', category: 'Technology', progress: 50, lessonsCompleted: 7, totalLessons: 14, enrollmentDate: '2024-04-08', lastActive: 'Today', status: 'In Progress' },
    ],
  },
  {
    id: 5,
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    phone: '+91 98888 77661',
    role: 'Student',
    joinDate: '2024-04-09',
    lastActive: '3 days ago',
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    totalCourses: 1,
    completedCourses: 0,
    avgProgress: 12,
    courses: [
      { id: 501, title: 'Career Growth Essentials', category: 'Career', progress: 12, lessonsCompleted: 1, totalLessons: 8, enrollmentDate: '2024-04-10', lastActive: '3 days ago', status: 'Not Started' },
    ],
  },
]
