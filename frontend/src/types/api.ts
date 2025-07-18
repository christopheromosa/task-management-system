import type { Task } from './task'
import type { User } from './user'

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  per_page: number
  total: number
}

// Auth responses
export interface LoginResponse {
  user: User
  access_token: string
}

// Task responses
export type TaskResponse = ApiResponse<Task>
export type TaskListResponse = ApiResponse<Task[]> | PaginatedResponse<Task>

// User responses
export type UserResponse = ApiResponse<User>
export type UserListResponse = ApiResponse<User[]> | PaginatedResponse<User>

// Notification responses
export type NotificationResponse = ApiResponse<Notification>
export type NotificationListResponse = ApiResponse<Notification[]> | PaginatedResponse<Notification>

// Error response
export interface ErrorResponse {
  message: string
  errors?: Record<string, string[]>
  status?: number
}
