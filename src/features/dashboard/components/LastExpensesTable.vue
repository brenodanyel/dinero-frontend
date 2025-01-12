<template>
  <UTable
    :data="getExpensesQuery.data.value"
    :columns
    :loading="getExpensesQuery.isLoading.value"
  />
</template>

<script setup lang="ts">
import { TableColumn } from '@nuxt/ui'
import { Expense, useGetExpensesQuery } from '../queries/get-expenses'
import { formatCurrency } from '@/utils'
import { dayjs } from '@/utils/dayjs'

const getExpensesQuery = useGetExpensesQuery()

const columns: TableColumn<Expense>[] = [
  { accessorKey: 'name', header: 'Nome' },
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

      if (totalInstallments && totalInstallments > 1) {
        const endDate = dayjs(row.original.date).add(totalInstallments, 'month')
        return `${totalInstallments - dayjs(endDate).diff(dayjs(), 'month')} / ${totalInstallments}`
      }

      return 'À vista'
    },
  },
  { accessorKey: 'category', header: 'Categoria' },
]
</script>
