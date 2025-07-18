<!-- src/components/layouts/AuthLayout.vue -->
<template>
  <div class="d-flex vh-100 justify-center place-items-center">

    <router-view /> <!-- Login or Register will be injected here -->

  </div>
</template>

<script setup lang="ts">
// No need for script logic since we're not doing page checks
</script>

<style scoped></style>
