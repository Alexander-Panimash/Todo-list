import { AxiosResponse } from 'axios';
import React from 'react';
import { ITask } from '../components/common/models/ITask';
import axiosTasksInstance from './axios/AxiosConfig';

class TasksService extends React.Component {
  getTasks(): Promise<AxiosResponse> {
    return axiosTasksInstance.get('/');
  }

  deleteTask(taskID: number): Promise<AxiosResponse> {
    return axiosTasksInstance.delete(`/${taskID}`);
  }

  addNewTask(task: ITask) {
    const newtTaskName = task.name;
    const newTaskDate = task.date;
    return axiosTasksInstance.post('/', {name: newtTaskName, date: newTaskDate});
  }

  processTask(task: ITask) {
    return axiosTasksInstance.put(`/finish/${task.id}`, {finished: !task.finished});
  }
}

export const tasksService = new TasksService({});
