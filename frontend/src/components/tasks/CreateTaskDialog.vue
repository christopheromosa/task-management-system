<template>
  <div class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-sm">
        <div class="modal-header">
          <h5 class="modal-title fw-bold">Create Task</h5>
          <button type="button" class="btn-close" @click="$emit('close')" />
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-body">
            <div class="mb-3">
              <label for="title" class="form-label">Task Name</label>
              <input type="text" class="form-control" id="title" v-model="task.title" required />
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="3" v-model="task.description" />
            </div>

            <div class="mb-3">
              <label for="deadline" class="form-label">Deadline</label>
              <input type="date" class="form-control" id="deadline" v-model="task.deadline" required />
            </div>

            <div class="mb-3">
              <label for="assigned_to" class="form-label">Assign To</label>
              <select class="form-select" id="assigned_to" v-model="task.assigned_to" required>
                <option value="" disabled>Select User</option>
                <option v-for="user in usersStore.users" :key="user.id" :value="user.id">
                  {{ user.name }} - {{ user.position }}
                </option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              <i class="bi me-1" :class="isLoading ? 'bi-hourglass-split' : 'bi-check-circle'"></i>
              {{ isLoading ? 'Sending Email...' : 'Create Task' }}
            </button>

          </div>
        </form>
      </div>
    </div>

    <!-- Toast -->
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1100">
      <div class="toast align-items-center text-white bg-success border-0" role="alert" ref="toastRef">
        <div class="d-flex">
          <div class="toast-body">
            Email about the task is sent successfully!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { Toast } from 'bootstrap'
import { useTasksStore } from '../../stores/tasks'
import { useUsersStore } from '../../stores/users'

const emit = defineEmits(['close', 'task-created'])

const tasksStore = useTasksStore()
const usersStore = useUsersStore()
const toastRef = ref<HTMLDivElement | null>(null)
const isLoading = ref(false)

onMounted(async () => {
  if (usersStore.users.length === 0) {
    await usersStore.fetchUsers()
  }
})

const task = reactive({
  title: '',
  description: '',
  deadline: '',
  assigned_to: '',
})

async function handleSubmit() {
  try {
    isLoading.value = true

    await tasksStore.createTask({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      assigned_to: Number(task.assigned_to),
    })

    showToast()
    emit('task-created')

    // Give time for toast to be visible (1.5s), then close
    setTimeout(() => {
      emit('close')
      isLoading.value = false
    }, 1500)
  } catch (err) {
    alert('❌ Failed to create task. Check your inputs or try again.')
    console.error(err)
    isLoading.value = false
  }
}

function showToast() {
  if (toastRef.value) {
    const toast = new Toast(toastRef.value)
    toast.show()
  }
}

</script>

<style scoped>
.modal {
  z-index: 1050;
}
</style>
