<template>
  <UTable
    :columns
    :data="getExpensesQuery.data.value?.data"
    :loading="getExpensesQuery.isLoading.value"
  >
    <template #id-cell="{ row }">
      <UDropdownMenu
        :items="[
          {
            label: 'Editar',
            icon: 'i-lucide-edit',
            onSelect: () => onClickEditExpense(row.original),
          },
          {
            label: 'Excluir',
            icon: 'i-lucide-trash',
            onSelect: () => onClickDeleteExpense(row.original),
          },
        ]"
      >
        <template #default>
          <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" square />
        </template>
      </UDropdownMenu>
    </template>
  </UTable>
</template>

<script setup lang="ts">
import { TableColumn } from '@nuxt/ui'
import { useGetExpensesQuery } from '../queries/get-expenses'
import { formatCurrency } from '@/utils'
import { dayjs } from '@/utils/dayjs'
import ExpenseModal from '../components/ExpenseModal.vue'
import { ComponentProps } from '@/types/component-props'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import { controllers } from '@/api/client'

const getExpensesQuery = useGetExpensesQuery()
const modal = useModal()

type ExpenseDataItem = controllers.GetExpensesResponse['data'][number]

const columns: TableColumn<ExpenseDataItem>[] = [
  { accessorKey: 'description', header: 'Nome' },
  {
    accessorKey: 'value',
    header: 'Valor',
    cell: ({ row }) => formatCurrency(row.original.value / 100),
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => new Intl.DateTimeFormat('pt-BR').format(new Date(row.original.date)),
  },
  {
    accessorKey: 'installments',
    header: 'Parcelas',
    cell: ({ row }) => {
      const totalInstallments = row.original.installments

      if (totalInstallments > 1) {
        const endDate = dayjs(row.original.date).add(totalInstallments, 'month')
        return `${totalInstallments - dayjs(endDate).diff(dayjs(), 'month')} / ${totalInstallments}`
      }

      return 'À vista'
    },
  },
  { accessorKey: 'category', header: 'Categoria' },
  { accessorKey: 'id', header: 'Ações' },
]

function onClickEditExpense(expense: ExpenseDataItem) {
  modal.open(ExpenseModal, {
    title: 'Editar Despesa',
    initialFormData: {
      description: expense.description,
      value: expense.value / 100,
      date: new Date(expense.date),
      installments: expense.installments,
      category: expense.category,
    },
    async submit(data) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(data)
      modal.close()
    },
    onHide() {
      modal.close()
    },
  } satisfies ComponentProps<typeof ExpenseModal>)
}

function onClickDeleteExpense(expense: ExpenseDataItem) {
  modal.open(ConfirmationModal, {
    title: 'Excluir Despesa',
    description: 'Tem certeza que deseja excluir essa despesa? Essa ação não poderá ser desfeita.',
    onCancel: () => modal.close(),
    onConfirm() {
      console.log('Excluir despesa', expense)
      modal.close()
    },
  } satisfies ComponentProps<typeof ConfirmationModal>)
}
</script>
