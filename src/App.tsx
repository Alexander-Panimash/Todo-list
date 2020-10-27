import React, { useEffect, useState } from 'react';
import './App.scss';
import { FinishedTodoList } from './components/finished-todo-list/FinishedTodoList';
import { ITodo, TodoList } from './components/todo-list/TodoList';
import TodoToolbar from './components/toolbar/TodoToolbar';
import { todoService } from './services/TodoService';

function App() {
  const [todoItems, setTodoItems] = useState<ITodo[]>([]);
  const [finishedTodoItems, setFinishedTodoItems] = useState<ITodo[]>([]);

  useEffect(() => {
    setTodoItems(todoService.getTodoItems());
  }, []);

  const setNewTodoItems = (todoItems: ITodo[]) => {
    todoService.setTodoItems(todoItems);
    getData();
  };

  const addNewTodo = (todo: ITodo) => {
    todoService.addNewTodo(todo);
    setNewTodoItems([...todoService.getTodoItems()]);
  };

  const getData = () => {
    setTodoItems([...todoService.getTodoItems()]);
    setFinishedTodoItems([...todoService.getFinishedTodoItems()]);
  };

  const finishTodo = (id: number) => {
    todoService.finishTodo(id);
    getData();
  };

  const unFinishTodo = (id: number) => {
    todoService.unFinishTodo(id);
    getData();
  };

  return (
    <div className="tasks">
      <h1 className="tasks__title">To do list</h1>
      <TodoToolbar addNewTodo={(todo: ITodo) => addNewTodo(todo)}/>
      {todoItems.length > 0
        ? <TodoList
          todoItems={todoItems}
          setTodoItems={(todoItems: ITodo[]) => setNewTodoItems(todoItems)}
          finishTodo={(id: number) => finishTodo(id)}
        />
        : <h1 className="tasks__title"> Enjoy your day</h1>}
      {finishedTodoItems.length > 0
        ? <FinishedTodoList
          todoItems={finishedTodoItems}
          setFinishedTodoItems={(finishedTodoItems: ITodo[]) => setFinishedTodoItems(finishedTodoItems)}
          unFinishTodo={(id: number) => unFinishTodo(id)}/>
        : ''}
    </div>
  );
}

export default App;
