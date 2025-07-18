<template>
  <div class="modal fade" id="taskDetailsModal" tabindex="-1" ref="modalRef" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content shadow-sm">
        <div class="modal-header">
          <h5 class="modal-title">Task Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <!-- Top: Title and Deadline -->
          <div class="card mb-4 p-3 bg-light">
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="mb-0">{{ task.title }}</h4>
              <small class="text-muted">
                <i class="bi bi-calendar3"></i> {{ formatDate(task.deadline) }}
              </small>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <h6 class="fw-semibold">Description</h6>
            <p class="text-muted">{{ task.description || 'No description provided.' }}</p>
          </div>



          <!-- Status + Action -->
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>Status: </strong>
              <span class="badge px-3 py-2" :class="{
                'bg-success': task.status === 'Completed',
                'bg-warning text-dark': task.status === 'In Progress',
                'bg-secondary': task.status === 'Pending',
              }">
                {{ formatStatus(task.status) }}
              </span>
            </div>

            <div v-if="task.status !== 'Completed'">
              <button class="btn btn-primary" @click="updateStatus" :disabled="isLoading">
                <i class="bi bi-arrow-repeat me-1" :class="{ 'spinner-border spinner-border-sm': isLoading }"></i>
                {{ isLoading ? 'Updating...' : 'Update Status' }}
              </button>
            </div>

          </div>
          <!-- Assigned To -->
          <div class="mb-4">
            <div class="d-flex align-items-center justify-center gap-3">
              <p class="fw-semibold">By: </p>
              <div>
                <p>{{ task.assigned_by.email }}</p>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal, Toast } from 'bootstrap'
import { Task } from '../../types';
import api from '../../api';
import { onUnmounted } from 'vue'


const props = defineProps<{ taskId: number }>()
const emit = defineEmits(['updated', 'close'])

const modalRef = ref<HTMLDivElement | null>(null)

const task = ref<Task>({
  id: 0,
  title: '',
  description: '',
  deadline: '',
  status: 'Pending',
  assigned_to: {
    id: 0,
    name: '',
    position: 'Developer',
  },
  assigned_by: {
    name: '',
    email: ''
  },
  created_at: '',
  updated_at: '',
})









let modalInstance: Modal

onMounted(async () => {
  const res = await api.tasks.get(props.taskId)
  task.value = res.data

  modalInstance = new Modal(modalRef.value!)
  modalInstance.show()

  modalRef.value?.addEventListener('hidden.bs.modal', () => {
    emit('close')
  })
})


onUnmounted(() => {
  modalInstance?.dispose()
})




function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

function formatStatus(status: string) {
  return status.replace('_', ' ').toUpperCase()
}

function getNextStatus(current: Task['status']): Task['status'] {
  if (current === 'Pending') return 'In Progress'
  if (current === 'In Progress') return 'Completed'
  return 'Completed'
}

const isLoading = ref(false)

async function updateStatus() {
  if (isLoading.value) return

  isLoading.value = true
  try {
    const next = getNextStatus(task.value.status)
    await api.tasks.updateStatus(task.value.id, next)
    task.value.status = next
    showToast('Task status updated', 'success')

    Modal.getInstance(modalRef.value!)?.hide()
    emit('updated')
  } catch (error) {
    console.error(error)
    showToast('Failed to update task status', 'danger')
  } finally {
    isLoading.value = false
  }
}


function showToast(message: string, type: string) {
  const toast = document.createElement('div')
  toast.className = `toast align-items-center text-white bg-${type} border-0 position-fixed bottom-0 end-0 m-3`
  toast.setAttribute('role', 'alert')
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `
  document.body.appendChild(toast)
  const bsToast = new Toast(toast)
  bsToast.show()
  setTimeout(() => toast.remove(), 4000)
}
</script>
