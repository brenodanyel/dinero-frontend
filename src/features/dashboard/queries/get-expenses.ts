import { ExpenseCategory } from '@/data/expense-categories'
import { dayjs } from '@/utils/dayjs'
import { useQuery } from '@tanstack/vue-query'

export type Expense = {
  id: string
  description: string
  value: number
  date: string
  category: ExpenseCategory
  installments: number
}

export function useGetExpensesQuery() {
  return useQuery({
    queryKey: ['get-expenses'],
    queryFn: async () => {
      const expenses: Expense[] = []

      for (let i = 0; i < 10; i++) {
        const MAX_INSTALLMENTS = 10
        const installments = Math.ceil(Math.random() * MAX_INSTALLMENTS)

        expenses.push({
          id: i.toString(),
          description: 'Aluguel',
          value: Math.floor(Math.random() * 1000000),
          category: 'Moradia',
          date: dayjs()
            .subtract(Math.ceil(Math.random() * installments), 'month')
            .toISOString(),
          installments: installments,
        })
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return expenses
    },
  })
}
