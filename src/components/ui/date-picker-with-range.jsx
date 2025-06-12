import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const DatePickerWithRange = ({
  value,
  onChange,
  placeholder = 'Selecione uma data',
  className,
}) => {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'LLL dd, y', { locale: ptBR })} -{' '}
                  {format(value.to, 'LLL dd, y', { locale: ptBR })}
                </>
              ) : (
                format(value.from, 'LLL dd y', { locale: ptBR })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            initialFocus
            numberOfMonths={2}
            locale={ptBR}
          ></Calendar>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerWithRange
