export type StudentNotification = {
  id: number
  title: string
  message: string
  time: string
  type: 'Course' | 'Reminder' | 'Quiz' | 'System'
  unread: boolean
}

export const studentNotifications: StudentNotification[] = [
  {
    id: 1,
    title: 'New lesson unlocked',
    message: 'A new lesson has been added to your React Fundamentals course.',
    time: '2 hours ago',
    type: 'Course',
    unread: true,
  },
  {
    id: 2,
    title: 'Quiz reminder',
    message: 'Your JavaScript quiz is due tomorrow at 11:59 PM.',
    time: '1 day ago',
    type: 'Quiz',
    unread: true,
  },
  {
    id: 3,
    title: 'Learning streak',
    message: 'Great work! You have maintained a 5-day learning streak.',
    time: '2 days ago',
    type: 'Reminder',
    unread: false,
  },
  {
    id: 4,
    title: 'Certificate ready',
    message: 'Your certificate for UI/UX Design Basics is now available.',
    time: '4 days ago',
    type: 'System',
    unread: false,
  },
]
