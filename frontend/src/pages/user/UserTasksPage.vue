<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">My Tasks</h3>
    </div>

    <!-- Status Filter Tabs -->
    <ul class="nav nav-pills mb-4 justify-content-start">
      <li class="nav-item" v-for="status in statuses" :key="status.value">
        <button class="nav-link" :class="{ active: currentStatus === status.value }"
          @click="currentStatus = status.value">
          {{ status.label }}
        </button>
      </li>
    </ul>

    <!-- Tasks Table -->
    <div class="table-responsive">
      <table class="table table-hover table-bordered shadow-sm">
        <thead class="table-light">
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in filteredTasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ formatDate(task.deadline) }}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-primary" @click="viewTaskDetails(task.id)">
                <i class="bi bi-eye"></i> View
              </button>
            </td>
          </tr>
          <tr v-if="filteredTasks.length === 0">
            <td colspan="3" class="text-center text-muted py-3">No tasks in this category.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Task Details Dialog -->
    <TaskDetailDialog v-if="selectedTaskId !== null" :taskId="selectedTaskId" @updated="refreshTasks"
      @close="selectedTaskId = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'


import { Task, TaskStatus } from '../../types'
import { useAuthStore } from '../../stores/auth'

import TaskDetailDialog from './TaskDetailDialog.vue'
import { useTasksStore } from '../../stores/tasks'

const tasks = ref<Task[]>([])
const selectedTaskId = ref<number | null>(null)
const tasksStore = useTasksStore()
const authStore = useAuthStore()

const currentStatus = ref<TaskStatus>('Pending')

const statuses: { label: string; value: TaskStatus }[] = [
  { label: 'Completed', value: 'Completed' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Pending', value: 'Pending' },
]

const filteredTasks = computed(() =>
  tasks.value.filter((task) => task.status === currentStatus.value)
)

onMounted(fetchUserTasks)

async function fetchUserTasks() {

  if (authStore.user) {
    // const res = await api.tasks.userTasks(auth.user.id)
    const res = await tasksStore.fetchTasksByUserId(authStore.user.id)
    tasks.value = res
  }
}

function viewTaskDetails(id: number) {
  selectedTaskId.value = id
}

function refreshTasks() {
  fetchUserTasks()
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}
</script>
