import React from 'react';
import { ITask } from '../components/common/models/ITask';

class DragAndDropService extends React.Component {

  dragStartHandler(evt: any): void {
    evt.currentTarget.classList.add(`selected`);
  };

  dragEndHandler(evt: any, id: number, dragEndIndex: number, tasks: ITask[], setTasks: (tasks: ITask[]) => void): void {
    evt.preventDefault();
    evt.currentTarget.classList.remove(`selected`);
    const temporaryElements = [...tasks];
    const elementToSwitch = temporaryElements.splice(id, 1);
    temporaryElements.splice(dragEndIndex, 0, elementToSwitch[0]);
    setTasks(temporaryElements);
  };

  dragOverHandler(evt: any, id: number, setDragEndIndex: (index: number) => void): void {
    evt.preventDefault();
    setDragEndIndex(id);
  };

}

export const dragAndDropService = new DragAndDropService({});
