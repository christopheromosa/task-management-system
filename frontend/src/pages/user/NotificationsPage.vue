<template>
  <div class="container py-4">
    <h3 class="fw-bold mb-4">Notifications</h3>

    <div v-if="notifications.length === 0" class="alert alert-info text-center">
      <i class="bi bi-bell-slash-fill me-2"></i>Feature coming soon....
    </div>

    <ul class="list-group shadow-sm">
      <li v-for="notification in notifications" :key="notification.id"
        class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-semibold">
            <i :class="iconClass(notification.type)" class="me-2"></i>
            {{ notification.title }}
          </div>
          <small class="text-muted">{{ formatDate(notification.timestamp) }}</small>
        </div>
        <span class="badge" :class="badgeClass(notification.type)">
          {{ notification.type }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Notification } from '../../types'
import api from '../../api'

// State
const notifications = ref<Notification[]>([])

onMounted(async () => {
  try {
    const res = await api.notifications.list()
    notifications.value = res.data
  } catch (err) {
    console.error('Failed to fetch notifications', err)
  }
})

// Helpers
function formatDate(date: string) {
  return new Date(date).toLocaleString()
}

function badgeClass(type: string) {
  switch (type) {
    case 'info':
      return 'bg-primary'
    case 'warning':
      return 'bg-warning text-dark'
    case 'success':
      return 'bg-success'
    case 'error':
      return 'bg-danger'
    default:
      return 'bg-secondary'
  }
}

function iconClass(type: string) {
  switch (type) {
    case 'info':
      return 'bi bi-info-circle-fill'
    case 'warning':
      return 'bi bi-exclamation-triangle-fill'
    case 'success':
      return 'bi bi-check-circle-fill'
    case 'error':
      return 'bi bi-x-circle-fill'
    default:
      return 'bi bi-bell-fill'
  }
}
</script>
