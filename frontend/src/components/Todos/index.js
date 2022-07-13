import {
  Container,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { useEffect, useState } from 'react';
import TodoHeader from './TodoHeader';
import Todo from './Todo';
import NewTodo from './NewTodo';

import todosApi from '../../services/api/todos';
import texts from '../../constants/texts';

const useStyles = makeStyles({
  todosContainer: { marginTop: 10, padding: 10 },
});

function Todos() {
  const classes = useStyles();
  const [error, setError] = useState();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await todosApi.getResource();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [setTodos]);

  function errorHandler(error) {
    setError(error);
  }

  function todosSetter(todos) {
    setError();
    setTodos(todos);
  }

  return (
    <Container maxWidth="md">
      <Typography textAlign="center" color="error">{error}</Typography>
      <TodoHeader title={texts.todosHeader} />
      <NewTodo todos={todos} errorHandler={(error) => errorHandler(error)} todosSetter={(error) => todosSetter(error)} />
      {todos.length > 0 && (
      <Paper className={classes.todosContainer}>
        <Box display="flex" flexDirection="column" alignItems="stretch">
          {todos.map((todo) => <Todo key={todo.id} todos={todos} todo={todo} errorHandler={(error) => errorHandler(error)} todosSetter={(todos) => todosSetter(todos)} />)}
        </Box>
      </Paper>
      )}
    </Container>
  );
}

export default Todos;
