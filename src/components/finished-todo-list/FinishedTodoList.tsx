import { Checkbox } from '@material-ui/core';
import React from 'react';
import { ITodo } from '../todos/TodoList';
import './FinishedTodoList.scss';

export const FinishedTodoList = (props: { todos: ITodo[], unFinishTodo: (id: number) => void }) => {
  const unFinishTodo = (id: number) => {
    props.unFinishTodo(id);
  };

  return (
    <div className='finished-todo-list'>
      <h2>Finished ToDos</h2>
      {props.todos.map((todoElement) => {
        return <div
          key={todoElement.name}
          className="finished-todo-item"
          id={todoElement.id.toString()}>
          <Checkbox
            checked={true}
            color="primary"
            onChange={() => unFinishTodo(todoElement.id)}
            inputProps={{'aria-label': 'primary checkbox'}}
          />
          <span className='finished-task-name'>{todoElement.name}</span>
        </div>;
      })}
    </div>
  );
};
