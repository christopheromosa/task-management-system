import { defineStore } from 'pinia'
import api from '@/api/client' // ✅ use raw axios to avoid circular deps
import type { User } from '@/types/user'
import type { ApiResponse } from '@/types/api'

interface UsersState {
  users: User[]
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
  }),

  actions: {
    async fetchUsers() {
      const response = await api.get<User[]>('/users')
      // console.log(response.data)

      this.users = response.data
    },

    async fetchUserById(userId: number): Promise<User> {
      const response = await api.get<User>(`/users/${userId}`)
      console.log(response.data);
      
      return response.data
    },

    async createUser(userData: Omit<User, 'id'>) {
      const response = await api.post<ApiResponse<User>>('/users', userData)
      this.users.push(response.data.data) // ✅ Correct

      return response.data
    },

    async updateUser(id: number, userData: Partial<User>) {
      const response = await api.put<ApiResponse<User>>(`/users/${id}`, userData)
      const index = this.users.findIndex((u) => u.id === id)
      if (index !== -1) {
        this.users[index] = response.data.data
      }
      return response.data
    },

    async deleteUser(id: number) {
      await api.delete(`/users/${id}`)
      this.users = this.users.filter((u) => u.id !== id)
    },
  },
})
