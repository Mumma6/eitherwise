import { useState, useEffect } from "react"
import axios from "axios"
import { eitherAsyncTryCatch, eitherAsyncFold, Either, eitherAsyncMap } from "eitherwise"
import TodoList from "./TodoList"

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string | undefined>(undefined)

  const filterTodosByUserId = (todos: Todo[]) => todos.filter((todo) => todo.userId === 1)
  const filterTodosByCompleted = (todos: Todo[]) => todos.filter((todo) => todo.completed)
  const todosTitleToUpperCase = (todos: Todo[]) =>
    todos.map((todo) => ({
      ...todo,
      title: todo.title.toUpperCase(),
    }))

  const fetchTodos = async (): Promise<Either<string, Todo[]>> =>
    eitherAsyncTryCatch(
      async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
        return response.data
      },
      () => "Error fetching data"
    )

  useEffect(() => {
    const fetchData = async () => {
      const mappedEitherAsync = eitherAsyncMap(
        fetchTodos(),
        filterTodosByUserId,
        filterTodosByCompleted,
        todosTitleToUpperCase
      )
      eitherAsyncFold(
        mappedEitherAsync,
        (error) => setError(`Error: ${error}`),
        (data) => setTodos(data)
      )
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <TodoList todos={todos} error={error} />
    </div>
  )
}

export default TodoApp
