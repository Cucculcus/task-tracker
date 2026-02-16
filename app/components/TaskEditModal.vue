<template>
  <UModal
    v-model:open="isModalOpen"
    :dismissible="isDismissible"
    @update:open="(newValue) => (isModalOpen = newValue)"
    fullscreen
    title="Окно редактирования задачи"
  >
    <template #body>
      <TaskFormContainer
        :task-id="taskEditorStore.getLastInEdit()?.id"
        :desk-id
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import TaskFormContainer from './TaskFormContainer.vue'

const isDismissible = computed(() => {
  if (taskEditorStore.containsItems(0)) {
    return true
  }
  return false
})
const taskEditorStore = useTaskEditorStore()
const emit = defineEmits(['update:isOpen'])
const props = defineProps<{
  isOpen: boolean
  deskId?: string
}>()

const isModalOpen = computed({
  get() {
    return props.isOpen
  },
  set(value) {
    emit('update:isOpen', value)
  },
})

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    taskEditorStore.removeLast()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
  taskEditorStore.clean()
})
</script>
