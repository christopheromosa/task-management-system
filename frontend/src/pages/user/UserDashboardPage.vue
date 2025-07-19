<template>
  <div class="container-fluid mt-4">
    <!-- Welcome Message -->
    <div class="mb-4">
      <h2 class="fw-bold">Welcome, {{ authStore.user?.name || 'User' }}</h2>
      <p class="text-muted">Here’s a quick overview of your tasks.</p>
    </div>

    <!-- Task Summary Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-4" v-for="summary in taskSummary" :key="summary.label">
        <div :class="['card shadow-sm border-start-4 border-3', summary.borderClass]">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="fw-semibold text-uppercase text-muted small mb-1">{{ summary.label }}</h6>
                <h3 class="fw-bold">{{ summary.count }}</h3>
              </div>
              <i :class="['bi fs-1 text-secondary', summary.icon]"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Tasks Table -->
    <div class="card shadow-sm">
      <div class="card-header bg-light fw-semibold">Recent Tasks</div>
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in recentTasks" :key="task.id">
              <td>{{ task.title }}</td>
              <td>
                <span class="badge" :class="{
                  'bg-success': task.status === 'Completed',
                  'bg-warning text-dark': task.status === 'In Progress',
                  'bg-secondary': task.status === 'Pending'
                }">
                  {{ formatStatus(task.status) }}
                </span>
              </td>
              <td>{{ formatDate(task.deadline) }}</td>
            </tr>
            <tr v-if="recentTasks.length === 0">
              <td colspan="3" class="text-center py-3">No tasks found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

import { useTasksStore } from '../../stores/tasks'
import { Task } from '../../types'



const authStore = useAuthStore()
const tasksStore = useTasksStore()
const tasks = ref<Task[]>([])

const taskSummary = computed(() => {
  return [
    {
      label: 'Completed',
      count: tasks.value.filter((t) => t.status === 'Completed').length,
      icon: 'bi-check-circle',
      borderClass: 'border-success'
    },
    {
      label: 'In Progress',
      count: tasks.value.filter((t) => t.status === 'In Progress').length,
      icon: 'bi-clock-history',
      borderClass: 'border-warning'
    },
    {
      label: 'Pending',
      count: tasks.value.filter((t) => t.status === 'Pending').length,
      icon: 'bi-hourglass-split',
      borderClass: 'border-secondary'
    }
  ]
})

// const recentTasks = computed(() => tasks.value.slice(0, 5))
const recentTasks = computed(() =>
  [...tasks.value]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
)


function formatStatus(status: string) {
  return status.replace('_', ' ').toUpperCase()
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

onMounted(async () => {
  if (authStore.user) {
    const res = await tasksStore.fetchTasksByUserId(authStore.user.id)
    // const res = await api.tasks.userTasks(authStore.user.id)
    tasks.value = res
  }
})
</script>
