import { useQueryClient } from '@tanstack/react-query'
import { addMonths, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'
import { formatDateToQueryParams } from '@/helpers/user'

import DatePickerWithRange from './ui/date-picker-with-range'

const getInitialDateState = (searchParams) => {
  const defaultDates = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  }
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  // caso não tenha nem o from nem o to
  if (!from || !to) {
    return defaultDates
  }

  // caso um deles seja inválido
  const datesAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to))
  if (datesAreInvalid) {
    return defaultDates
  }

  // caso sejam válidos
  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  }
}

const DateSelection = () => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [date, setDate] = useState(getInitialDateState(searchParams))

  useEffect(() => {
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParams(date.from))
    queryParams.set('to', formatDateToQueryParams(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({
      queryKey: [
        'balance',
        user.id,
        formatDateToQueryParams(date.from),
        formatDateToQueryParams(date.to),
      ],
    })
  }, [navigate, date, queryClient, user.id])
  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
