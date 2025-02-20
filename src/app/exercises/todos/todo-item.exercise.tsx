import {Checkbox} from '@/components/ui/checkbox'
import {cn} from '@/lib/utils'
import {Todo} from '@/lib/type'
import {updateTodo as updateTodoAction} from './actions'
import {toast} from 'sonner'
export default function TodoItem({todo}: {todo: Todo}) {
  const handleChange = async (isCompleted: boolean) => {
    const updatedTodo: Todo = {
      ...todo,
      isCompleted,
    }
    try {
      await updateTodoAction(updatedTodo)
      toast('Todo has been updated.')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update a todo')
    }
  }
  return (
    <>
      <div className="flex items-center gap-4" key={todo.id}>
        <Checkbox
          checked={todo.isCompleted}
          id={`${todo.id}`}
          onCheckedChange={(checked) => handleChange(checked as boolean)}
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': todo.isCompleted,
          })}
          htmlFor={`${todo.id}`}
        >
          {todo.title}
        </label>

        <span
          className={cn('text-sm text-gray-500 dark:text-gray-400 ', {
            'line-through': todo.isCompleted,
          })}
        >
          {todo.updadtedAt}
        </span>
      </div>
    </>
  )
}
