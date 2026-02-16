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
const toast = useToast()
const title = ref('')
const isError = ref(false)

const emit = defineEmits(['created'])

const onClick = () => {
  if (title.value.trim()) {
    const createdId = store.createDesk(title.value)
    toast.add({
      title: 'Стол успешно создан',
      description: `Стол ${title.value} создан`,
      icon: 'weui:done-filled',
    })
    isError.value = false
    emit('created', createdId)
  } else {
    isError.value = true
  }
}
</script>
