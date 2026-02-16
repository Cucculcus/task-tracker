<template>
  <UCard
    color="primary"
    class="w-[240px]"
    :class="userConfigStore.isMobile ? '' : 'absolute'"
    :style="
      userConfigStore.isMobile
        ? {}
        : { top: `${position.y}px`, left: `${position.x}px` }
    "
  >
    <template #header>
      <div class="flex items-center">
        <div class="bg-bg flex items-center gap-2 flex-1">
          <div class="truncate max-w-2/3">{{ task.title }}</div>
          <TaskSeverityIcon
            :is-completed="task.isCompleted"
            :severity="task.severity"
          />
        </div>
        <div class="flex-none flex gap-2">
          <UIcon name="weui:setting-outlined" class="size-6" @click="onEdit" />
          <UIcon name="weui:done-outlined" class="size-6" />
          <UIcon name="weui:delete-outlined" class="size-6" />
        </div>
      </div>
    </template>

    <div class="min-h-[100px]">
      <slot name="sub-tasks"></slot>
    </div>

    <template #footer>
      <div>Прогресс: 777%</div>
      <div>Истекает: {{ task.plannedCompletionDate }}</div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Position, Task } from '~/types/task.model'

const emit = defineEmits(['onEditButton'])

const props = defineProps<{
  task: Task
  position: Position
}>()
const userConfigStore = useUserConfigStore()

const onEdit = () => {
  emit('onEditButton', props.task)
}
</script>
