// LoadingSpinner.js
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';


const LoadingSpinner = ({ message }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="100%"
    textAlign="center"
    paddingBottom={20}
    marginTop={6}
  >
    {/* <CircularProgress /> */}
    <div className='loader' />
    {message && (
      <Typography variant="h6" mt={2} fontSize={14} color={"#bdbdbd"}>
        {message}
      </Typography>
    )}
  </Box>
);
LoadingSpinner.propTypes = {
    message: PropTypes.string,
  };

export default LoadingSpinner;
