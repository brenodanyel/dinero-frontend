import { dayjs } from '@/utils/dayjs'
import { useQuery } from '@tanstack/vue-query'

type GetDashboardResponse = {
  totalDue: number
  nextDue: number
  nextDueDate: Date
}

export function useGetDashboardQuery() {
  return useQuery({
    queryKey: ['get-dashboard'],
    queryFn: async () => {
      const data: GetDashboardResponse = {
        totalDue: 452310,
        nextDue: 150000,
        nextDueDate: dayjs().add(1, 'month').toDate(),
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return data
    },
  })
}
