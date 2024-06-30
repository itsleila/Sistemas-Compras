import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '../index';

const DefaultModal = ({ open, onClose, title, children, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: '#e4e4e7',
          border: '2px solid #09090b',
          borderRadius: '10px',
          boxShadow: 24,
          p: 4,
        }}
      >
        {title && (
          <h2 id="modal-modal-title" className="modal-title">
            {title}
          </h2>
        )}
        {children}
        {onConfirm && (
          <div style={{ marginTop: '20px' }}>
            <Button
              color="red"
              variant="outlined"
              text="deletar"
              size="small"
              sx={{
                '&:hover': {
                  backgroundColor: '#FF9494',
                },
              }}
              onClick={onConfirm}
            />
            <Button
              color="zinc95"
              size="small"
              variant="outlined"
              text="cancelar"
              sx={{
                '&:hover': {
                  backgroundColor: '#71717a',
                },
              }}
              onClick={onClose}
              style={{ marginLeft: '10px' }}
            />
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default DefaultModal;
