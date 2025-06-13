import { useQuery } from '@tanstack/react-query'

import { UserService } from '@/api/services/users'
import { useAuthContext } from '@/contexts/auth'

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance', userId]
  }
  return ['balance', userId, from, to]
}

export const useGetUserBalance = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getUserBalanceQueryKey({ userId: user.id, from, to }),
    queryFn: () => {
      return UserService.balance({ from, to })
    },
    //por padrão o valor é 0 (fica sempre como status "stale" no react-query-devtools, ou seja, sempre que o usuário mudar de aba a query será refeita)
    //alterando o valor, a query ficará com status "fresh" até que o tempo expire
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}
