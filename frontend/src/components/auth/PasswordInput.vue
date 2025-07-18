<template>
  <div class="relative">
    <Input :type="showPassword ? 'text' : 'password'" v-bind="$attrs" />
    <button
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2"
      @click="showPassword = !showPassword"
    >
      <Eye v-if="showPassword" class="h-4 w-4 text-muted-foreground" />
      <EyeOff v-else class="h-4 w-4 text-muted-foreground" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

const showPassword = ref(false)
</script>