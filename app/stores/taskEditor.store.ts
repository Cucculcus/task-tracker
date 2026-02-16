import type { Task } from '~/types'

export const useTaskEditorStore = defineStore('taskEditor', () => {
  const tasksInEdit = ref<Task[]>([])

  const getLastInEdit = (): Task | undefined => {
    return tasksInEdit.value.at(-1)
  }

  const containsItems = computed(() => {
    return (numOfItems: number) => tasksInEdit.value.length === numOfItems
  })
  const isEmpty = computed(() => {
    return containsItems.value(0)
  })

  function addTaskInEdit(newTask: Task) {
    tasksInEdit.value.push(newTask)
  }
  function removeLast() {
    tasksInEdit.value.pop()
  }
  function clean() {
    tasksInEdit.value = []
  }
  return {
    tasksInEdit,
    addTaskInEdit,
    getLastInEdit,
    removeLast,
    clean,
    containsItems,
    isEmpty,
  }
})
