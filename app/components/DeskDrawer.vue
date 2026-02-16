<template>
  <UDrawer
    direction="top"
    inset
    :open="isOpen"
    :ui="{
      content: 'max-w-dvw',
      body: 'w-full h-screen max-h-dvh min-h-[75dvh] flex flex-col gap-4',
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
          <div class="w-3/4 flex justify-start">Создать новый стол</div>
          <div class="w-1/4 flex justify-end">+</div>
        </div></UButton
      >
      <UButton
        v-for="desk in deskStore.getDesks"
        :key="desk.id"
        @click="onClick(desk, 'onBoardButton')"
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
