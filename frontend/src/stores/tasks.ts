import { defineStore } from 'pinia'
import api from '@/api'
import type { Task, TaskStatus } from '@/types/task'

interface TasksState {
  tasks: Task[]
}

export const useTasksStore = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks() {
      const response = await api.tasks.list()
      console.log(response.data)

      this.tasks = response.data // ✅ Paginated response
    },

    async fetchTasksByUserId(userId: number): Promise<Task[]> {
      const response = await api.tasks.userTasks(userId)
      console.log(response.data.data)

      return response.data.data // ✅ Correct
    },

    async createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
      const response = await api.tasks.create(taskData)
      const newTask = response.data.data
      this.tasks.push(newTask)
      return newTask
    },

    async updateTask(id: number, taskData: Partial<Task>) {
      const response = await api.tasks.update(id, taskData)
      const updatedTask = response.data.data

      const index = this.tasks.findIndex((t) => t.id === id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }

      return updatedTask
    },

    async updateTaskStatus(id: number, status: TaskStatus) {
      const response = await api.tasks.updateStatus(id, status)
      const updatedTask = response.data.data

      const index = this.tasks.findIndex((t) => t.id === id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }

      return updatedTask
    },

    async deleteTask(id: number) {
      await api.tasks.delete(id)
      this.tasks = this.tasks.filter((t) => t.id !== id)
    },
  },
})
