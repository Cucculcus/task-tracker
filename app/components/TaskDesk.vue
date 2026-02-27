<template>
  <UContainer
    ref="draggable-list"
    :class="'w-full h-full flex items-center justify-center '"
  >
    <VueDraggable class="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2 md:gap-18 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-12">
      <TaskCardContainer
        v-for="taskId in tasks"
        :key="taskId"
        :task-id="taskId"
      ></TaskCardContainer
    ></VueDraggable>
  </UContainer>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

const deskStore = useDeskStore()

const tasks = computed(() =>  deskStore.getDesk(props.deskId)?.tasks

)
const props = defineProps<{
  deskId: string
}>()
</script>
