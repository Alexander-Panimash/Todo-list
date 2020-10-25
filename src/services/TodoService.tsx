import React from 'react';
import { ITodo } from '../components/todos/TodoList';

class TodoService extends React.Component {

  todos: ITodo[] = [
    {name: 'learn HTML', id: 1, finished: false},
    {name: 'learn CSS', id: 2, finished: false},
    {name: 'learn JavaScript', id: 3, finished: false},
    {name: 'learn PHP', id: 4, finished: false},
    {name: 'stay alive', id: 5, finished: false}
  ];

  finishedTodos: ITodo[] = [];

  getTodos(): ITodo[] {
    return this.todos;
  }

  setTodos(newToDos: ITodo[]): void {
    this.todos = newToDos;
  }

  setFinishedTodos(newFinishedToDos: ITodo[]): void {
    this.finishedTodos = newFinishedToDos;
  }

  getFinishedTodos(): ITodo[] {
    return this.finishedTodos;
  }

  addNewTodo(todo: ITodo) {
    this.todos.push(todo);
  }

  finishTodo(id: number) {
    this.processTodo(this.todos, this.finishedTodos, id, true,
      (todo) => this.setFinishedTodos(todo), (todo) => this.setTodos(todo));
  }

  unfinishTodo(id: number) {
    this.processTodo(this.finishedTodos, this.todos, id, false,
      (todo) => this.setTodos(todo), (todo) => this.setFinishedTodos(todo));
  }

  private processTodo(todosToDelete: ITodo[], todosToAdd: ITodo[], id: number, isFinished: boolean,
                      callbackToPutTodo: (todos: ITodo[]) => void, callbackToDeleteTodo: (todos: ITodo[]) => void) {
    const temporaryToDos: ITodo[] = [...todosToDelete];
    const todoToProcess = temporaryToDos.find((todo) => todo.id === id);
    if (todoToProcess) {
      todoToProcess.finished = isFinished;
      callbackToPutTodo([...todosToAdd, todoToProcess]);
      const indexOfToDoToFinish = temporaryToDos.findIndex((todo) => todo.id === id);
      temporaryToDos.splice(indexOfToDoToFinish, 1);
      callbackToDeleteTodo(temporaryToDos);
    }
  }
}

export const todoService = new TodoService({});
