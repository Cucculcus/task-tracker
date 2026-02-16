<template>
  <div class="flex flex-col gap-4 max-w-full">
    <UInput
      v-model="title"
      :color="isError ? 'error' : 'neutral'"
      highlight
      placeholder="Введите имя для стола"
    />
    <UButton label="Создать" @click="onClick"></UButton>
  </div>
</template>

<script setup lang="ts">
const store = useDeskStore()
const title = ref('')

const isError = ref(false)

const onClick = () => {
  if (title.value.trim()) {
    store.createDesk(title.value)
    isError.value = false
  } else {
    isError.value = true
  }
}
</script>
