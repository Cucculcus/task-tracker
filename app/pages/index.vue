<template>
  <div class="min-h-screen min-w-screen">
    <div class="w-full bg-amber-300 min-h-[48px]">HEADER</div>
    <div class="w-full flex items-center mb-2">
      <div class="flex flex-none gap-1">
        <DeskDrawer
          :current-desk-id="currentDeskId"
          class="flex-none"
          @on-board-button="onUpdateDesk"
          @on-create-button="onCreateDeskClick"
        ></DeskDrawer>

        <UButton
          v-if="currentDeskId"
          icon="weui:add-outlined"
          variant="ghost"
          color="neutral"
          @click="onCreateTask()"
        />
      </div>

      <div class="flex-1 flex justify-end pr-1 min-w-0">
        <div class="truncate max-w-1/2">
          {{ currentDesk?.title }}
        </div>
      </div>
    </div>

    <UModal
      v-model:open="isCreateDeskModalOpen"
      fullscreen
      :title="$t('createDeskWindow.createDeskForm.title')"
    >
      <template #body>
        <CreateDeskForm @created="onDeskCreated" />
      </template>
    </UModal>

    <div v-if="currentDeskId" class="w-full h-full">
      <TaskEditModal
        v-if="isEditTaskModalOpen"
        v-model:is-open="isEditTaskModalOpen"
        :desk-id="currentDeskId"
      />

      <TaskDesk :deskId="currentDeskId" :key="currentDeskId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Desk, Task } from '~/types'

const { t } = useI18n()

const taskEditorStore = useTaskEditorStore()
const deskManager = useDeskManagerStore()
const deskStore = useDeskStore()

const toast = useToast()

const isCreateDeskModalOpen = ref(false)
const isEditTaskModalOpen = ref(false)
const isTaskDeleteAlertOpen = ref(false)

const currentDeskId = ref<string | undefined>(undefined)
const currentDesk = computed<Desk | undefined>(() => {
  return deskStore.getDesk(currentDeskId.value)
})

const onUpdateDesk = (desk: Desk | null) => {
  if (currentDeskId.value !== desk?.id) {
    currentDeskId.value = desk?.id
  }
}
const onCreateDeskClick = () => {
  isCreateDeskModalOpen.value = true
}
const onDeskCreated = (deskId: string) => {
  currentDeskId.value = deskId
}
const onEditTask = (task: Task) => {
  taskEditorStore.addTaskInEdit(task)
  isEditTaskModalOpen.value = true
}

const onCreateTask = () => {
  taskEditorStore.addTaskInEdit(undefined)
  isEditTaskModalOpen.value = true
}
const onDeleteTask = (taskId: string) => {
  toast.add({
    title: `${t('deleteToast.title')}`,
    icon: 'weui:delete-on-filled',
    actions: [
      {
        label: `${t('deleteToast.buttonText')}`,
        color: 'primary',

        onClick: () => onDeleteTaskConfirm(taskId),
      },
    ],
  })
}
const onDeleteTaskConfirm = (taskId: string) => {
  toast.add({
    title: `${t('deleteToast.onDeleteTitle')}`,
    icon: 'weui:delete-filled',
  })
  deskManager.deleteTask(taskId, currentDeskId.value)
}

provide('taskCardEvents', {
  onEditTask,
  onDeleteTask,
})
</script>
