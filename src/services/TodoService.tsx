import React from 'react';
import { ITodo } from '../components/todo-list/TodoList';

class TodoService extends React.Component {

  todoItems: ITodo[] = [
    {name: 'learn HTML', id: 1, finished: false},
    {name: 'learn CSS', id: 2, finished: false},
    {name: 'learn JavaScript', id: 3, finished: false},
    {name: 'learn PHP', id: 4, finished: false},
    {name: 'stay alive', id: 5, finished: false}
  ];

  finishedTodoItems: ITodo[] = [];

  getTodoItems(): ITodo[] {
    return this.todoItems;
  }

  setTodoItems(newToDos: ITodo[]): void {
    this.todoItems = newToDos;
  }

  setFinishedTodoItems(newFinishedToDos: ITodo[]): void {
    this.finishedTodoItems = newFinishedToDos;
  }

  getFinishedTodoItems(): ITodo[] {
    return this.finishedTodoItems;
  }

  addNewTodo(todo: ITodo) {
    this.todoItems.push(todo);
  }

  finishTodo(id: number) {
    this.processTodo(this.todoItems, this.finishedTodoItems, id, true,
      (todo) => this.setFinishedTodoItems(todo), (todo) => this.setTodoItems(todo));
  }

  unFinishTodo(id: number) {
    this.processTodo(this.finishedTodoItems, this.todoItems, id, false,
      (todo) => this.setTodoItems(todo), (todo) => this.setFinishedTodoItems(todo));
  }

  private processTodo(todosToDelete: ITodo[], todosToAdd: ITodo[], id: number, isFinished: boolean,
                      callbackToPutTodo: (todoItems: ITodo[]) => void, callbackToDeleteTodo: (todoItems: ITodo[]) => void) {
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
