import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado
   * @param {Object} inputs - trasação a ser criada
   * @param {string} inputs.name - nome da transação
   * @param {string} inputs.amount - valor da transação
   * @param {string} inputs.date - data da transação
   * @param {string} inputs.type - Tipo da transação (EARNING | EXPENSE | INVESTMENT)
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)

    return response.data
  },
}
