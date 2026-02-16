<template>
  <TaskCard
    :task="task ?? undefined"
    :position
    @on-edit-button="onEdit"
    @on-delete-button="onDelete"
  >
    <template #sub-tasks>
      <div v-if="isHasSubtasks" class="truncate flex flex-col gap-1">
        <SubTaskCard
          v-for="subTask in subTasks"
          :key="subTask.id"
          :task="subTask"
        ></SubTaskCard>
      </div>
      <div v-else class="flex flex-row gap-3 items-center h-full">
        <div class="h-full">{{ task?.text }}</div>
      </div>
    </template>
  </TaskCard>
</template>

<script setup lang="ts">
import type { Task } from '~/types'

const props = defineProps<{ taskId: string }>()

const taskStore = useTaskStore()
const positionStore = useTaskPositionStore()

const task = computed(() => {
  return taskStore.getTask(props.taskId)
})

const position = computed(() => {
  return positionStore.getPosition(props.taskId)
})

const subTasks = computed(() => {
  return task.value?.subtasks?.map((id: string) => taskStore.getTask(id))
})

const isHasSubtasks = computed(() => {
  if (subTasks.value) {
    return subTasks.value.length > 0
  }
  return false
})

const taskCardEvents: {
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
} = inject('taskCardEvents')!

const onEdit = (task: Task) => {
  taskCardEvents.onEditTask(task)
}
const onDelete = (taskId: string) => {
  taskCardEvents.onDeleteTask(taskId)
}
</script>
