import React, { useState } from 'react';
import { dragAndDropService } from '../../services/DragAndDropService';
import { Todo } from '../todo/Todo';
import './TodoList.scss';

export interface ITodo {
  id: number,
  finished: boolean,
  name: string
}

export interface ITodoListData {
  todoItems: ITodo[],
  setTodoItems: (todoItems: ITodo[]) => void,
  finishTodo: (id: number) => void;
}

export const TodoList = (props: ITodoListData) => {
  const [dragEndIndex, setDragEndIndex] = useState<number>(0);

  const finishTodo = (id: number) => {
    props.finishTodo(id);
  };

  return (
    <div className='todo-list'>
      {props.todoItems.map((todoElement, index) => {
        return <Todo index={index}
                     onDragStart={(e) => dragAndDropService.dragStartHandler(e)}
                     onDragEnd={(e) => dragAndDropService.dragEndHandler(e, index, dragEndIndex, props.todoItems,
                       (todoItems: ITodo[]) => props.setTodoItems(todoItems))}
                     onDragOver={(e) => dragAndDropService.dragOverHandler(e, index, (index: number) => setDragEndIndex(index))}
                     todo={todoElement} processTodo={(id: number) => finishTodo(id)}/>;
      })}
    </div>
  );
};
