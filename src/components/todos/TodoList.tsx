import { Checkbox } from '@material-ui/core';

import React, { useState } from 'react';
import './TodoList.scss';

export interface ITodo {
  id: number,
  finished: boolean,
  name: string
}

export interface ITodosData {
  todos: ITodo[],
  setTodos: (toDos: ITodo[]) => void,
  finishTodo: (id: number) => void;
}

export const TodoList = (props: ITodosData) => {
  const [dragEndIndex, setDragEndIndex] = useState<number>(0);

  const dragStartHandler = (evt: any) => {
    evt.currentTarget.classList.add(`selected`);
  };
  const dragEndHandler = (evt: any, id: number) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove(`selected`);
    switchElements(id);
  };

  const dragOverHandler = (evt: any, id: number) => {
    evt.preventDefault();
    setDragEndIndex(id);
  };
  const switchElements = (indexELementToSwitch: number) => {
    const temporaryElements = [...props.todos];
    const elementToSwitch = temporaryElements.splice(indexELementToSwitch, 1);
    temporaryElements.splice(dragEndIndex, 0, elementToSwitch[0]);
    props.setTodos(temporaryElements);
  };

  const finishTodo = (id: number) => {
    props.finishTodo(id);
  };

  return (
    <div className='todo-list'>
      {props.todos.map((todoElement, index) => {
        return <div
          key={todoElement.name + todoElement.id}
          onDragEnd={(e) => dragEndHandler(e, index)}
          onDragStart={(e) => dragStartHandler(e)}
          onDragOver={(e) => dragOverHandler(e, index)}
          draggable="true"
          className="todo-item"
          id={todoElement.id.toString()}>
          <Checkbox
            onChange={() => finishTodo(todoElement.id)}
            inputProps={{'aria-label': 'primary checkbox'}}
          />
          <span className='task-name'>{todoElement.name}</span>
        </div>;
      })}
    </div>
  );
};
