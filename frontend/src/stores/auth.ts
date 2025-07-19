import { defineStore } from 'pinia'
import { User } from '../types'
import api from '../api/client'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),

  getters: {
    isAdmin: (state) => state.user?.is_admin === true,
    role: (state) => (state.user?.is_admin ? 'admin' : 'user'),
  },

  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        const { data } = await api.post('/login', credentials)

        this.user = data.user
        this.isAuthenticated = true

        localStorage.setItem('token', data.access_token)
        api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
      } catch (error: any) {
        const message = error.response?.data?.message || 'Login failed'
        throw new Error(message)
      }
    },

    async logout(router?: any) {
      try {
        await api.post('/logout')
      } catch (error: any) {
        console.error('Logout failed:', error)
      } finally {
        this.resetAuthState()
        if (router) router.push('/login')
      }
    },
    async register(payload: { name: string; email: string; password: string; is_admin: boolean }) {
      try {
        const { data } = await api.post('/register', payload)
        this.user = data.user
        this.isAuthenticated = true

        localStorage.setItem('token', data.access_token)
        api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
      } catch (error: any) {
        const message = error.response?.data?.message || 'Registration failed'
        throw new Error(message)
      }
    },
    async fetchUser() {
      try {
        const { data } = await api.get('/user')
        this.user = data
        this.isAuthenticated = true
      } catch (error) {
        this.resetAuthState()
        console.error(error)
      }
    },

    resetAuthState() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    },

    initAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        this.fetchUser()
      }
    },
  },
})
