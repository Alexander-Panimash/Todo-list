import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { ITask } from '../../../../common/models/ITask';

export interface IDeleteTaskModal {
  isOpen: boolean,
  toggle: () => void,
  deleteTask: () => void
  task: ITask
}

const DeleteTaskModal = (props: IDeleteTaskModal) => {
  const {isOpen, toggle, deleteTask, task} = props;

  const closeModal = () => {
    toggle();
  };

  return (
    <Dialog maxWidth='xs' fullWidth={true} open={isOpen}
            onClose={closeModal}>
      <DialogTitle>Deleting task</DialogTitle>
      <DialogContent>
        {`Are you sure want to delete "${task.name}"?`}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={closeModal}>Cancel</Button>
        <Button variant="contained" color="primary"
                onClick={deleteTask}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskModal;