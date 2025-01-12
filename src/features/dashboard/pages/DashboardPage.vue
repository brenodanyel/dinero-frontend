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
        <p class="font-bold text-2xl">Despesas Recentes</p>
      </template>

      <template #default>
        <LastExpensesTable />
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/utils'
import { dayjs } from '@/utils/dayjs'
import { useGetDashboardQuery } from '../queries/get-dashboard'

import LastExpensesTable from '../components/LastExpensesTable.vue'
import ExpensesProjectionGraph from '../components/ExpensesProjectionGraph.vue'

const getDashboardQuery = useGetDashboardQuery()
</script>
