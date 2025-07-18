<template>
  <div class="container py-4">
    <!-- ROW 1: Profile + Actions -->
    <div class="row align-items-start mb-4">
      <!-- LEFT: Profile Info -->
      <div class="col-md-8 d-flex align-items-center">
        <div class="me-4">
          <i class="bi bi-person-circle" style="font-size: 5rem; color: #6c757d;"></i>
        </div>
        <div>
          <h4 class="mb-1">{{ user.name }}</h4>
          <p class="mb-1">{{ user.email }}</p>
          <p class="mb-1 text-muted">{{ user.position }}</p>
          <span class="badge" :class="user.status === 'active' ? 'bg-success' : 'bg-secondary'">
            {{ user.status }}
          </span>
          <p v-if="Number(user.is_admin) == 1">admin</p>
          <p v-else>User</p>
        </div>
      </div>

      <!-- RIGHT: Action Buttons -->
      <div class="col-md-4 text-end">
        <button class="btn btn-outline-primary me-2" @click="openEditDialog">
          <i class="bi bi-pencil"></i> Edit
        </button>
        <button class="btn btn-outline-danger" @click="openDeleteDialog">
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>

    <!-- ROW 2: Task Table -->
    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-light fw-semibold">User Tasks</div>
          <div class="card-body p-0">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in tasks" :key="task.id">
                  <td>{{ task.title }}</td>
                  <td>
                    <span class="badge" :class="{
                      'bg-success': task.status === 'Completed', 'bg-warning text-dark':
                        task.status === 'In Progress', 'bg-secondary': task.status === 'Pending',
                    }">
                      {{ formatStatus(task.status) }}
                    </span>
                  </td>
                  <td>{{ formatDate(task.deadline) }}</td>
                </tr>
                <tr v-if="tasks.length === 0">
                  <td colspan="3" class="text-center py-3">No tasks assigned.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals (edit/delete) -->
    <EditUserDialog v-if="showEdit" :user="user" @close="showEdit = false" @updated="handleUserUpdated" />
    <DeleteUserDialog v-if="showDelete" :userId="user.id" @close="showDelete = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'


import { Task, User } from '../../types';
import api from '../../api';
import EditUserDialog from '../../components/users/EditUserDialog.vue';
import DeleteUserDialog from '../../components/users/DeleteUserDialog.vue';
import { useUsersStore } from '../../stores/users';
import { watch } from 'vue'


// Props
const props = defineProps<{
  userId: number
}>()

// State
const user = ref<User>({
  id: 0,
  name: '',
  email: '',
  position: 'Developer',
  status: 'inactive',
  is_admin: false,
  created_at: '',
  updated_at: '',
})


// console.log(user.value);

const tasks = ref<Task[]>([])
const showEdit = ref(false)
const showDelete = ref(false)
const userStore = useUsersStore()




watch(() => props.userId, async (newId) => {
  if (newId) {
    await loadUserAndTasks(newId)
  }
})

onMounted(async () => {
  await loadUserAndTasks(props.userId)
})

async function loadUserAndTasks(id: number) {
  const userRes = await userStore.fetchUserById(id)
  user.value = userRes

  const tasksRes = await api.tasks.userTasks(id)
  tasks.value = tasksRes.data.data
}



async function handleUserUpdated() {
  const userRes = await userStore.fetchUserById(props.userId)
  user.value = userRes
}



function formatStatus(status: string) {
  return status.replace('_', ' ').toUpperCase()
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

function openEditDialog() {
  showEdit.value = true
}

function openDeleteDialog() {
  showDelete.value = true
}
// function handleUserDeleted() {
//   // Redirect or show notification
//   router.push('/admin/users') // example route
// }

</script>
