export type NotificationAudience = 'All Students' | 'Course Students' | 'Selected Users' | 'Admins'
export type NotificationType = 'Announcement' | 'Reminder' | 'System Update' | 'Warning'
export type NotificationPriority = 'Normal' | 'High' | 'Urgent'
export type NotificationStatus = 'Draft' | 'Published' | 'Scheduled'

export type NotificationItem = {
  id: number
  title: string
  message: string
  audience: NotificationAudience
  courseName?: string
  type: NotificationType
  priority: NotificationPriority
  status: NotificationStatus
  sentAt: string
  scheduledAt?: string
  recipients: number
  unread: number
}

export const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    title: 'React Fundamentals quiz reminder',
    message: 'A friendly reminder that the React Fundamentals quiz closes tomorrow at 11:59 PM. Please complete it before the deadline.',
    audience: 'Course Students',
    courseName: 'React Fundamentals',
    type: 'Reminder',
    priority: 'High',
    status: 'Published',
    sentAt: '2026-08-28',
    recipients: 182,
    unread: 24,
  },
  {
    id: 2,
    title: 'New JavaScript lesson published',
    message: 'We have published a new advanced DOM manipulation lesson with practical examples and practice tasks.',
    audience: 'All Students',
    type: 'Announcement',
    priority: 'Normal',
    status: 'Published',
    sentAt: '2026-08-24',
    recipients: 540,
    unread: 58,
  },
  {
    id: 3,
    title: 'Platform maintenance notice',
    message: 'The platform will undergo a short maintenance window on Saturday from 1:00 AM to 2:00 AM for server improvements.',
    audience: 'All Students',
    type: 'System Update',
    priority: 'Urgent',
    status: 'Scheduled',
    scheduledAt: '2026-09-05 01:00',
    sentAt: '2026-08-20',
    recipients: 620,
    unread: 12,
  },
  {
    id: 4,
    title: 'Deadline extension for UI/UX assignment',
    message: 'The submission deadline for the UI/UX design assignment has been extended by 48 hours. Please submit before Friday.',
    audience: 'Course Students',
    courseName: 'UI/UX Design Basics',
    type: 'Announcement',
    priority: 'High',
    status: 'Published',
    sentAt: '2026-08-18',
    recipients: 90,
    unread: 9,
  },
]
