export default interface Todo {
  id: string
  done: boolean
  title: string
  dueDate: Date | null
  description: string
}
