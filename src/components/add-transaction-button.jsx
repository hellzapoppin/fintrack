import { zodResolver } from '@hookform/resolvers/zod'
import {
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { z } from 'zod'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from './ui/button'
import DatePicker from './ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const transactionFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'O nome da transação é obrigatório!' }),
  amount: z.number({ required_error: 'O valor é obrigatório' }),
  date: z.date({ required_error: 'A data é obrigatória' }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
})

const AddTransactionButton = () => {
  const form = useForm({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: new Date(),
      type: '',
    },
    shouldUnregister: true,
  })

  const onSubmit = (data) => {
    console.log({ data })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Nova transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adcionar Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite o nome da transação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <NumericFormat
                      placeholder="Digite o valor da transação"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      {...field}
                      onChange={() => {}}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        type="button"
                        variant={
                          field.value === 'EARNING' ? 'secondary' : 'outline'
                        }
                        className="text-primary-green"
                        onClick={() => field.onChange('EARNING')}
                      >
                        <TrendingUpIcon />
                        Ganho
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === 'EXPENSE' ? 'secondary' : 'outline'
                        }
                        className="text-primary-red"
                        onClick={() => field.onChange('EXPENSE')}
                      >
                        <TrendingDownIcon />
                        Gasto
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === 'INVESTMENT' ? 'secondary' : 'outline'
                        }
                        className="text-primary-blue"
                        onClick={() => field.onChange('INVESTMENT')}
                      >
                        <PiggyBankIcon />
                        Investimento
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <DialogFooter className="sm:space-x-4">
              <DialogClose asChild>
                <Button type="reset" variant="secondary" className="w-full">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="w-full">
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionButton
