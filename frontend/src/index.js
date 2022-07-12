import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Todos from './components/Todos';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Todos />
  </React.StrictMode>,
  document.getElementById('root'),
);
