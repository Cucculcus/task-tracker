import type { Position } from '~/types'

export const useTaskPositionStore = defineStore('taskPositions', () => {
  const taskPositions = ref<Record<string, Position>>({
    id1: { x: 200, y: 100 },
    id2: { x: 400, y: 200 },
  })
  const getPosition = (id: string): Position => {
    return taskPositions.value[id]!
  }

  return { taskPositions, getPosition }
})
