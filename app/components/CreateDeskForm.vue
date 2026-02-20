<template>
  <div class="flex flex-col gap-4 max-w-full">
    <UInput
      v-model="title"
      :color="isError ? 'error' : 'neutral'"
      highlight
      :placeholder="$t('createDeskWindow.createDeskForm.placeholder')"
    />
    <UButton
      :label="$t('createDeskWindow.createDeskForm.button')"
      @click="onClick"
    ></UButton>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const store = useDeskStore()
const toast = useToast()
const title = ref('')
const isError = ref(false)

const emit = defineEmits(['created'])

const onClick = () => {
  if (title.value.trim()) {
    const createdId = store.createDesk(title.value)
    toast.add({
      title: `${t('createDeskWindow.createDeskForm.toast.title')}`,
      description: `${t('createDeskWindow.createDeskForm.toast.description')}`,
      icon: 'weui:done-filled',
    })
    isError.value = false
    emit('created', createdId)
  } else {
    isError.value = true
  }
}
</script>
