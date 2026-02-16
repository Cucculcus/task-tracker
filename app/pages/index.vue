<template>
  <div>
    <div class="w-full bg-amber-300 min-h-[48px]">HEADER</div>
    <div class="w-full flex items-center mb-2">
      <div class="flex flex-none gap-1">
        <DeskDrawer
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

      <div class="flex-1 flex justify-end">{{ currentDesk?.title }}</div>
    </div>
    <div v-if="currentDesk">
      <UModal
        v-model:open="isCreateDeskModalOpen"
        fullscreen
        title="Окно создания стола"
      >
        <template #body>
          <CreateDeskForm @created="onDeskCreated" />
        </template>
      </UModal>

      <TaskEditModal
        v-if="isEditTaskModalOpen"
        v-model:is-open="isEditTaskModalOpen"
        :desk-id="currentDeskId"
      />

      <TaskDesk :desk="currentDesk" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Desk, Task } from '~/types'

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
  console.log('CUR ' + currentDeskId.value)
  console.log('NEW ' + desk?.id)
  if (currentDeskId.value !== desk?.id) {
    currentDeskId.value = desk?.id
  }
  console.log('SET ' + currentDeskId.value)
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
    title: 'Подтвердите удаление',
    icon: 'weui:delete-on-filled',
    actions: [
      {
        label: 'Удалить',
        color: 'primary',

        onClick: () => onDeleteTaskConfirm(taskId),
      },
    ],
  })
}
const onDeleteTaskConfirm = (taskId: string) => {
  toast.add({
    title: 'Задача успешно удалена',
    icon: 'weui:delete-filled',
  })
  deskManager.deleteTask(taskId, currentDesk.value.id)
}

provide('taskCardEvents', {
  onEditTask,
  onDeleteTask,
})
</script>
