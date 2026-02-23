<template>
  <div class="grid grid-cols-2 w-full">
    <div class="truncate">{{ task.title }}</div>
    <div class="flex items-center justify-end gap-6">
      <div>100%</div>
      <TaskSeverityIcon
        :is-completed="task.isCompleted"
        :severity="task.severity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types'

defineProps<{ task: Task }>()
</script>
