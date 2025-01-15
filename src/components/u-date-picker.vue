<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  minValue?: Date
  maxValue?: Date
}>()

const df = new DateFormatter('pt-BR', {
  dateStyle: 'short',
})

const internalValue = ref<CalendarDate>()
const modelValue = defineModel<Date>()

defineEmits(['update:modelValue'])

watch(
  () => modelValue.value,
  () => {
    if (!modelValue.value) {
      internalValue.value = undefined
      return
    }

    internalValue.value = new CalendarDate(
      modelValue.value.getFullYear(),
      modelValue.value.getMonth() + 1,
      modelValue.value.getDate(),
    )
  },
  {
    immediate: true,
  },
)

const minDate = computed(() => {
  if (!props.minValue) return undefined
  return new CalendarDate(
    props.minValue.getFullYear(),
    props.minValue.getMonth() + 1,
    props.minValue.getDate(),
  )
})

const maxDate = computed(() => {
  if (!props.maxValue) return undefined
  return new CalendarDate(
    props.maxValue.getFullYear(),
    props.maxValue.getMonth() + 1,
    props.maxValue.getDate(),
  )
})
</script>

<template>
  <UPopover>
    <UButton
      block
      variant="outline"
      icon="i-lucide-calendar"
      class="justify-start font-normal outline-1 outline-[var(--ui-border-accented)] ring-0 text-[var(--ui-text-highlighted)]"
    >
      <span v-if="internalValue">
        {{ df.format(internalValue.toDate(getLocalTimeZone())) }}
      </span>
      <span v-else>Selecione uma data</span>
    </UButton>

    <template #content>
      <UCalendar
        v-model="internalValue"
        class="p-2"
        :min-value="minDate"
        :max-date="maxDate"
        @update:model-value="
          () => {
            if (!internalValue) {
              $emit('update:modelValue', undefined)
              return
            }

            $emit('update:modelValue', internalValue.toDate(getLocalTimeZone()))
          }
        "
      />
    </template>
  </UPopover>
</template>
