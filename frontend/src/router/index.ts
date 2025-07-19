import { createRouter, createWebHistory } from 'vue-router'

// Auth pages
import LoginForm from '../components/auth/LoginForm.vue'
import RegisterForm from '../components/auth/RegisterForm.vue'

// Admin pages
import AdminDashboard from '../pages/admin/DashboardPage.vue'
import UsersPage from '../pages/admin/UsersPage.vue'
import TasksPage from '../pages/admin/TasksPage.vue'
import ProfilePage from '../pages/admin/ProfilePage.vue'

// User pages
// import UserDashboard from '@/pages/user/DashboardPage.vue'

// Store
import { useAuthStore } from '../stores/auth'
import UserDashboardPage from '../pages/user/UserDashboardPage.vue'
import NotificationsPage from '../pages/user/NotificationsPage.vue'
import UserProfilePage from '../pages/user/UserProfilePage.vue'
import UserTasksPage from '../pages/user/UserTasksPage.vue'

const routes = [
  { path: '/', redirect: '/login' },

  // Auth Routes
  {
    path: '/login',
    component: LoginForm,
    meta: { layout: 'auth' },
  },
  {
    path: '/register',
    component: RegisterForm,
    meta: { layout: 'auth' },
  },

  // Admin Routes
  {
    path: '/admin',
    meta: { requiresAuth: true, role: 'admin', layout: 'admin' },
    children: [
      { path: '', redirect: '/admin-dashboard' },
      { path: 'admin-dashboard', component: AdminDashboard, meta: { layout: 'admin' } },
      { path: 'users', component: UsersPage, meta: { layout: 'admin' } },
      { path: 'tasks', component: TasksPage, meta: { layout: 'admin' } },
      { path: 'profile', component: ProfilePage, meta: { layout: 'admin' } },
    ],
  },
  {
    path: '/user',
    meta: { requiresAuth: true, role: 'user', layout: 'user' },
    children: [
      { path: '', redirect: '/user-dashboard' },
      { path: 'user-dashboard', component: UserDashboardPage, meta: { layout: 'user' } },
      { path: 'notifications', component: NotificationsPage, meta: { layout: 'user' } },
      { path: 'tasks', component: UserTasksPage, meta: { layout: 'user' } },
      { path: 'user-profile', component: UserProfilePage, meta: { layout: 'user' } },
    ],
  },

  // Catch-All Route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/ErrorPage.vue'),
    meta: { layout: 'auth' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global Route Guard

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const token = localStorage.getItem('token')

  // Restore user session if token exists but user isn't loaded
  if (token && !auth.isAuthenticated) {
    await auth.fetchUser()
  }

  // If route requires authentication
  if (to.meta.requiresAuth) {
    if (!auth.isAuthenticated) {
      return next('/login')
    }

    // Role-based route protection
    const requiredRole = to.meta.role
    const userRole = auth.role // either 'admin' or 'user'

    if (requiredRole && requiredRole !== userRole) {
      // Redirect to respective dashboard if role mismatch
      return next(userRole === 'admin' ? '/admin/admin-dashboard' : '/user/user-dashboard')
    }
  }

  // If already logged in and trying to access login/register
  if ((to.path === '/login' || to.path === '/register') && auth.isAuthenticated) {
    return next(auth.role === 'admin' ? '/admin/admin-dashboard' : '/user/user-dashboard')
  }

  next()
})

export default router
