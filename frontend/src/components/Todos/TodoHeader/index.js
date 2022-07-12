import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function TodoHeader({ title }) {
  return <Typography variant="h3" component="h1" gutterBottom>{title}</Typography>;
}

export default TodoHeader;

TodoHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
