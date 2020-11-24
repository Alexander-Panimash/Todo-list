import { Checkbox } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React from 'react';
import { ITask } from '../../models/ITask';
import './Task.scss';

export interface ITaskData {
  task: ITask,
  index: number,
  processTask: (task: ITask) => void,
  deleteTask: (task: ITask) => void;
}

export const Task = (props: ITaskData) => {
  const {task, processTask, deleteTask} = props;
  return <div className='task-container'>
    <div
      key={task.name + task.id}
      draggable="false"
      className={task.finished ? 'finished-task' : 'task'}
      id={task.id.toString()}>
      <Checkbox
        onChange={() => processTask(task)}
        checked={task.finished}
        inputProps={{'aria-label': 'primary checkbox'}}
      />
      <span className={task.finished ? 'finished-task-name' : 'task-name'}>{task.name}</span>
      <span>{new Date(task.date).toDateString()}</span>
    </div>
    <EditIcon className='edit-icon'/>
    <HighlightOffIcon className='delete-icon' onClick={() => deleteTask(task)}/>
  </div>;
};

