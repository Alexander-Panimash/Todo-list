import React, { useEffect, useState } from 'react';
import { ITask } from '../../components/common/models/ITask';
import { FinishedTasksList } from '../../components/specific/tasks/finished-tasks-list/FinishedTasksList';
import { TaskFilters } from '../../components/specific/tasks/task-filters/TaskFilters';
import { TasksList } from '../../components/specific/tasks/tasks-list/TasksList';
import Toolbar from '../../components/specific/tasks/toolbar/Toolbar';
import { TimeFilters } from '../../enum/TimeFilters.enum';
import { dateFilterService } from '../../services/DateFilterService';
import { tasksService } from '../../services/TasksService';
import './Tasks.scss';

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<ITask[]>([]);
  const [filtersActive, setFiltersActive] = useState<boolean>(false);

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

  const filterTasks = (filterName: string): void => {
    if (filterName !== TimeFilters.all) {
      console.log(filterName, dateFilterService.filterTasks(filterName, tasks));
      setFilteredTasks(dateFilterService.filterTasks(filterName, tasks));
      setFiltersActive(true);
    } else {
      setFiltersActive(false);
    }

  };


  return (
    <div className="tasks">
      <h1 className="tasks__title">All tasks</h1>
      <Toolbar addNewTask={addNewTask}/>
      <TaskFilters filterTasks={filterTasks}/>
      {tasks.length > 0
        ? <TasksList
          tasks={filtersActive ? filteredTasks : tasks}
          setTasks={setNewTasks}
          finishTask={finishTask}
        />
        : <h1 className="tasks__title"> Enjoy your day</h1>}
      {finishedTasks.length > 0
        ? <FinishedTasksList
          finishedTasks={finishedTasks}
          setFinishedTasks={setNewFinishedTasks}
          unFinishTask={unFinishTask}/>
        : ''}
    </div>
  );
};

export default Tasks;