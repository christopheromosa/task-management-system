export type NotificationType = 'info' | 'warning' | 'success' | 'error'

export interface Notification {
  id: number
  title: string
  message: string
  type: NotificationType
  timestamp: string
  is_read: boolean
}
