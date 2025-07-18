<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center mb-4">
              <i class="bi bi-person-circle display-1 text-secondary me-4"></i>
              <div>
                <h4 class="mb-0">{{ user.name }}</h4>
                <p class="text-muted mb-0">{{ user.position }}</p>
              </div>
              <div class="ms-auto">
                <button class="btn btn-outline-primary" @click="editProfile">
                  <i class="bi bi-pencil me-1"></i> Edit Profile
                </button>
              </div>
            </div>

            <hr />

            <div class="row">
              <div class="col-md-6 mb-3">
                <h6 class="text-muted">Email</h6>
                <p>{{ user.email }}</p>
              </div>

              <div class="col-md-6 mb-3">
                <h6 class="text-muted">Status</h6>
                <span class="badge" :class="user.status === 'active' ? 'bg-success' : 'bg-secondary'">
                  {{ user.status }}
                </span>
              </div>

              <div class="col-md-6 mb-3">
                <h6 class="text-muted">Account Created</h6>
                <p>{{ formatDate(user.created_at) }}</p>
              </div>

              <div class="col-md-6 mb-3">
                <h6 class="text-muted">Last Updated</h6>
                <p>{{ formatDate(user.updated_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal (optional if needed later) -->
    <!-- <EditProfileDialog v-if="showEdit" :user="user" @close="showEdit = false" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { User } from '../../types'


const auth = useAuthStore()
const user = ref<User>(auth.user!)
// const showEdit = ref(false)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString()
}

function editProfile() {

  alert('coming soon...still in development')
  // showEdit.value = true
}
</script>
