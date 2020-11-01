import React, { useState } from 'react';
import { dragAndDropService } from '../../../../services/DragAndDropService';
import { Task } from '../../../common/components/task/Task';
import { ITask } from '../../../common/models/ITask';
import './FinishedTasksList.scss';

export interface IFinishedTasksList {
  finishedTasks: ITask[],
  setFinishedTasks: (finishedTasks: ITask[]) => void,
  unFinishTask: (id: number) => void;
}

export const FinishedTasksList = (props: IFinishedTasksList) => {
  const [dragEndIndex, setDragEndIndex] = useState<number>(0);

  const unFinishTask = (id: number) => {
    props.unFinishTask(id);
  };

  return (
    <div className='finished-tasks-list'>
      <h2>Finished Tasks</h2>
      {props.finishedTasks.map((task, index) => {
        return <Task
          key={task.name + task.id}
          index={index}
          onDragStart={(e) => dragAndDropService.dragStartHandler(e)}
          onDragEnd={(e) => dragAndDropService.dragEndHandler(e, index, dragEndIndex, props.finishedTasks, props.setFinishedTasks)}
          onDragOver={(e) => dragAndDropService.dragOverHandler(e, index, setDragEndIndex)}
          processTask={unFinishTask}
          task={task}/>;
      })}
    </div>
  );
};
