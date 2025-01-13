<template>
  <UModal>
    <template #title>{{ props.title }} </template>
    <template #description>Insira abaixo os dados da despesa</template>

    <template #body>
      <UForm
        ref="form"
        :schema="formSchema"
        :state="formState"
        @submit="onSubmit"
        class="grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        <UFormField label="Descrição" name="description">
          <UInput v-model="formState.description" placeholder="Digite o nome da despesa" />
        </UFormField>

        <UFormField label="Valor" name="value">
          <UInputNumber
            v-model="formState.value"
            orientation="vertical"
            :step="0.01"
            :format-options="{
              style: 'currency',
              currency: 'BRL',
              currencySign: 'accounting',
            }"
          />
        </UFormField>

        <UFormField label="Data" name="date">
          <UDatePicker v-model="formState.date" />
        </UFormField>

        <UFormField label="Número de parcelas restantes" name="installments">
          <UInputNumber v-model="formState.installments" :step="1" />
        </UFormField>

        <UFormField label="Categoria" name="category" class="md:col-span-2">
          <USelectMenu
            v-model="formState.category"
            placeholder="Selecione a categoria"
            value-key="value"
            :items="
              Object.entries(expenseCategoriesSettings).map(([key, value]) => ({
                value: key,
                label: key,
                icon: value.icon,
              }))
            "
          />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton
        class="w-40"
        block
        label="Cancelar"
        variant="outline"
        color="error"
        @click="$emit('hide')"
      />

      <UButton class="w-40" block label="Salvar" loading-auto @click="formHTMLElement?.submit" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {
  expenseCategoriesArray,
  expenseCategoriesSettings,
  ExpenseCategory,
} from '@/data/expense-categories'
import { FormSubmitEvent } from '@nuxt/ui'
import { ref, useTemplateRef, watch } from 'vue'
import * as z from 'zod'

defineEmits(['hide'])

const props = defineProps<{
  title: string
  initialFormData: Partial<FormSchema>
  submit: (data: FormSchema) => Promise<void>
}>()

const formHTMLElement = useTemplateRef('form')

const formSchema = z.object({
  description: z
    .string({ message: 'Campo obrigatório' })
    .trim()
    .min(1, { message: 'Insira um nome válido' }),
  value: z
    .number({ message: 'Campo obrigatório' })
    .min(0.01, { message: 'Insira um valor válido.' }),
  date: z.date({ message: 'Campo obrigatório' }),
  installments: z.number({ message: 'Campo obrigatório' }),
  category: z.enum(expenseCategoriesArray, { message: 'Campo obrigatório' }),
})

type FormSchema = z.infer<typeof formSchema>

const formState = ref<FormSchema>({
  description: '',
  value: 0,
  date: new Date(),
  installments: 1,
  category: undefined as unknown as ExpenseCategory,
})

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  return props.submit(event.data)
}

watch(
  () => formState.value.value,
  () => {
    console.log('formState', formState.value.value, typeof formState.value.value)
  },
)

watch(
  () => props.initialFormData,
  (value) => {
    formState.value = {
      ...formState.value,
      ...value,
    }
  },
  { immediate: true },
)
</script>
