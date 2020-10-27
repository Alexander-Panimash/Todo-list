import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { ITodo } from '../../todo-list/TodoList';
import './CreateTodoModal.scss';

const CreateTodoModal = (props: { isOpen: boolean, toggle: () => void, addNewTodo: (todo: ITodo) => void }) => {
  const {isOpen, toggle, addNewTodo} = props;
  const [nameForNewTodo, setNameForNewTodo] = useState<string>('');

  const onChangeHandler = (event: any) => {
    setNameForNewTodo(event.target.value);
  };

  const closeModal = () => {
    toggle();
  };

  const addNewToDoAndCloseModal = () => {
    addNewTodo({name: nameForNewTodo, id: Math.round(Math.random() * 100000), finished: false});
    closeModal();
  };

  return (
    <Dialog className='create-todo-dialog' maxWidth='xs' fullWidth={true} open={isOpen}
            onClose={() => closeModal()}>
      <DialogTitle>Creating new Todo</DialogTitle>
      <DialogContent>
        <TextField label='name of Todo' placeholder="ToDo Name" id='todoName'
                   onChange={(value: any) => onChangeHandler(value)}/>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={() => closeModal()}>Cancel</Button>
        <Button variant="contained" disabled={!nameForNewTodo} color="primary"
                onClick={() => addNewToDoAndCloseModal()}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTodoModal; 