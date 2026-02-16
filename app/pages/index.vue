<template>
  <div class="w-full bg-amber-300 min-h-[48px]">HEADER</div>
  <UModal
    v-model:open="isCreateDeskModalOpen"
    fullscreen
    title="Окно создания стола"
  >
    <template #body>
      <CreateDeskForm />
    </template>
  </UModal>

  <TaskEditModal
    v-if="isEditTaskModalOpen"
    v-model:is-open="isEditTaskModalOpen"
    :desk-id="currentDesk.id"
  />

  <div class="w-full flex items-center mb-2">
    <div class="flex flex-none gap-1">
      <DeskDrawer
        class="flex-none"
        @on-board-button="onUpdateDesk"
        @on-create-button="onCreateDesk"
      ></DeskDrawer>

      <UButton
        v-if="currentDesk.id"
        icon="weui:add-outlined"
        variant="ghost"
        color="neutral"
        @click="onCreateTask()"
      />
    </div>

    <div class="flex-1 flex justify-end">{{ currentDesk.title }}</div>
  </div>

  <div>
    <TaskDesk :desk="currentDesk" />
  </div>
</template>

<script setup lang="ts">
import type { Desk } from '~/types'

const taskEditorStore = useTaskEditorStore()

const isCreateDeskModalOpen = ref(false)
const isEditTaskModalOpen = ref(false)

const currentDesk = ref<Desk>({
  id: '',
  title: '',
  tasks: [],
})

const onUpdateDesk = (desk: Desk | null) => {
  if (currentDesk.value?.id !== desk?.id) {
    currentDesk.value = desk
  }
}
const onCreateDesk = () => {
  isCreateDeskModalOpen.value = true
}
const onEditTask = (taskToEdit) => {
  taskEditorStore.addTaskInEdit(taskToEdit)
  isEditTaskModalOpen.value = true
}

const onCreateTask = () => {
  taskEditorStore.addTaskInEdit(undefined)
  isEditTaskModalOpen.value = true
}

provide('onEditTask', onEditTask)
</script>
