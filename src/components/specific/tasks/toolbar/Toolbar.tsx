import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { ITask } from '../../../common/models/ITask';
import CreateNewTaskModal from '../modals/create-new-task-modal/CreateNewTaskModal';
import './Toolbar.scss';

const Toolbar = (props: { addNewTask: (task: ITask) => void }) => {

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const addNewTask = (task: ITask) => props.addNewTask(task);

  const toggle = () => setIsCreateTaskModalOpen(!isCreateTaskModalOpen);

  return (
    <div className='tasks-toolbar'>
      <CreateNewTaskModal isOpen={isCreateTaskModalOpen} addNewTask={(task: ITask) => addNewTask(task)}
                          toggle={() => toggle()}/>
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggle()}>Add new task
      </Button>
    </div>
  );
};

export default Toolbar;