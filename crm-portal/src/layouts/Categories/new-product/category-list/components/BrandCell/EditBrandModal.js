import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditCategory from 'layouts/Categories/new-product/EditCategory';
import EditBrand from 'layouts/Categories/new-product/EditBrand';

const EditBrandModal = ({ open, onClose, brand }) => {
  console.log(brand, 'branddddddddd');

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-brand-modal-title"
      aria-describedby="edit-brand-modal-description"
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
          maxWidth: 500, // Increased width
          width: '90vw', // Responsive width, 90% of viewport width
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
        <EditBrand brand={brand} onClose={onClose} />
      </Box>
    </Modal>
  );
}

EditBrandModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  brand: PropTypes.object.isRequired,
};

export default EditBrandModal;
