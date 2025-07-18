<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between pb-2">
      <CardTitle class="text-sm font-medium">
        {{ title }}
      </CardTitle>
      <component :is="icons[icon]" class="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">{{ value }}</div>
      <p class="text-xs text-muted-foreground mt-1">
        <template v-if="trend === 'up'">↑ Increased</template>
        <template v-else-if="trend === 'down'">↓ Decreased</template>
        <template v-else>↔ Stable</template>
      </p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Clock, Users, Activity, CheckCircle } from 'lucide-vue-next'

defineProps<{
  title: string
  value: number
  icon: 'users' | 'clock' | 'activity' | 'check-circle'
  trend?: 'up' | 'down' | 'neutral'
}>()

const icons = {
  users: Users,
  clock: Clock,
  activity: Activity,
  'check-circle': CheckCircle
}
</script>