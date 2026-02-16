import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import type { Desk } from '~/types'

export const useDeskStore = defineStore('desks', () => {
  const taskStore = useTaskStore()
  const mockDeskId = nanoid()
  const desks = ref<Record<string, Desk>>({
    [mockDeskId]: {
      id: mockDeskId,
      title: 'BaseDesk',
      tasks: [taskStore.id1, taskStore.id2],
    },
  })

  const getDesk = computed(() => {
    return (deskId: string) => desks.value[deskId]
  })
  const getMockDesk = computed(() => {
    return desks.value[mockDeskId]
  })
  function createDesk(title: string) {
    const id = nanoid()
    desks.value[id] = { id, title: title, tasks: [] }
  }
  function addTaskToDesk(deskId: string, taskId: string) {
    desks.value[deskId]?.tasks.push(taskId)
  }
  return { desks, createDesk, getDesk, getMockDesk, addTaskToDesk }
})
