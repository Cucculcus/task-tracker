<template>
  <UCard
    variant="outline"
    class="w-[240px] h-[300px]"
    :ui="{
      header: 'p-0 sm:px-0 w-full h-1/6',
      body: 'p-0 sm:p-0 w-full h-19/30',
      footer: 'sm:px-0 px-0 p-0 w-full h-1/5',
    }"
  >
    <template #header>
      <div class="flex justify-center items-center p-3 py-3">
        <div class="flex items-center gap-2 flex-1">
          <div class="truncate max-w-2/3 flex-none items-center">{{ task?.title ?? '1' }}</div>
          <TaskSeverityIcon
            :is-completed="task?.isCompleted"
            :severity="task?.severity"
          />
        </div>
        <div class="flex-none flex gap-2">
          <UIcon name="weui:setting-outlined" class="size-6" @click="onEdit" />
          <UIcon name="weui:done-outlined" class="size-6" />
          <UIcon name="weui:delete-outlined" class="size-6" @click="onDelete" />
        </div>
      </div>
    </template>

    <div class="p-3">
      <slot name="sub-tasks"></slot>
    </div>

    <template #footer>
      <div class="flex flex-col justify-center p-1 px-4">
        <div>{{ $t('taskCard.expired') }}: 777%</div>
        <div class="flex gap-1">
          <div>{{ $t('taskCard.progress') }}:</div>
          <div>{{ d(task.plannedCompletionDate!, 'short') }}</div>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Task } from '~/types/task.model'
const { d } = useI18n()

const emit = defineEmits(['onEditButton', 'onDeleteButton'])
const props = defineProps<{
  task: Task
}>()

const onEdit = () => {
  emit('onEditButton', props.task)
}
const onDelete = () => {
  emit('onDeleteButton', props.task.id)
}
</script>
