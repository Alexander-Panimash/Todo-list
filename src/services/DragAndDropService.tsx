import React from 'react';
import { ITodo } from '../models/Todo';

class DragAndDropService extends React.Component {

  dragStartHandler(evt: any): void {
    evt.currentTarget.classList.add(`selected`);
  };

  dragEndHandler(evt: any, id: number, dragEndIndex: number, todoItems: ITodo[], setTodoItems: (todoItems: ITodo[]) => void): void {
    evt.preventDefault();
    evt.currentTarget.classList.remove(`selected`);
    const temporaryElements = [...todoItems];
    const elementToSwitch = temporaryElements.splice(id, 1);
    temporaryElements.splice(dragEndIndex, 0, elementToSwitch[0]);
    setTodoItems(temporaryElements);
  };

  dragOverHandler(evt: any, id: number, setDragEndIndex: (index: number) => void): void {
    evt.preventDefault();
    setDragEndIndex(id);
  };

}

export const dragAndDropService = new DragAndDropService({});
