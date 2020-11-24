import React from 'react';
import { Task } from '../../../common/components/task/Task';
import { ITask } from '../../../common/models/ITask';
import './TasksList.scss';

export interface ITaskListData {
  tasks: ITask[],
  processTaskState: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  isFinishedList: boolean,
  title?: string
}

export const TasksList = (props: ITaskListData) => {
  const {title, tasks} = props;
  const processTaskState = (task: ITask) => {
    props.processTaskState(task);
  };

  const deleteTask = (task: ITask) => {
    console.log(props.tasks);
    props.deleteTask(task);
  };

  return (
    <div className='tasks-list'>
      {title || ''}
      {tasks.map((task, index) => {
        return <Task key={task.name + task.id}
                     deleteTask={deleteTask}
                     index={index}
                     task={task}
                     processTask={processTaskState}/>;
      })}
    </div>
  );
};
