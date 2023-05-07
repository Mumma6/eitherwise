import { Todo } from "./TodoApp"
import { getOption, optionFold } from "eitherwise"

interface IProps {
  todos: Todo[]
  error: undefined | string
}
const TodoList = ({ todos, error }: IProps) => {
  const errorOption = getOption(error)
  const message = optionFold(
    errorOption,
    () => "No errors",
    (errorMessage) => errorMessage
  )
  return (
    <div>
      {message}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
