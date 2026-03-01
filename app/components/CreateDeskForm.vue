<template>
  <div
    class="flex flex-col gap-4 sm:max-w-1/2 sm:max-h-1/2 sm:translate-x-1/2 sm:translate-y-1/2"
  >
    <UInput
      v-model="title"
      :color="isError ? 'error' : 'neutral'"
      highlight
      :placeholder="$t('createDeskWindow.createDeskForm.placeholder')"
      :ui="{
        base: 'text-center',
      }"
    />
    <UButton
      :ui="{
        base: 'max-w-[296px] sm:max-w-full sm:min-h-12 justify-center flex',
      }"
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

const toastCreateWithDelay = callWithDelay(toast.add, 2000)
const toastErrorWithDelay = callWithDelay(toast.add, 2000)

const emit = defineEmits(['created'])

const onClick = () => {
  if (title.value.trim()) {
    const createdId = store.createDesk(title.value)
    toastCreateWithDelay({
      title: `${t('createDeskWindow.createDeskForm.toast.add.title')}`,
      description: `${t('createDeskWindow.createDeskForm.toast.add.description')}`,
      icon: 'weui:done-filled',
      duration: 2000,
    })

    isError.value = false
    emit('created', createdId)
  } else {
    isError.value = true
    toastErrorWithDelay({
      title: `${t('createDeskWindow.createDeskForm.toast.error.title')}`,
      icon: 'weui:report-problem-filled',
      color: 'error',
      duration: 2000,
    })
  }
}
</script>
