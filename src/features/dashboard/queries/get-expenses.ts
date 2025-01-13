import { client } from '@/api'
import { useQuery } from '@tanstack/vue-query'

export function useGetExpensesQuery() {
  return useQuery({
    queryKey: ['get-expenses'],
    queryFn: () => client.dinero.getExpenses(),
  })
}
