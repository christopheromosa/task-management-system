<template>
  <div class="d-flex vh-100">
    <!-- Sidebar -->
    <nav class="bg-primary text-white p-3 sidebar">
      <h4 class="mb-4">User Panel</h4>
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink to="/user/user-dashboard" class="nav-link text-white"
            :class="{ 'router-link-active': route.path === '/user/user-dashboard' }">
            🏠 Dashboard
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/user/tasks" class="nav-link text-white"
            :class="{ 'router-link-active': route.path === '/user/tasks' }">
            📝 Tasks
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/user/notifications" class="nav-link text-white"
            :class="{ 'router-link-active': route.path === '/user/notifications' }">
            🔔 Notifications
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/user/user-profile" class="nav-link text-white"
            :class="{ 'router-link-active': route.path === '/user/user-profile' }">
            🙍‍♂️ Profile
          </RouterLink>
        </li>
        <li class="nav-item mt-4">
          <button @click="logout" class="btn btn-outline-light w-100">
            🚪 Logout
          </button>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow-1 p-4 bg-light overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout(router)
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  min-height: 100vh;
  position: sticky;
  top: 0;
}

.nav-link.router-link-active {
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}
</style>
