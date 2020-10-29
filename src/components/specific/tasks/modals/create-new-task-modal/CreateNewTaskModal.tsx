import DateFnsUtils from '@date-io/date-fns';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState } from 'react';
import { ITask } from '../../../../common/models/ITask';
import './CreateNewTaskModal.scss';

export interface ICreateNewTaskModal {
  isOpen: boolean,
  toggle: () => void,
  addNewTask: (task: ITask) => void
}

const CreateNewTaskModal = (props: ICreateNewTaskModal) => {
  const {isOpen, toggle, addNewTask} = props;
  const [nameForNewTask, setNameForNewTask] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());


  const onChangeHandler = (event: any) => {
    setNameForNewTask(event.target.value);
  };

  const closeModal = () => {
    toggle();
  };

  const addNewTaskAndCloseModal = () => {
    addNewTask({
      name: nameForNewTask,
      id: Math.round(Math.random() * 100000),
      finished: false,
      date: selectedDate as Date
    });
    setSelectedDate(new Date());
    setNameForNewTask('');
    closeModal();
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };


  return (
    <Dialog className='create-task-modal' maxWidth='xs' fullWidth={true} open={isOpen}
            onClose={() => closeModal()}>
      <DialogTitle>Creating new task</DialogTitle>
      <DialogContent>
        <TextField label='name of new task' placeholder="new task name" id="taskName"
                   onChange={(value: any) => onChangeHandler(value)}/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time'
            }}
          />

        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={() => closeModal()}>Cancel</Button>
        <Button variant="contained" disabled={!nameForNewTask} color="primary"
                onClick={() => addNewTaskAndCloseModal()}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewTaskModal;