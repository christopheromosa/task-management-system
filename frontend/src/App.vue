<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { useRoute } from 'vue-router'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import UserLayout from '@/components/layouts/UserLayout.vue'
import { computed } from 'vue'


const route = useRoute()

const layout = computed(() => {
  const name = route.meta.layout || 'auth'
  return {
    auth: AuthLayout,
    admin: AdminLayout,
    user: UserLayout
  }[name]
})
</script>
