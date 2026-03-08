<template>
  <UApp :locale="locales[locale]">
    <UMain>
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
const { locale } = useI18n()
</script>
