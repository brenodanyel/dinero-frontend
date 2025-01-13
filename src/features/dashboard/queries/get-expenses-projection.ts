import { client } from '@/api'
import { useQuery } from '@tanstack/vue-query'

export function useGetExpensesProjectionQuery() {
  return useQuery({
    queryKey: ['get-expenses', 'projection'],
    queryFn: () => client.dinero.getExpensesProjection(),
  })
}
