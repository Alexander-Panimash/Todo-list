import React, { useState } from 'react';
import { ITodo } from '../../models/Todo';
import { dragAndDropService } from '../../services/DragAndDropService';
import { Todo } from '../todo/Todo';
import './FinishedTodoList.scss';

export interface IFinishedTodoList {
  todoItems: ITodo[],
  setFinishedTodoItems: (finishedTodoItems: ITodo[]) => void,
  unFinishTodo: (id: number) => void;
}

export const FinishedTodoList = (props: IFinishedTodoList) => {
  const [dragEndIndex, setDragEndIndex] = useState<number>(0);

  const unFinishTodo = (id: number) => {
    props.unFinishTodo(id);
  };
  return (
    <div className='finished-todo-list'>
      <h2>Finished Tasks</h2>
      {props.todoItems.map((todoElement, index) => {
        return <Todo
          key={todoElement.name + todoElement.id}
          index={index}
          onDragStart={(e) => dragAndDropService.dragStartHandler(e)}
          onDragEnd={(e) => dragAndDropService.dragEndHandler(e, index, dragEndIndex, props.todoItems,
            (todoItems: ITodo[]) => props.setFinishedTodoItems(todoItems))}
          onDragOver={(e) => dragAndDropService.dragOverHandler(e, index, (index: number) => setDragEndIndex(index))}
          processTodo={(id: number) => unFinishTodo(id)}
          todo={todoElement}/>;
      })}
    </div>
  );
};
