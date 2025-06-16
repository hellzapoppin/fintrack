import queryString from 'query-string'

import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado
   * @param {Object} inputs - transação a ser criada
   * @param {string} inputs.name - nome da transação
   * @param {string} inputs.amount - valor da transação
   * @param {string} inputs.date - data da transação
   * @param {string} inputs.type - Tipo da transação (EARNING | EXPENSE | INVESTMENT)
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)

    return response.data
  },

  /**
   * retorna as transações do usuário autenticado
   * @param {Object} inputs
   * @param {string} inputs.from - data inicial (YYYY-MM-DD)
   * @param {string} inputs.to - data final (YYYY-MM-DD)
   */
  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApi.get(`/transactions/me?${query}`)
    return response.data
  },
}
