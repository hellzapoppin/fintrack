import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  signup: async (inputs) => {
    const response = await publicApi.post('/users', {
      first_name: inputs.firstName,
      last_name: inputs.lastName,
      email: inputs.email,
      password: inputs.password,
    })

    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      password: response.data.password,
      tokens: response.data.tokens,
    }
  },

  login: async (inputs) => {
    const response = await publicApi.post('/users/login', {
      email: inputs.email,
      password: inputs.password,
    })

    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      password: response.data.password,
      tokens: response.data.tokens,
    }
  },

  me: async () => {
    const response = await protectedApi.get('/users/me')

    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      password: response.data.password,
    }
  },
}
