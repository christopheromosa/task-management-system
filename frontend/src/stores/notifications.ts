import { defineStore } from 'pinia'
import api from '@/api'
import type { Notification } from '@/types'

// interface Notification {
//   id: number
//   // title: string
//   message: string
//   created_at: string
//   is_read: boolean
// }

interface NotificationsState {
  notifications: Notification[]
}

export const useNotificationsStore = defineStore('notifications', {
  state: (): NotificationsState => ({
    notifications: [],
  }),

  actions: {
    async fetchNotifications() {
      const response = await api.notifications.list()
      this.notifications = response.data.data
    },

    async markAsRead(id: number) {
      await api.notifications.markAsRead(id)
      const notification = this.notifications.find((n) => n.id === id)
      if (notification) {
        notification.is_read = true
      }
    },
  },
})
