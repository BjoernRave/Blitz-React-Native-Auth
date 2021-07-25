export interface Cookie {
  expires: string
  httpOnly: boolean
  name: string
  path: string
  sameSite: string
  value: string
}

export type User = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string | null
  email: string
  hashedPassword: string | null
  role: string
}

export const primaryColor = '#6701ec'

export const secondaryColor = '#190640'

export const backgroundColor = '#fff'
