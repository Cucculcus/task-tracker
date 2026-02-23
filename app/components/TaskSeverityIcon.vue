<template>
  <div
    class="rounded-full w-4 h-4"
    :class="[color]"
    :style="{ height: `${height}px`, width: `${width}px` }"
  ></div>
</template>

<script setup lang="ts">
import type { severity } from '~/types/task.model'
const color = computed(() => {
  switch (props.severity) {
    case 'hard':
      return 'bg-severity-hard'

    case 'middle':
      return 'bg-severity-middle'

    case 'easy':
      return 'bg-severity-easy'
  }
  return ''
})

const props = defineProps<{
  severity: severity
  isCompleted: boolean
  width?: number
  height?: number
}>()
</script>
