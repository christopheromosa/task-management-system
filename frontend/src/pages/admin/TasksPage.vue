<template>
  <div class="container-fluid mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Tasks</h2>
      <button class="btn btn-primary" @click="showCreateModal = true">
        <i class="bi bi-plus-circle me-1"></i> Create Task
      </button>
    </div>

    <div class="row g-4">
      <div class="col-md-4" v-for="(column, status) in taskColumns" :key="status">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-light text-center fw-semibold text-uppercase">
            {{ formatStatus(status) }}
          </div>
          <div class="card-body p-2 overflow-auto" style="max-height: 70vh;">
            <div v-if="column.length === 0" class="text-muted text-center small">
              No {{ formatStatus(status).toLowerCase() }} tasks
            </div>

            <div v-for="task in column" :key="task.id" class="card mb-3 border shadow-sm">
              <div class="card-body">
                <h6 class="card-title mb-1">{{ task.title }}</h6>
                <p class="card-text small text-muted mb-2">{{ task.description }}</p>
                <p class="card-text mb-0">
                  <strong>Deadline:</strong> {{ formatDate(task.deadline) }}
                </p>
              </div>
              <div class="card-footer bg-white border-top-0 text-end flex justify-between">
                <span> <strong>To:</strong> {{ task.assigned_to.name }}</span>
                <span class="badge" :class="{
                  'bg-success': task.status === 'Completed', 'bg-warning text-dark':
                    task.status === 'In Progress', 'bg-secondary': task.status === 'Pending',
                }">
                  {{ formatStatus(task.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Task Dialog -->
    <CreateTaskDialog v-if="showCreateModal" @close="showCreateModal = false" @task-created="handleTaskCreated" />

  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import CreateTaskDialog from '@/components/tasks/CreateTaskDialog.vue'
import { useTasksStore } from '../../stores/tasks'
import { Task } from '../../types'

const tasksStore = useTasksStore()
const showCreateModal = ref(false)

onMounted(async () => {
  await tasksStore.fetchTasks()
})

async function handleTaskCreated() {
  await tasksStore.fetchTasks() // Re-fetch the tasks
  showCreateModal.value = false
}

const taskColumns = computed(() => {
  const groups: Record<string, Task[]> = {
    "Pending": [],
    "In Progress": [],
    "Completed": [],
  }

  // Sort by latest first (newest deadline or created_at)
  const sortedTasks = [...tasksStore.tasks].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  for (const task of sortedTasks) {
    groups[task.status]?.push(task)
  }

  return groups
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

function formatStatus(status: string) {
  return status.replace('_', ' ').toUpperCase()
}
</script>

<style scoped>
.card-body::-webkit-scrollbar {
  width: 6px;
}

.card-body::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
</style>
