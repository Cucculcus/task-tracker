<template>
  <UContainer
    :class="
      userConfigStore.isMobile
        ? 'static flex flex-col gap-4  items-center'
        : 'relative'
    "
  >
    <TaskCardContainer
      v-for="taskId in desk.tasks"
      :key="taskId"
      :task-id="taskId"
    />
  </UContainer>
</template>

<script setup lang="ts">
import type { Desk } from '~/types'
import { useUserConfigStore } from '#imports'

const userConfigStore = useUserConfigStore()
defineProps<{
  desk: Desk
}>()
</script>
