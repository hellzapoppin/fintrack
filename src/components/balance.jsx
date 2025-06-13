import { useQuery } from '@tanstack/react-query'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'
import { UserService } from '@/services/users'

import BalanceItem from './balance-item'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data } = useQuery({
    queryKey: ['balance', user.id, from, to],
    queryFn: () => {
      return UserService.balance({ from, to })
    },
    //por padrão o valor é 0 (fica sempre como status "stale" no react-query-devtools, ou seja, sempre que o usuário mudar de aba a query será refeita)
    //alterando o valor, a query ficará com status "fresh" até que o tempo expire
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })

  return (
    <div className="grid grid-cols-[2fr,1fr]">
      <div className="grid grid-cols-2 grid-rows-2 gap-6">
        <BalanceItem
          label="Saldo"
          icon={<WalletIcon size={16} />}
          amount={data?.balance}
        />
        <BalanceItem
          label="Ganhos"
          icon={<TrendingUpIcon className="text-primary-green" size={16} />}
          amount={data?.earnings}
        />
        <BalanceItem
          label="Despesas"
          icon={<TrendingDownIcon className="text-primary-red" size={16} />}
          amount={data?.expenses}
        />
        <BalanceItem
          label="Investimentos"
          icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
          amount={data?.investments}
        />
      </div>
    </div>
  )
}

export default Balance
