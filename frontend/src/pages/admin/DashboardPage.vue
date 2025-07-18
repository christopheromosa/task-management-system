<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mt-3 mb-4">
      <div>
        <h2 class="fw-bold">Admin Dashboard</h2>
        <p class="text-muted">{{ currentDate }} | {{ currentTime }}</p>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-3" v-for="card in cards" :key="card.title">
        <div class="card shadow-sm h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h6 class="card-title text-muted">{{ card.title }}</h6>
              <h3 class="fw-bold">{{ card.count }}</h3>
            </div>
            <div class="text-end text-secondary">
              <i :class="card.icon" style="font-size: 1.5rem;"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Task Status Overview</div>
      <div class="card-body">
        <canvas ref="chartCanvas" height="100"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useUsersStore } from '../../stores/users'
import { useTasksStore } from '../../stores/tasks'


Chart.register(...registerables)

const usersStore = useUsersStore()
const tasksStore = useTasksStore()

const currentDate = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
const currentTime = new Date().toLocaleTimeString()

const chartCanvas = ref<HTMLCanvasElement | null>(null)

const cards = ref([
  { title: 'Total Users', count: 0, icon: 'bi bi-people' },
  { title: 'Total Tasks', count: 0, icon: 'bi bi-list-task' },
  { title: 'Completed Tasks', count: 0, icon: 'bi bi-check-circle' },
  { title: 'In Progress / Pending', count: 0, icon: 'bi bi-clock-history' },
])

onMounted(async () => {
  await usersStore.fetchUsers()
  await tasksStore.fetchTasks()

  const completed = tasksStore.tasks.filter((t) => t.status === 'Completed').length
  const inProgress = tasksStore.tasks.filter((t) => t.status === 'In Progress').length
  const pending = tasksStore.tasks.filter((t) => t.status === 'Pending').length

  cards.value[0].count = usersStore.users.length
  cards.value[1].count = tasksStore.tasks.length
  cards.value[2].count = completed
  cards.value[3].count = inProgress + pending

  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Pending', 'In Progress', 'Completed'],
        datasets: [
          {
            label: 'Tasks',
            data: [pending, inProgress, completed],
            backgroundColor: ['#ffc107', '#0d6efd', '#198754'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
          },
        },
      },
    })
  }
})
</script>

<style scoped>
.card {
  border-radius: 0.75rem;
}
</style>
