import React, { useState } from 'react';
import { dragAndDropService } from '../../../../services/DragAndDropService';
import { Task } from '../../../common/components/task/Task';
import { ITask } from '../../../common/models/ITask';
import './TasksList.scss';

export interface ITaskListData {
  tasks: ITask[],
  setTasks: (tasks: ITask[]) => void,
  finishTask: (id: number) => void;
}

export const TasksList = (props: ITaskListData) => {
  const [dragEndIndex, setDragEndIndex] = useState<number>(0);

  const finishTask = (id: number) => {
    props.finishTask(id);
  };

  return (
    <div className='tasks-list'>
      {props.tasks.map((task, index) => {
        return <Task key={task.name + task.id}
                     index={index}
                     onDragStart={(e) => dragAndDropService.dragStartHandler(e)}
                     onDragEnd={(e) => dragAndDropService.dragEndHandler(e, index, dragEndIndex, props.tasks, props.setTasks)}
                     onDragOver={(e) => dragAndDropService.dragOverHandler(e, index, setDragEndIndex)}
                     task={task}
                     processTask={finishTask}/>;
      })}
    </div>
  );
};
