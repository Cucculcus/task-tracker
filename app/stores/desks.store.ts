import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import type { Desk } from '~/types'

export const useDeskStore = defineStore('deskStore', () => {
  const taskStore = useTaskStore()
  const mockDeskId = nanoid()

  const desks = ref<Map<string, Desk>>(new Map())
  desks.value.set(mockDeskId, {
    id: mockDeskId,
    title: 'BaseDesk',
    tasks: [taskStore.id1, taskStore.id2],
  })
  const getDesks = computed(() => {
    return Array.from(desks.value.values())
  })

  const getDesk = computed(() => {
    return (deskId: string) => {
      if (deskId) {
        return desks.value.get(deskId)
      }
      return undefined
    }
  })
  const getMockDesk = computed(() => {
    return desks.value.get(mockDeskId)
  })
  function createDesk(title: string): string {
    const id = nanoid()
    desks.value.set(id, { id, title: title, tasks: [] })
    return id
  }
  function addTaskToDesk(deskId: string, taskId: string) {
    desks.value.get(deskId)?.tasks.push(taskId)
  }
  function deleteTaskFromDesk(deskId: string, taskId: string) {
    const desk = desks.value.get(deskId)
    if (desk) {
      desk.tasks = desk.tasks.filter((id) => id !== taskId)
    }
  }

  return {
    desks,
    createDesk,
    getDesk,
    getMockDesk,
    addTaskToDesk,
    deleteTaskFromDesk,
    getDesks,
  }
})
