<template>
  <UModal>
    <template #title>{{ title }} </template>
    <template #description> {{ description }}</template>

    <template #footer>
      <UButton
        class="w-40"
        block
        label="Cancelar"
        variant="outline"
        color="error"
        @click="$emit('cancel')"
      />

      <UButton class="w-40" block label="Salvar" loading-auto @click="$emit('confirm')" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineEmits(['confirm', 'cancel'])

defineProps<{
  title: string
  description: string
}>()
</script>
