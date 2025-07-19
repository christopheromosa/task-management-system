<template>
  <div class="auth-layout">
    <div class="auth-box shadow-sm">
      <h2 class="text-center mb-4 fw-bold text-primary">Task Manager (Sign-in)</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="form.email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" id="password" class="form-control"
              v-model="form.password" />
            <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100 d-flex align-items-center justify-content-center"
          :disabled="isLoading">
          <span v-if="!isLoading">Login</span>
          <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>

        <p class="text-center mt-3 text-muted">
          Don't have an account?
          <RouterLink to="/register" class="text-decoration-none fw-medium">Register</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const showPassword = ref(false)
const form = ref({ email: '', password: '' })
const isLoading = ref(false)
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  try {
    await authStore.login(form.value)
    console.log(authStore.isAdmin);
    router.push(authStore.isAdmin ? '/admin/admin-dashboard' : '/user/user-dashboard')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  width: 100%;
  background: linear-gradient(to right, #e9eff5, #dee2e7);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-box {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .auth-box {
    padding: 1.5rem;
    margin: 0 1rem;
  }
}

@media (max-width: 576px) {
  .auth-box {
    padding: 1.25rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}

/* Input group button styling */
.input-group button {
  border-color: #ced4da;
}

.input-group button:hover {
  background-color: #f8f9fa;
}

/* Loading spinner alignment */
.spinner-border {
  margin: 0 auto;
  display: inline-block;
}
</style>