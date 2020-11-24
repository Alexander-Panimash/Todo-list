import { AxiosError, AxiosResponse } from 'axios';
import { action, makeAutoObservable } from 'mobx';
import { ITask } from '../components/common/models/ITask';
import { tasksService } from '../services/TasksService';


export class TaskStore {
  storeTasks: ITask[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public getTasks = () => {
    this.storeTasks = [];
    tasksService.getTasks().then(
      action('fetchSuccess', (response: AxiosResponse) => {
        this.storeTasks = response.data;
      }),
      action('fetchError', (error: AxiosError) => {
        console.log(error);
      })
    );
  };

  public deleteTask = (taskID: number) => {
    tasksService.deleteTask(taskID).then(
      action('deleteSuccess', (response: AxiosResponse) => {
        console.log(response);
        this.getTasks();
      }),
      action('deleteError', (error: AxiosError) => {
        console.log(error);
      })
    );
  };

  public createTask = (task: ITask) => {
    tasksService.addNewTask(task).then(
      action('creatingSuccess', (response: AxiosResponse) => {
        console.log(response);
        this.getTasks();
      }),
      action('creatingError', (error: AxiosError) => {
        console.log(error);
      })
    );
  };

  public processTask = (task: ITask) => {
    tasksService.processTask(task).then(
      action('finishingSuccess', (response: AxiosResponse) => {
        console.log(response);
        this.getTasks();
      }),
      action('finishingError', (error: AxiosError) => {
        console.log(error);
      })
    );
  };
}

const TasksStore = new TaskStore();
export default TasksStore;