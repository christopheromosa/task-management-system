<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content shadow">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">Add New User</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-body row g-3">
            <div class="col-md-6">
              <label class="form-label">Name</label>
              <input v-model="form.name" type="text" class="form-control" required />
            </div>

            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" required />
            </div>

            <div class="col-md-6">
              <label class="form-label">Position</label>
              <select v-model="form.position" class="form-select" required>
                <option value="Freelancer">Freelancer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Status</label>
              <select v-model="form.status" class="form-select" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <!-- Is Admin Checkbox -->
            <div class="mb-3 form-check">
              <input id="is_admin" type="checkbox" class="form-check-input" v-model="form.is_admin" />
              <label for="is_admin" class="form-check-label">Register as Admin</label>
            </div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
            <button type="submit" class="btn btn-success">Add User</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUsersStore } from '../../stores/users'


const emit = defineEmits(['close'])

const usersStore = useUsersStore()

const form = reactive({
  name: '',
  email: '',
  position: 'Freelancer',
  status: 'active',
  is_admin: false
})

async function handleSubmit() {
  try {
    await usersStore.createUser(form)
    emit('close')
  } catch (err) {
    console.error('User creation failed:', err)
  }
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
