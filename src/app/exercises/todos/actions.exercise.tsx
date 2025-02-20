'use server'

import {addTodo as addTodoDao} from '@/db/sgbd'
import {AddTodo} from '@/lib/type'

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  try {
    await addTodoDao(todo)
  } catch (error) {
    console.error('Failed to add todo', error)
    throw error
  }
}
