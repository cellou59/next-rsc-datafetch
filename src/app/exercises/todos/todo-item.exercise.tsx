import {Checkbox} from '@/components/ui/checkbox'
import {cn} from '@/lib/utils'
import {Todo} from '@/lib/type'
import {updateTodo as updateTodoAction} from './actions'
import {toast} from 'sonner'
import {startTransition, useOptimistic} from 'react'

// 🐶 Crée 2 types `TodoOptimistic` et `OptimisticFields`
// `TodoOptimistic` Le type du State de l'optimistic hook (Todo + sending: boolean)
// `OptimisticFields` Le type des champs en entrée de la fonction de mise à jour de l'optimistic hook (`reducer`)

type TodoOptimistic = Todo & {
  sending?: boolean
}

type OptimisticFields = {isCompleted: boolean; sending: boolean}

export default function TodoItem({todo}: {todo: Todo}) {
  // 🐶 Utilise l'optimistic hook pour gérer l'état optimiste du `todo`
  // 🐶 Aide au typage : `useOptimistic<TypeDuState, TypeOptmisticValue>`

  // 🤖 const [optimisticTodo, updateOptimisticTodo] = seOptimistic<TypeDuState, TypeOptmisticValue>(todo, reducer)
  // 🐶 le `reducer` est une fonction avec 2 params (state, {isCompleted, sending}) qui merge tous les champs (utilise un spread operator)
  const [optimisticTodo, updateOptimisticTodo] = useOptimistic<
    TodoOptimistic,
    OptimisticFields
  >(todo, (state, optimisticFields: OptimisticFields): TodoOptimistic => {
    return {...state, ...optimisticFields}
  })

  const handleChange = async (isCompleted: boolean) => {
    // 🐶 Appelle ici `updateOptimisticTodo` en indiquant `sending` `true`
    updateOptimisticTodo({isCompleted, sending: true})
    try {
      await updateTodoAction({
        ...todo,
        isCompleted,
      })
    } catch (error) {
      toast.error(`Failed to update todo.${error}`)
    } finally {
      // 🐶 Appelle ici `updateOptimisticTodo` en indiquant `sending` `false`
      updateOptimisticTodo({isCompleted, sending: false})
    }
  }
  return (
    <>
      {/* 🐶 Remplace tous les `todo` par `optimisticTodo` */}
      <div className="flex items-center gap-4" key={optimisticTodo.id}>
        <Checkbox
          checked={optimisticTodo.isCompleted}
          id={`${optimisticTodo.id}`}
          // 🐶 Appelle `handleChange` dans `startTransition`
          onCheckedChange={(checked: boolean) =>
            startTransition(() => handleChange(checked as boolean))
          }
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': optimisticTodo.isCompleted,
            'animate-color-cycle': optimisticTodo.sending,
          })}
          htmlFor={`${optimisticTodo.id}`}
        >
          {optimisticTodo.title}
        </label>

        <span
          className={cn('text-sm text-gray-500 dark:text-gray-400 ', {
            'line-through': optimisticTodo.isCompleted,
          })}
        >
          {optimisticTodo.updadtedAt}
        </span>
      </div>
    </>
  )
}
