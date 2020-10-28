import { Checkbox } from '@material-ui/core';
import React from 'react';
import { ITodo } from '../../models/Todo';
import './Todo.scss';

export interface ITodosData {
  todo: ITodo,
  index: number,
  processTodo: (id: number) => void,
  onDragEnd: (e: any, index: number) => void,
  onDragStart: (e: any) => void,
  onDragOver: (e: any, index: number) => void
}

export const Todo = (props: ITodosData) => {
  const {todo, index, processTodo, onDragEnd, onDragStart, onDragOver} = props;
  return <div
    onDragEnd={(e) => onDragEnd(e, index)}
    onDragStart={(e) => onDragStart(e)}
    onDragOver={(e) => onDragOver(e, index)}
    key={todo.name + todo.id}
    draggable="true"
    className={todo.finished ? 'finished-todo-item' : 'todo-item'}
    id={todo.id.toString()}>
    <Checkbox
      onChange={() => processTodo(todo.id)}
      checked={todo.finished}
      inputProps={{'aria-label': 'primary checkbox'}}
    />
    <span className={todo.finished ? 'finished-task-name' : 'task-name'}>{todo.name}</span>
    <span>{todo.date.toDateString()}</span>
  </div>;
};
