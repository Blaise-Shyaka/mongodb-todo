import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Button, Modal, Typography,
} from '@mui/material';

const style = {
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  left: '50%',
  p: 4,
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
};

export default function BasicModal({
  open, onClose, modalTitle, modalContent, action, actionText,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          {modalTitle}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalContent}
        </Typography>
        <Button sx={{ marginTop: 2 }} variant="outlined" onClick={action}>{actionText}</Button>
      </Box>
    </Modal>
  );
}

BasicModal.propTypes = {
  modalContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  modalTitle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
};

BasicModal.defaultProps = {
  modalTitle: undefined,
};
