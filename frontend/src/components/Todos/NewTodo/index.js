import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Icon,
  Paper,
  Box,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import todosApi from '../../../services/api/todos';
import texts from '../../../constants/texts';

const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  addTodoButton: { marginLeft: 5 },
});

function NewTodo({ todos, errorHandler, todosSetter }) {
  const classes = useStyles();
  const [newTodoText, setNewTodoText] = useState('');

  async function addTodo(text) {
    try {
      const { data } = await todosApi.createResource({ resource: { text } });
      todosSetter([...todos, data]);
      setNewTodoText('');
    } catch (error) {
      errorHandler(error.message);
    }
  }

  return (
    <Paper className={classes.addTodoContainer}>
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1}>
          <TextField
            fullWidth
            value={newTodoText}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                addTodo(newTodoText);
              }
            }}
            onChange={(event) => setNewTodoText(event.target.value)}
          />
        </Box>
        <Button
          className={classes.addTodoButton}
          startIcon={<Icon>add</Icon>}
          onClick={() => addTodo(newTodoText)}
        >
          {texts.add}
        </Button>
      </Box>
    </Paper>
  );
}

export default NewTodo;

NewTodo.propTypes = {
  errorHandler: PropTypes.func.isRequired,
  todosSetter: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, text: PropTypes.string, completed: PropTypes.bool })).isRequired,
};
