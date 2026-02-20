<template>
  <UContainer :class="'w-full h-full flex items-center flex-col gap-6 py-2'">
    <TaskCardContainer
      v-for="taskId in tasks"
      :key="taskId"
      :task-id="taskId"
    />
  </UContainer>
</template>

<script setup lang="ts">
import type { Desk } from '~/types'
const tasks = computed(() => {
  return props.desk.tasks
})
const props = defineProps<{
  desk: Desk
}>()
</script>
