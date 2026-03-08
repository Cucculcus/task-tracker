<template>
  <div
    class="flex flex-col gap-4 sm:gap-y-24 sm:max-w-1/2 sm:max-h-1/2 sm:translate-x-1/2 sm:translate-y-1/2"
  >
    <UInput
      v-model="title"
      :color="isError ? 'error' : 'neutral'"
      highlight
      :placeholder="$t('createDeskWindow.createDeskForm.placeholder')"
      :ui="{
        base: 'text-center max-w-[256px] text-lg sm:max-w-full sm:text-2xl',
        root: ' sm:max-w-full flex justify-center',
      }"
      variant="outline"
    />
    <div class="flex justify-center">
      <UButton
        :ui="{
          base: 'sm:max-w-full w-[256px]  justify-center sm:w-32 sm:h-32 text-lg sm:text-xl sm:rounded-full',
        }"
        variant="outline"
        :label="$t('createDeskWindow.createDeskForm.button')"
        @click="onClick"
      ></UButton>
    </div>
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
