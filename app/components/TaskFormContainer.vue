<template>
  <TaskForm
    :key="task?.id"
    :task
    @submit="onSubmit"
    @on-create-subtask="taskEditorStore.addTaskInEdit(undefined)"
    @form-error="onFormError"
  >
    <template #breadcrumps>
      <UBreadcrumb :items="breadcrumps" :ui="{ link: 'sm:text-lg' }" />
    </template>

    <template v-if="task" #subtasks>
      <SubTaskCard
        v-for="subtask in subtasks"
        :key="subtask?.id"
        :task="subtask"
        class="min-w-4/8 hover:bg-primary-400 p-1 rounded-xl active:bg-primary-500"
        @click="onSubTaskClick(subtask)"
      />
    </template>
  </TaskForm>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { severity, Task } from '~/types/task.model'
import TaskForm from './TaskForm.vue'

const { t } = useI18n()
const toast = useToast()
const taskEditorStore = useTaskEditorStore()
const taskStore = useTaskStore()
const deskStore = useDeskStore()
const breadcrumps = computed<Array<BreadcrumbItem>>(() => {
  const items: Array<BreadcrumbItem> = []
  taskEditorStore.tasksInEdit.forEach((item) => {
    if (item) {
      items.push({ label: `${item.title}` })
    } else items.push({ label: `${t('createTaskWindow.currentTask')}` })
  })
  return items
})

const props = defineProps<{
  taskId?: string
  deskId?: string
}>()

const subtasks = computed(() => {
  if (props.taskId) {
    return task.value?.subtasks?.map((subtaskId) => {
      return taskStore.getTask(subtaskId)
    })
  }
  return undefined
})

const task = computed(() => {
  if (props.taskId) {
    return taskStore.getTask(props.taskId)
  }
  return undefined
})

const onSubTaskClick = (task: Task) => {
  taskEditorStore.addTaskInEdit(task)
}

const onSubmit = (params: {
  title: string
  severity: severity
  text: string
  plannedCompletionDate: Date
}) => {
  if (task.value?.id) {
    const exists = taskStore.getTask(task.value?.id)
    if (exists) {
      taskStore.editTask(exists.id, {
        severity: params.severity,
        isCompleted: task.value?.isCompleted ?? false,
        title: params.title,
        text: params.text,
        subtasks: task.value?.subtasks,
        plannedCompletionDate: params.plannedCompletionDate,
      })
      toast.add({
        title: `${t('createTaskWindow.toasts.edit.title')}`,
        description: `${t('createTaskWindow.toasts.edit.description')}`,
        icon: 'weui:refresh-filled',
      })
    }
  } else {
    const created = taskStore.createTask({
      severity: params.severity,
      isCompleted: task.value?.isCompleted ?? false,
      title: params.title,
      text: params.text,
      subtasks: task.value?.subtasks,
      plannedCompletionDate: params.plannedCompletionDate,
    })

    if (created) {
      taskEditorStore.removeLast()
      const parent = taskEditorStore.getLastInEdit()

      if (parent) {
        const parentId = parent.id

        if (taskStore.getTask(parentId)) {
          taskStore.addSubTask(parentId, created.id)
        }
      } else if (deskStore.getDesk(props.deskId)) {
        deskStore.addTaskToDesk(props.deskId, created.id)
      }
      taskEditorStore.addTaskInEdit(created)
    }

    toast.add({
      title: `${t('createTaskWindow.toasts.create.title')}`,
      description: `${t('createTaskWindow.toasts.create.description')}`,
      icon: 'weui:done-filled',
    })
  }
}
const onFormError = (error: string) => {
  toast.add({
    title: error,
  })
}
</script>
