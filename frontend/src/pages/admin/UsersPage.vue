<template>
  <div class="container-fluid mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="fw-bold">Users</h2>
      <button class="btn btn-primary" @click="handleAddUser">
        <i class="bi bi-person-plus me-1"></i> Add User
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover shadow-sm rounded">
        <thead class="table-light">
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Rights</th>
            <th>Created At</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in nonAdminUsers" :key="user.id">
            <td>{{ formatName(user.name) }}</td>
            <td>{{ user.position }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="badge" :class="user.is_admin ? 'bg-success' : 'bg-secondary'">
                {{ user.is_admin ? 'Admin' : 'User' }}
              </span>
            </td>

            <td>{{ formatDate(user.created_at) }}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-secondary" @click="openUserDetails(user.id)">
                Manage
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Details Modal -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true"
      ref="modalRef">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">User Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div class="modal-body">
            <UserDetailsPage v-if="selectedUserId !== null" :userId="selectedUserId" :key="selectedUserId"
              @closed="reloadUsers" />

          </div>
        </div>
      </div>
    </div>
  </div>
  <AddUserDialog v-if="showAddUser" @close="showAddUser = false" />

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Modal } from 'bootstrap'

import UserDetailsPage from './UserDetailsPage.vue'
import { useUsersStore } from '../../stores/users'
import AddUserDialog from '../../components/users/AddUserDialog.vue'
import { computed } from 'vue'

const emit = defineEmits(['closed'])

const usersStore = useUsersStore()
const selectedUserId = ref<number | null>(null)
const modalRef = ref<HTMLDivElement | null>(null)
let modalInstance: Modal | null = null

const showAddUser = ref(false)



const nonAdminUsers = computed(() =>
  usersStore.users.filter(user => user.is_admin !== 1)
)


onUnmounted(() => {
  emit('closed') // ← emit this when modal is closed/unmounted
})

async function reloadUsers() {
  await usersStore.fetchUsers()
}


function handleAddUser() {
  showAddUser.value = true
}

function openUserDetails(userId: number) {
  selectedUserId.value = userId
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value)
    modalInstance.show()
  }
}

function handleModalClose() {
  selectedUserId.value = null
  reloadUsers() // ← force re-fetch after modal closes
}


onMounted(async () => {
  await usersStore.fetchUsers()

  if (modalRef.value) {
    // Attach event listener for when modal is hidden (dismissed or closed)
    modalRef.value.addEventListener('hidden.bs.modal', handleModalClose)
  }
})

onUnmounted(() => {
  // Remove event listener to avoid memory leaks
  if (modalRef.value) {
    modalRef.value.removeEventListener('hidden.bs.modal', handleModalClose)
  }
})
function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

function formatName(name: string) {
  return name.toLocaleUpperCase()
}

</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
