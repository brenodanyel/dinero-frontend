import { client } from '@/api'
import { controllers } from '@/api/client'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export function useCreateExpenseMutation() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: controllers.CreateTransationPayload) =>
      client.dinero.createExpense(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-expenses'] })
      toast.add({
        color: 'success',
        title: 'Sucesso',
        description: 'A despesa foi criada com sucesso',
      })
    },
    onError(error) {
      toast.add({
        color: 'error',
        title: 'Erro ao salvar despesa',
        description: error.message,
      })
    },
  })
}
