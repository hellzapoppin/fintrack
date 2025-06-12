import { addMonths } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { formatDateToQueryParams } from '@/helpers/user'

import DatePickerWithRange from './ui/date-picker-with-range'

const DateSelection = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  })

  useEffect(() => {
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParams(date.from))
    queryParams.set('to', formatDateToQueryParams(date.to))
    navigate(`/?${queryParams.toString()}`)
  }, [navigate, date])
  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
