/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './client'
import { useAuthStore } from '@/stores/auth'
import type { LoginResponse, ApiResponse, PaginatedResponse, ErrorResponse } from '@/types/api'
import type { Notification, Task, TaskStatus, User } from '@/types'
import axios from 'axios'

// Request Interceptor
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response Interceptor

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore()

    // Optional: Handle 401 Unauthorized by resetting auth state
    if (error.response?.status === 401) {
      authStore.resetAuthState()
      // Optionally redirect to login page
      // router.push('/login')
    }

    return Promise.reject(error.response?.data || error)
  },
)

// Now export API methods (same as before, no changes needed here)
export default {
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post<LoginResponse>('/api/login', credentials),
    logout: () => api.post('/api/logout'),
    register: (userData: any) => api.post<ApiResponse<User>>('/api/register', userData),
    me: () => api.get<ApiResponse<User>>('api/user'),
  },
  users: {
    list: (params?: any) => api.get<PaginatedResponse<User>>('api/users', { params }),
    create: (userData: any) => api.post<ApiResponse<User>>('api/users', userData),
    get: (id: number) => api.get<ApiResponse<User>>(`api/users/${id}`),
    update: (id: number, userData: any) => api.put<ApiResponse<User>>(`api/users/${id}`, userData),
    delete: (id: number) => api.delete(`/users/${id}`),
  },
  tasks: {
    list: (params?: any) => api.get<Task[]>('/tasks', { params }),
    create: (taskData: any) => api.post<ApiResponse<Task>>('/tasks', taskData),
    get: (id: number) => api.get<ApiResponse<Task>>(`/tasks/${id}`),
    update: (id: number, taskData: any) => api.put<ApiResponse<Task>>(`/tasks/${id}`, taskData),
    updateStatus: (id: number, status: TaskStatus) =>
      api.patch<ApiResponse<Task>>(`/tasks/${id}/status`, { status }),
    delete: (id: number) => api.delete(`/tasks/${id}`),
    userTasks: (userId: number) => api.get<ApiResponse<Task[]>>(`/user/${userId}/tasks`),
  },
  notifications: {
    list: () => api.get<ApiResponse<Notification[]>>('/notifications'),
    markAsRead: (id: number) => api.patch(`/notifications/${id}/read`),
  },
  handleError: (error: any): ErrorResponse => {
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data.message || 'An error occurred',
        errors: error.response.data.errors,
        status: error.response.status,
      }
    }
    return {
      message: error.message || 'Network Error',
      status: 500,
    }
  },
}
