import { Checkbox } from '@material-ui/core';
import React from 'react';
import { ITask } from '../../models/ITask';
import './Task.scss';

export interface ITaskData {
  task: ITask,
  index: number,
  processTask: (id: number) => void,
  onDragEnd: (e: any, index: number) => void,
  onDragStart: (e: any) => void,
  onDragOver: (e: any, index: number) => void
}

export const Task = (props: ITaskData) => {
  const {task, index, processTask, onDragEnd, onDragStart, onDragOver} = props;
  return <div
    onDragEnd={(e) => onDragEnd(e, index)}
    onDragStart={(e) => onDragStart(e)}
    onDragOver={(e) => onDragOver(e, index)}
    key={task.name + task.id}
    draggable="true"
    className={task.finished ? 'finished-task' : 'task'}
    id={task.id.toString()}>
    <Checkbox
      onChange={() => processTask(task.id)}
      checked={task.finished}
      inputProps={{'aria-label': 'primary checkbox'}}
    />
    <span className={task.finished ? 'finished-task-name' : 'task-name'}>{task.name}</span>
    <span>{task.date.toDateString()}</span>
  </div>;
};
