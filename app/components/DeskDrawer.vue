<template>
  <UDrawer
    direction="top"
    inset
    :open="isOpen"
    :ui="{
      overlay: ' h-screen w-screen flex',
      content: 'lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2',
      body: 'flex flex-col gap-4 max-h-dvh min-h-[75dvh] ',
    }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      trailing-icon="weui:folder-outlined"
      @click="switchState"
    />

    <template #body>
      <UButton @click="onClick(null, 'onCreateButton')"
        ><div class="flex w-full gap-4">
          <div class="w-3/4 flex justify-start items-center text-lg">
            {{ $t('createDeskWindow.createButtonText') }}
          </div>
          <div class="w-1/4 flex justify-end text-lg">+</div>
        </div></UButton
      >
      <UButton
        v-for="desk in deskStore.getDesks"
        :key="desk.id"
        @click="onClick(desk, 'onBoardButton')"
        class="text-lg"
      >
        <div>
          {{ desk.title }}
        </div>
      </UButton>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import type { Desk } from '~/types'

const isOpen = ref(false)
const emit = defineEmits(['onBoardButton', 'onCreateButton'])
const deskStore = useDeskStore()

const onClick = (desk: Desk, eventName: 'onBoardButton' | 'onCreateButton') => {
  emit(eventName, desk)
  switchState()
}
const switchState = () => {
  isOpen.value = !isOpen.value
}
</script>
