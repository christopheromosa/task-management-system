<!-- src/components/users/EditUserDialog.vue -->
<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content shadow">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">Edit User</h5>
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
              <select v-model="form.position" class="form-select">
                <option value="Freelancer">Freelancer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Status</label>
              <select v-model="form.status" class="form-select">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { User } from '../../types';
import { useUsersStore } from '../../stores/users';




const props = defineProps<{ user: User }>()
const emit = defineEmits(['close', 'updated'])
const userStore = useUsersStore()

const form = reactive({
  name: props.user.name,
  email: props.user.email,
  position: props.user.position,
  status: props.user.status,
})

async function handleSubmit() {
  // const updatedUser = await api.users.update(props.user.id, form)
  const updatedUser = await userStore.updateUser(props.user.id, form)
  emit('updated', updatedUser.data)
  emit('close')
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
