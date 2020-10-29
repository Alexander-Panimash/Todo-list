import React, { useEffect, useState } from 'react';
import { ITask } from '../../components/common/models/ITask';
import { FinishedTasksList } from '../../components/specific/tasks/finished-tasks-list/FinishedTasksList';
import { TasksList } from '../../components/specific/tasks/tasks-list/TasksList';
import Toolbar from '../../components/specific/tasks/toolbar/Toolbar';
import { tasksService } from '../../services/TasksService';
import './Tasks.scss';

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setTasks(tasksService.getTasks());
  }, []);

  const setNewTasks = (tasks: ITask[]) => {
    tasksService.setNewTasks(tasks);
    getData();
  };

  const setNewFinishedTasks = (finishedTasks: ITask[]) => {
    tasksService.setFinishedTasks(finishedTasks);
    getData();
  };

  const addNewTask = (task: ITask) => {
    tasksService.addNewTask(task);
    setNewTasks([...tasksService.getTasks()]);
  };

  const getData = () => {
    setTasks([...tasksService.getTasks()]);
    setFinishedTasks([...tasksService.getFinishedTasks()]);
  };

  const finishTask = (id: number) => {
    tasksService.finishTask(id);
    getData();
  };

  const unFinishTask = (id: number) => {
    tasksService.unFinishTask(id);
    getData();
  };


  return (
    <div className="tasks">
      <h1 className="tasks__title">All tasks</h1>
      <Toolbar addNewTask={(task: ITask) => addNewTask(task)}/>
      {tasks.length > 0
        ? <TasksList
          tasks={tasks}
          setTasks={(tasks: ITask[]) => setNewTasks(tasks)}
          finishTask={(id: number) => finishTask(id)}
        />
        : <h1 className="tasks__title"> Enjoy your day</h1>}
      {finishedTasks.length > 0
        ? <FinishedTasksList
          finishedTasks={finishedTasks}
          setFinishedTasks={(finishedTasks: ITask[]) => setNewFinishedTasks(finishedTasks)}
          unFinishTask={(id: number) => unFinishTask(id)}/>
        : ''}
    </div>
  );
};

export default Tasks;