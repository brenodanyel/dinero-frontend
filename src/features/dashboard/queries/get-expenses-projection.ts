import { dayjs } from '@/utils/dayjs'
import { useQuery } from '@tanstack/vue-query'

export type ExpenseProjection = {
  month: string
  value: number
}

export function useGetExpensesProjectionQuery() {
  return useQuery({
    queryKey: ['get-expenses-projection'],
    queryFn: async () => {
      const expenses: ExpenseProjection[] = []

      for (let i = 0; i < 12; i++) {
        expenses.push({
          month: dayjs().add(i, 'month').format('MMMM/YYYY'),
          value: Math.floor(Math.random() * 10000),
        })
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return expenses
    },
  })
}
