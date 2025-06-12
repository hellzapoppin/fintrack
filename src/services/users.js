import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  /**
   * Cria um novo usuário
   * @param {Object} inputs - usuário a ser criado
   * @param {string} inputs.firstName - primeiro nome do usuário
   * @param {string} inputs.lastName - sobrenome do usuário
   * @param {string} inputs.email - email do usuário
   * @param {string} inputs.password - senha do usuário
   * @returns {Object} usuário criado
   * @returns {string} response.tokens - tokens de autenticação
   */
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

  /**
   * Loga usuário com email e senha
   * @param {Object} inputs - loga usuário
   * @param {string} inputs.email - email do usuário
   * @param {string} inputs.password - senha do usuário
   * @returns {Object} usuário logado
   * @returns {string} response.tokens - tokens de autenticação
   */
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
  /**
   * Retorna o usuário autenticado
   * @returns {Object} usuário altenticado
   */
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
