import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  signup: async (inputs) => {
    const response = await publicApi.post('/users', {
      first_name: inputs.firstName,
      last_name: inputs.lastName,
      email: inputs.email,
      password: inputs.password,
    })
    return response.data
  },
  login: async (inputs) => {
    const response = await publicApi.post('/users/login', {
      email: inputs.email,
      password: inputs.password,
    })

    return response.data
  },
  me: async () => {
    const response = await protectedApi.get('/users/me')
    return response.data
  },
}
