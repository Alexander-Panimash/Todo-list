import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { ITask } from '../../components/common/models/ITask';
import DeleteTaskModal from '../../components/specific/tasks/modals/delete-task-modal/DeleteTaskModal';
import { TaskFilters } from '../../components/specific/tasks/task-filters/TaskFilters';
import { TasksList } from '../../components/specific/tasks/tasks-list/TasksList';
import Toolbar from '../../components/specific/tasks/toolbar/Toolbar';
import { TaskStore } from '../../store/TaskStore';
import './Tasks.scss';


const Tasks = inject('taskStore')(observer((stores: { taskStore: TaskStore }) => {
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<ITask>({} as ITask);
    const toggle = () => setIsDeleteTaskModalOpen(!isDeleteTaskModalOpen);

    const {storeTasks, getTasks, deleteTask, createTask, processTask} = stores.taskStore;
    const [finishedTasks, setFinishedTasks] = useState<ITask[]>([]);
    useEffect(() => {
      getTasks();
    }, []);

    const deleteTodoTask = () => {
      setIsDeleteTaskModalOpen(false);
      deleteTask(taskToDelete.id);
    };

    const getTaskToDelete = (task: ITask) => {
      setTaskToDelete(task);
      setIsDeleteTaskModalOpen(true);
    };

    const addNewTask = (task: ITask) => {
      createTask(task);
    };

    const processTodoTask = (task: ITask) => {
      processTask(task);
    };

    const unFinishTask = (id: number) => {
      // tasksService.unFinishTask(id);
      // getData();
    };

    const filterTasks = (filterName: string): void => {
      // if (filterName !== TimeFilters.all) {
      //   console.log(filterName, dateFilterService.filterTasks(filterName, tasks));
      //   setFilteredTasks(dateFilterService.filterTasks(filterName, tasks));
      //   setFiltersActive(true);
      // } else {
      //   setFiltersActive(false);
      // }
    };


    return (
      <div className="tasks">
        <h1 className="tasks__title">All tasks</h1>
        <Toolbar addNewTask={addNewTask}/>
        <DeleteTaskModal isOpen={isDeleteTaskModalOpen} toggle={toggle} deleteTask={deleteTodoTask} task={taskToDelete}/>
        <TaskFilters filterTasks={filterTasks}/>
        {storeTasks.length > 0
          ? <TasksList
            tasks={toJS(storeTasks)}
            processTaskState={processTodoTask}
            deleteTask={getTaskToDelete}
            isFinishedList={false}
          />
          : <h1 className="tasks__title"> Enjoy your day</h1>}
      </div>
    );
  }
));
export default Tasks;