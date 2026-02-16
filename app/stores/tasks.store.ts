import { nanoid } from 'nanoid'
import type { severity, Task } from '~/types/task.model'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Record<string, Task>>({})

  const getTask = (id: string): Task | undefined => {
    return tasks.value[id]
  }

  function editTask(
    id: string,
    editedParams: {
      severity: severity
      isCompleted?: boolean
      title: string
      plannedCompletionDate: Date
      text?: string
      subtasks?: string[]
    },
  ): void {
    const edited = tasks.value[id]
    if (edited) {
      edited.id = id
      edited.severity = editedParams.severity
      edited.isCompleted = editedParams.isCompleted ?? false
      edited.title = editedParams.title
      edited.text = editedParams.text
      edited.subtasks = editedParams.subtasks ?? new Array<string>()
      edited.createdDate = new Date()
      edited.plannedCompletionDate =
        editedParams.plannedCompletionDate ?? undefined
    }
  }

  function createTask(newTaskParams: {
    severity: severity
    isCompleted?: boolean
    title: string
    plannedCompletionDate: Date
    text?: string
    subtasks?: string[]
  }): Task {
    const id = nanoid()
    const newTask = {
      id,
      severity: newTaskParams.severity,
      isCompleted: newTaskParams.isCompleted ?? false,
      title: newTaskParams.title,
      text: newTaskParams.text,
      subtasks: newTaskParams.subtasks ?? new Array<string>(),
      createdDate: new Date(),
      plannedCompletionDate: newTaskParams.plannedCompletionDate ?? undefined,
    }

    return (tasks.value[id] = newTask)
  }
  function addSubTask(parentId: string, childId: string) {
    if (getTask(parentId) && getTask(childId)) {
      tasks.value[parentId]?.subtasks?.push(childId)
    } else throw new Error('DevError one from tasks not exist in addSubTask')
  }

  const task1 = createTask({
    severity: 'hard',
    title: 'testTask1',
    text: 'simple task content blablabla',
    plannedCompletionDate: new Date(),
  })
  const task2 = createTask({
    severity: 'middle',
    title: 'testTask2',
    text: 's222222222',
    plannedCompletionDate: new Date(),
  })
  const task3 = createTask({
    severity: 'hard',
    title: 'testTask3',
    text: 'simple 3333333333',
    plannedCompletionDate: new Date(),
  })
  addSubTask(task2.id, task3.id)

  return {
    tasks,
    getTask,
    editTask,
    createTask,
    addSubTask,
    id1: task1.id,
    id2: task2.id,
    id3: task3.id,
  }
})
