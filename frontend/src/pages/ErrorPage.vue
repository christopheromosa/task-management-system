<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
    <div class="mb-4">
      <i class="bi bi-exclamation-triangle-fill text-danger display-1"></i>
    </div>
    <h1 class="display-4 fw-bold">Oops! Something went wrong.</h1>
    <p class="text-muted fs-5">The page you are looking for might be missing or an error occurred.</p>
    <router-link to="/login" class="btn btn-primary mt-3">
      <i class="bi bi-house-door-fill me-1"></i> Go to Home
    </router-link>
  </div>
</template>

<script setup lang="ts">
</script>
