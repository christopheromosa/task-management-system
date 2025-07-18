export interface User {
  id: number
  name: string
  email: string
  position: 'Freelancer'|'Manager'
  status: 'active' | 'inactive'
  is_admin: boolean
  created_at: string
  updated_at: string
}

export type UserCreatePayload = Omit<User, 'id' | 'created_at' | 'updated_at' | 'is_admin'> & {
  password: string
  is_admin?: boolean
}

export type UserUpdatePayload = Partial<UserCreatePayload>
