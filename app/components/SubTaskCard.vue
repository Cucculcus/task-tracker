<template>
  <div class="flex">
    <div class="flex-none max-w-4/7 truncate">{{ task.title }}</div>
    <div class="flex-1 flex items-center justify-end gap-6">
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
