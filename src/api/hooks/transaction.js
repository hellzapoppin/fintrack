import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/contexts/auth'

import { TransactionService } from '../services/transactions'
import { getUserBalanceQueryKey } from './user'

const createTransactionMutationKey = ['createTransaction']

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey({ userId: user.id }),
      })
    },
  })
}

const getTransactionsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId]
  }
  return ['getTransactions', userId, from, to]
}

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getTransactionsQueryKey({ userId: user.id, from, to }),
    queryFn: () => TransactionService.getAll({ from, to }),
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}
