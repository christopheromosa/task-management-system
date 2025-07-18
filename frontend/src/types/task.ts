// task.ts
import type { User } from './user'

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed'

export interface Task {
  id: number
  title: string
  description: string
  assigned_to: Pick<User, 'id' | 'name' | 'position'>
  assigned_by: Pick<User,'email'|'name'>
  deadline: string
  status: TaskStatus
  created_at: string
  updated_at: string
}

export type TaskCreatePayload = Omit<
  Task,
  'id' | 'created_at' | 'updated_at' | 'assigned_to' | 'assigned_by'
> & {
  assigned_to: number
}

export type TaskUpdatePayload = Partial<TaskCreatePayload> & {
  status?: TaskStatus
}
