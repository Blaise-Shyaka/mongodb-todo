import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import {
  Typography,
  Button,
  Icon,
  Box,
  Checkbox,
  TextField,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import BasicModal from '../../BasicModal';

import todosApi from '../../../services/api/todos';
import texts from '../../../constants/texts';

const useStyles = makeStyles({
  todoContainer: {
    borderTop: '1px solid #bfbfbf',
    marginTop: 5,
    '&:first-child': {
      margin: 0,
      borderTop: 'none',
    },
    '&:hover': {
      '& $deleteTodo': {
        visibility: 'visible',
      },
      '& $noDueDate': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
  todoTextCompleted: {
    textDecoration: 'line-through',
  },
  deleteTodo: {
    visibility: 'hidden',
  },
  noDueDate: {
    display: 'none',
  },
  dueDate: {
    display: 'flex',
    alignItems: 'center',
  },
});

// eslint-disable-next-line object-curly-newline
function Todo({ todos, todo, errorHandler, todosSetter }) {
  const [open, setOpen] = useState(false);
  const [dueDate, setDueDate] = useState();
  const classes = useStyles();
  const { id, completed, text } = todo;

  async function toggleTodoCompleted(id) {
    try {
      await todosApi.updateResource({ id, resource: { field: { completed: !completed } } });
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        completed: !newTodos[modifiedTodoIndex].completed,
      };
      todosSetter(newTodos);
    } catch (error) {
      errorHandler(error.message);
    }
  }

  async function deleteTodo(id) {
    try {
      await todosApi.deleteResource({ id });
      const newTodos = todos.filter((todo) => todo.id !== id);
      todosSetter(newTodos);
    } catch (error) {
      errorHandler(error.message);
    }
  }

  async function changeTodoDueDate(id, dueDate) {
    try {
      await todosApi.updateResource({ id, resource: { field: { dueDate } } });
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        dueDate,
      };
      todosSetter(newTodos);
    } catch (error) {
      errorHandler(error.message);
    }
    setOpen(false);
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      className={classes.todoContainer}
    >
      <Checkbox
        checked={completed}
        onChange={() => toggleTodoCompleted(id)}
      />
      <Box flexGrow={1}>
        <Typography
          className={completed ? classes.todoTextCompleted : ''}
          variant="body1"
        >
          {text}
        </Typography>
        <Box className={todo.dueDate ? classes.dueDate : classes.noDueDate}>
          <Button
            startIcon={<CalendarMonthIcon color="primary" />}
            onClick={() => setOpen(true)}
          />
          <Typography sx={{ fontSize: '0.6rem' }}>{todo.dueDate || 'Not Set'}</Typography>
        </Box>
        <BasicModal
          modalTitle="Set Todo Due Date"
          modalContent={<TextField value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" />}
          open={open}
          onClose={() => setOpen(false)}
          action={() => changeTodoDueDate(id, dueDate)}
          actionText="Set Due Date"
        />
      </Box>
      <Button
        className={classes.deleteTodo}
        startIcon={<Icon>delete</Icon>}
        onClick={() => deleteTodo(id)}
      >
        {texts.delete}
      </Button>
    </Box>
  );
}

export default Todo;

Todo.propTypes = {
  errorHandler: PropTypes.func.isRequired,
  todosSetter: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, text: PropTypes.string, completed: PropTypes.bool })).isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string, text: PropTypes.string, completed: PropTypes.bool, dueDate: PropTypes.string,
  }).isRequired,
};
