'use server'

import {addTodo as addTodoDao} from '@/db/sgbd'
import {AddTodo} from '@/lib/type'

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  try {
    addTodoDao(todo)
  } catch (error) {
    if (error) {
      console.error(error)
    }
    throw new Error(`Oups : ${error}`)
  }
  // 🐶 Appelle `addTodoDao(todo)` dans un `try catch`,
  // En effet, il faut pouvoir gérer les erreurs d'insersion en BDD.
  // Fais un `console.error` en cas d'erreur
  // et throw l'erreur pour la remonter au client

  //🐶 Pense à utiliser cette action dans `todos-view`
}

//🐶 N'oublie pas les exercices bonus
