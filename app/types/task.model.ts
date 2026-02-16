export type severity = 'hard' | 'middle' | 'easy'

export interface Task {
  id: string
  severity: severity
  isCompleted: boolean
  title: string
  text?: string | undefined
  subtasks?: string[]
  createdDate: Date
  plannedCompletionDate: Date | undefined
}

export interface Position {
  x: number
  y: number
}
