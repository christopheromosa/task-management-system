<!-- src/components/users/DeleteUserDialog.vue -->
<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content shadow">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">Confirm Delete</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this user? This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="$emit('close')">Cancel</button>
          <button class="btn btn-danger" @click="confirmDelete">Yes, Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '../../api';



const props = defineProps<{ userId: number }>()
const emit = defineEmits(['close', 'deleted'])

async function confirmDelete() {
  const response = await api.users.delete(props.userId)
  console.log(response);

  emit('deleted')
  emit('close')
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
