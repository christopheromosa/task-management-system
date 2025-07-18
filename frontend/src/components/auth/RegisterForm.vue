<template>

  <div class="auth-layout">
    <div class="auth-box shadow-sm">
      <h2 class="text-center mb-4 fw-bold text-primary">Create Account</h2>
      <form @submit.prevent="handleSubmitFn" novalidate>
        <div v-if="formError" class="alert alert-danger">
          {{ formError }}
        </div>

        <!-- Name -->
        <div class="mb-3">
          <label for="name" class="form-label">Full Name</label>
          <input id="name" type="text" class="form-control" v-model="formValues.name" />
          <div v-if="errors.name" class="text-danger small mt-1">{{ errors.name }}</div>
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input id="email" type="email" class="form-control" v-model="formValues.email" />
          <div v-if="errors.email" class="text-danger small mt-1">{{ errors.email }}</div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" id="password" class="form-control"
              v-model="formValues.password" />
            <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
          <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
        </div>

        <!-- Confirm Password -->
        <div class="mb-3">
          <label for="password_confirmation" class="form-label">Confirm Password</label>
          <div class="input-group">
            <input :type="showConfirmPassword ? 'text' : 'password'" id="password_confirmation" class="form-control"
              v-model="formValues.password_confirmation" />
            <button class="btn btn-outline-secondary" type="button" @click="showConfirmPassword = !showConfirmPassword">
              <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
          <div v-if="errors.password_confirmation" class="text-danger small mt-1">
            {{ errors.password_confirmation }}
          </div>
        </div>
        <!-- Is Admin Checkbox -->
        <div class="mb-3 form-check">
          <input id="is_admin" type="checkbox" class="form-check-input" v-model="formValues.is_admin" />
          <label for="is_admin" class="form-check-label">Register as Admin</label>
        </div>


        <!-- Submit -->
        <button type="submit" class="btn btn-primary w-100 d-flex align-items-center justify-content-center"
          :disabled="isSubmitting">
          <span v-if="!isSubmitting">Create Account</span>
          <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>

        <!-- Link to Login -->
        <p class="text-center mt-3 text-muted">
          Already have an account?
          <RouterLink to="/login" class="text-decoration-none fw-medium">Login</RouterLink>
        </p>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { useAuthStore } from '../../stores/auth'

const formError = ref('')

// Show/hide toggles
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Auth store
const authStore = useAuthStore()

// Validation schema
const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[a-z]/, 'Must contain a lowercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    password_confirmation: z.string(),
    is_admin: z.boolean()
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password_confirmation'],
        message: 'Passwords do not match',
      })
    }
  })

// vee-validate form setup
const {
  handleSubmit,
  setErrors,
  errors,
  isSubmitting,
} = useForm()

// form values (reactive, avoids readonly issues)
const formValues = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  is_admin: false,
})

// Form submit
const handleSubmitFn = handleSubmit(async () => {
  const result = registerSchema.safeParse(formValues)

  if (!result.success) {
    const formattedErrors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      if (issue.path[0]) {
        formattedErrors[issue.path[0] as string] = issue.message
      }
    }
    setErrors(formattedErrors)
    return
  }

  try {
    // Don't send password_confirmation to backend
    const { name, email, password, is_admin } = result.data
    console.log(result.data);

    await authStore.register({ name, email, password, is_admin })
    console.log('Registered successfully:', result.data)
  }
  catch (error) {
    const message = error?.response?.data?.message || error?.message || 'Registration failed try again'
    formError.value = message
  }

})
</script>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to right, #e9eff5, #dee2e7);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-box {
  width: 40%;
  padding: 4rem;
  box-shadow: 10px 0px 10px black;
}
</style>
