import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditCategory from '../EditCategory';

const EditAdModal = ({ open, onClose, adData }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="edit-adData-modal-title"
    aria-describedby="edit-adData-modal-description"
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(3px)', // Adds a subtle background blur
    }}
  >
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.paper',
        boxShadow: 24,
        border: '2px solid #11CDEF',
        p: 4,
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflowY: 'auto',
        // borderRadius: 2,
        outline: 'none', // Remove default outline
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'grey.500',
          zIndex: 1300, // Ensure the icon is above all content
        }}
      >
        <CloseIcon />
      </IconButton>
      <EditCategory adData={adData} onClose={onClose} />
    </Box>
  </Modal>
);

EditAdModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  adData: PropTypes.object.isRequired,
};

export default EditAdModal;
