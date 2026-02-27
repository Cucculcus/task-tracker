export const useDeskManagerStore = defineStore('deskManagerStore', () => {
  const deskStore = useDeskStore()
  const taskStore = useTaskStore()

  function deleteTask(taskId: string, deskId: string) {
    deskStore.deleteTaskFromDesk(deskId, taskId)
    taskStore.deleteTask(taskId)
  }

  return { deleteTask }
})
