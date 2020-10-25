import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { ITodo } from '../todos/TodoList';
import CreateTodoModal from './create-todo-modal/CreateTodoModal';
import './TodoToolbar.scss';

const TodoToolbar = (props: { addNewTodo: (todo: ITodo) => void }) => {

  const [isCreateTodoModalOpen, setIsCreateTodoModalOpen] = useState(false);
  const addNewTodo = (todo: ITodo) => props.addNewTodo(todo);

  const toggle = () => setIsCreateTodoModalOpen(!isCreateTodoModalOpen);

  return (
    <div className='todo-toolbar'>
      <CreateTodoModal isOpen={isCreateTodoModalOpen} addNewTodo={(todo: ITodo) => addNewTodo(todo)}
                       toggle={() => toggle()}/>
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggle()}>Add ToDo
      </Button>
    </div>
  );
};

export default TodoToolbar;