import React from 'react';
import { ITask } from '../components/common/models/ITask';

class TasksService extends React.Component {

  tasks: ITask[] = [
    {name: 'learn HTML', id: 1, finished: false, date: new Date()},
    {name: 'learn CSS', id: 2, finished: false, date: new Date()},
    {name: 'learn JavaScript', id: 3, finished: false, date: new Date()},
    {name: 'learn PHP', id: 4, finished: false, date: new Date()},
    {name: 'stay alive', id: 5, finished: false, date: new Date()}
  ];

  finishedTasks: ITask[] = [];

  getTasks(): ITask[] {
    return this.tasks;
  }

  setNewTasks(newTasks: ITask[]): void {
    this.tasks = newTasks;
  }

  setFinishedTasks(newFinishedTasks: ITask[]): void {
    this.finishedTasks = newFinishedTasks;
  }

  getFinishedTasks(): ITask[] {
    return this.finishedTasks;
  }

  addNewTask(task: ITask) {
    this.tasks.push(task);
  }

  finishTask(id: number) {
    this.processTask(this.tasks, this.finishedTasks, id, true,
      (task) => this.setFinishedTasks(task), (task) => this.setNewTasks(task));
  }

  unFinishTask(id: number) {
    this.processTask(this.finishedTasks, this.tasks, id, false,
      (task) => this.setNewTasks(task), (task) => this.setFinishedTasks(task));
  }

  private processTask(tasksToDelete: ITask[], tasksToAdd: ITask[], id: number, isFinished: boolean,
                      callbackToPutTask: (tasks: ITask[]) => void, callbackToDeleteTasks: (tasks: ITask[]) => void) {
    const temporaryTasks: ITask[] = [...tasksToDelete];
    const task = temporaryTasks.find((task) => task.id === id);
    if (task) {
      task.finished = isFinished;
      callbackToPutTask([...tasksToAdd, task]);
      const indexOfTaskToFinish = temporaryTasks.findIndex((task) => task.id === id);
      temporaryTasks.splice(indexOfTaskToFinish, 1);
      callbackToDeleteTasks(temporaryTasks);
    }
  }
}

export const tasksService = new TasksService({});
