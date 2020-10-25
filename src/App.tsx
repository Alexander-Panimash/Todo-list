import React, { useEffect, useState } from 'react';
import './App.scss';
import { FinishedTodoList } from './components/finished-todo-list/FinishedTodoList';
import { ITodo, TodoList } from './components/todos/TodoList';
import TodoToolbar from './components/toolbar/TodoToolbar';
import { todoService } from './services/TodoService';

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [finishedToDos, setFinishedToDos] = useState<ITodo[]>([]);

  useEffect(() => {
    setTodos(todoService.getTodos());
  }, []);

  const setTodosData = (todos: ITodo[]) => {
    todoService.setTodos(todos);
    getData();
  };

  const addNewTodo = (todo: ITodo) => {
    todoService.addNewTodo(todo);
    setTodos([...todoService.getTodos()]);
  };

  const getData = () => {
    setTodos([...todoService.getTodos()]);
    setFinishedToDos([...todoService.getFinishedTodos()]);
  };

  const finishTodo = (id: number) => {
    todoService.finishTodo(id);
    getData();
  };

  const unFinishTodo = (id: number) => {
    todoService.unfinishTodo(id);
    getData();
  };

  return (
    <div className="tasks">
      <h1 className="tasks__title">To do list</h1>
      <TodoToolbar addNewTodo={(todo: ITodo) => addNewTodo(todo)}/>
      {todos.length > 0
        ? <TodoList
          todos={todos}
          setTodos={(toDos: ITodo[]) => setTodosData(toDos)}
          finishTodo={(id: number) => finishTodo(id)}
        />
        : <h1 className="tasks__title"> Enjoy your day</h1>}
      {finishedToDos.length > 0
        ? <FinishedTodoList todos={finishedToDos} unFinishTodo={(id: number) => unFinishTodo(id)}/>
        : ''}
    </div>
  );
}

export default App;
