<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
    <UCard class="md:col-span-6">
      <template #header> Total Devido </template>
      <template #default>
        <p class="font-bold text-2xl">
          <USkeleton v-if="getDashboardQuery.isLoading.value" class="h-8" />
          <span v-else-if="getDashboardQuery.isError.value">#Erro</span>
          <span v-else-if="getDashboardQuery.data.value">
            {{ formatCurrency(getDashboardQuery.data.value.totalDue / 100) }}
          </span>
        </p>
      </template>
    </UCard>

    <UCard class="md:col-span-6">
      <template #header> Próximo Vencimento </template>
      <template #default>
        <USkeleton v-if="getDashboardQuery.isLoading.value" class="h-8" />
        <span v-else-if="getDashboardQuery.isError.value">#Erro</span>
        <template v-else-if="getDashboardQuery.data.value">
          <p class="font-bold text-2xl">
            {{ formatCurrency(getDashboardQuery.data.value.nextDue / 100) }}
          </p>

          <p class="text-[var(--ui-text-muted)]">
            {{ dayjs(getDashboardQuery.data.value.nextDueDate).fromNow() }} ({{
              new Intl.DateTimeFormat('pt-BR').format(getDashboardQuery.data.value.nextDueDate)
            }})
          </p>
        </template>
      </template>
    </UCard>

    <UCard class="md:col-span-8">
      <template #header>
        <p class="font-bold text-2xl">Projeção de despesas</p>
      </template>

      <template #default>
        <ExpensesProjectionGraph />
      </template>
    </UCard>

    <UCard class="md:col-span-4">
      <template #header>
        <div class="flex items-center justify-between">
          <p class="font-bold text-2xl">Despesas</p>
          <UButton label="Registrar Despesa" @click="onClickRegisterExpense" />
        </div>
      </template>

      <template #default>
        <LastExpensesTable />
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ComponentProps } from '@/types/component-props'
import { formatCurrency } from '@/utils'
import { dayjs } from '@/utils/dayjs'
import ExpenseModal from '../components/expense-modal.vue'
import ExpensesProjectionGraph from '../components/expenses-projection-graph.vue'
import LastExpensesTable from '../components/last-expenses-table.vue'
import { useCreateExpenseMutation } from '../queries/create-expense'
import { useGetDashboardQuery } from '../queries/get-dashboard'

const getDashboardQuery = useGetDashboardQuery()
const createExpenseMutation = useCreateExpenseMutation()

const modal = useModal()

function onClickRegisterExpense() {
  modal.open(ExpenseModal, {
    title: 'Registrar Despesa',
    initialFormData: {
      description: '',
      value: undefined,
      date: new Date(),
      installments: 1,
      category: undefined,
    },
    async submit(data) {
      await createExpenseMutation
        .mutateAsync({
          description: data.description,
          value: data.value * 100,
          date: data.date.toISOString(),
          installments: data.installments,
          category: data.category,
        })
        .then(() => modal.close())
    },
    onHide() {
      modal.close()
    },
  } as ComponentProps<typeof ExpenseModal>)
}
</script>
