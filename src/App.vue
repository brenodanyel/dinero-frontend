<template>
  <UApp :locale="pt_br">
    <RouterView />
  </UApp>
</template>

<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'
</script>
