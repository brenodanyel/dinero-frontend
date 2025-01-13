<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { computed } from 'vue'
import { useGetExpensesProjectionQuery } from '../queries/get-expenses-projection'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'
import { formatCurrency } from '@/utils'

Chart.register(...registerables)

const getExpensesProjectionQuery = useGetExpensesProjectionQuery()

const getThemeColor = (variable: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(variable).trim()

const chartData = computed<ChartData<'line'>>(() => ({
  labels: getExpensesProjectionQuery.data.value?.data.map((item) => item.month) ?? [],
  datasets: [
    {
      label: 'Despesas',
      data: getExpensesProjectionQuery.data.value?.data.map((item) => item.value) ?? [],
      tension: 0.3,
      borderColor: getThemeColor('--ui-primary'),
      fill: true,
      backgroundColor: '#1d29cc11',
      pointBackgroundColor: getThemeColor('--ui-primary'),
      pointBorderColor: getThemeColor('--ui-border'),
      borderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointHitRadius: 100,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => formatCurrency(Number(tooltipItem.raw) / 100),
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: getThemeColor('--ui-text'),
      },
      grid: {
        color: getThemeColor('--ui-border'),
      },
    },
    y: {
      ticks: {
        color: getThemeColor('--ui-text'),
        callback: (value) => formatCurrency(Number(value) / 100),
      },
      grid: {
        color: getThemeColor('--ui-border'),
      },
    },
  },
}))
</script>
