


import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Divider, Grid, IconButton, Stack, Card, CardMedia, CardContent, Chip, Avatar, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { CalendarMonth, Category, Close, Visibility } from '@mui/icons-material';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetailModal.css"


function ProductDetailModal({ open, onClose, product }) {
    if (!product) return null;
    console.log(product?.variant, 'product variants ')
    const countries = product.countries;
    const variants = product.variant;
    const [openProduct, setOpenProduct] = useState(false);
    
    // Function to open the modal with the selected product
    const handleOpenProduct = () => {
      setOpenProduct(true);
    };
    
    // Function to close the modal
    const handleCloseProduct = () => {
      setOpenProduct(false);
    };
   
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
  };

    return (
      <>
        <Modal open={open} onClose={onClose} aria-labelledby="product-detail-modal">
            <Box
                sx={{
                    maxWidth: '70vw',  // Responsive width
                    maxHeight: '85vh',  // Responsive height
                    overflowY: 'auto',  // Vertical scroll for overflow content
                    margin: 'auto',
                    mt: 4,
                    backgroundColor: '#e3eeef',
                    border: '1px solid #e3eeef',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3,
                    position: 'relative',  // For close icon positioning
                }}
            >
                {/* Close Button */}
                

                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                       
                    }}
                >
                    <Close />
                </IconButton>
               


                <Box sx={{ padding: 3,  minHeight: '100vh' }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        
          borderRadius: 2,
          padding: 3,
          mb: 2,
        }}
      >
        {/* Product Image */}
        <Box
          component="img"
          src={product?.logo}
          alt="Product Image"
          sx={{
            width: '100%',
            height: 300,
            objectFit: 'contain',
            // backgroundColor: 'red',
            borderRadius: 2,
            mb: 2,
          }}
        />

<IconButton
  sx={{
    background: 'rgba(0, 0, 0, 0.5)', // Set your preferred background color
    borderRadius: '50%',          // Makes the icon button circular
    padding: '3px',               // Adjust padding as needed
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.5)',    // Optional: change background color on hover
    },
  }}
>
  <Visibility   onClick={() => handleOpenProduct()}
 style={{color: 'white'}} />
</IconButton>

        {/* Product Name */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
         {product?.product_name}
        </Typography>
        <Divider sx={{ my: 1 }} />

        {/* <Box sx={{ display: 'flex', backgroundColor: "black", marginTop:2, alignItems: 'center',justifyContent: 'center', flexDirection: 'row', gap: 4 }}> */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, background: 'linear-gradient(45deg, #6aa5d1, #425391)', px:2,py:0.5, borderRadius: 3 }}>
  <Box  sx={{
        width: 35,
        height: 35,
        backgroundColor: '#fff', // White background for circle
        borderRadius: '50%', // Circular shape
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
       
      }}>
  <img
        src={product?.brand_logo}
        alt="brand logo"
        style={{
          width: 30,
          height: 30,
        
         
          objectFit: 'contain',  // Ensures logo remains contained within its box
        }}
      />
    </Box>
  
    <Typography  style={{color: 'white', fontSize: 16}}>  {product?.brand_name}</Typography>
  </Box>
  
{/* </Box> */}
        <Box sx={{ display: 'flex', marginTop:2, alignItems: 'center',justifyContent: 'center', flexDirection: 'row', gap: 4 }}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    <Category color="action" style={{ color: 'grey'}} />
    <Typography sx={{fontSize:12, color: 'grey'}} >{product.category_name}</Typography>
  </Box>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    <CalendarMonth color="action" style={{ color: 'grey'}} />
    <Typography sx={{fontSize:12, color: 'grey'}}>
      Created on: {new Date(product.createdAt).toLocaleDateString()}
    </Typography>
  </Box>
</Box>
        
      </Box>

     


      {/* <Box
    display="flex"
    flexDirection="row"
    alignItems="center"
    sx={{
        marginBottom: 3,borderRadius:20,
      padding: 1,               // Added padding for better spacing inside the border
      borderRadius: 1,          // Optional: for rounded corners
      border: '1px solid grey'
    }}
    gap={1}
  >
    <Box  sx={{ }}>
      <img
        src={product?.brand_logo}
        alt="brand logo"
        style={{
          width: 45,
          height: 45,
         
          objectFit: 'contain',  // Ensures logo remains contained within its box
        }}
      />
    </Box>

    <Typography sx={{ fontSize: 18 }}>
      {product?.brand_name}
    </Typography>
  </Box> */}

      {/* Content Section */}

      <Divider sx={{ my: 1 }} />

{/* Countries by Continent Section */}
<Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontSize: 20, color: 'black' }}>Countries by Continent</Typography>

<Grid container spacing={1} sx={{border: '1px solid #d3d3d3', borderRadius:3}}>
    {Object.entries(countries).map(([continent, countryList]) => (
        <Grid item xs={12} key={continent}>
            <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'background.default' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: 14}}>
                    {continent}
                </Typography>
                {countryList.length > 0 ? (
                    <Stack direction="row" spacing={0.5} rowGap={0.5} flexWrap="wrap" sx={{ mt: 0.5 }}>
                        {countryList.map((country) => (
                            <Typography
                                key={country}
                                variant="body2"
                                sx={{
                                    padding: '2px 6px',
                                    fontSize: '0.75rem',
                                    backgroundColor: 'grey.200',
                                    borderRadius: 1,
                                    margin: '2px 2px',
                                }}
                            >
                                {country}
                            </Typography>
                        ))}
                    </Stack>
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        No countries found
                    </Typography>
                )}
            </Box>
        </Grid>
    ))}
</Grid>


      <Paper sx={{ padding: 3,marginTop:3, borderRadius: 2, backgroundColor: '#ffffff' }}>
        {/* Product Description */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Product Description
        </Typography>
        <Typography sx={{ mb: 3 }}>
        High quality and popular among consumers, this product is crafted to meet the needs of customers who value excellence and durability. Designed with attention to detail, it promises a blend of functionality and style.
        </Typography>

        {/* Product Proof with Reason */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ mr: 2, backgroundColor: '#4caf50' }}>🔍</Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Proof Reason
          </Typography>
        </Box>
        <Typography>
        This product is included in the boycott list due to its association with companies that are owned or financially linked to Israel.


        </Typography>
      </Paper>
    </Box>

                </Box>

            
        </Modal>

        <Modal
  open={openProduct}
  onClose={handleCloseProduct}
  sx={{
    backdropFilter: 'blur(5px)', // Apply background blur
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <div
    style={{
      width: '50%',
      margin: 'auto',
      backgroundColor: '#fff',
      borderRadius: '12px', // Add border radius for rounded corners
      overflow: 'hidden', // Prevent content from overflowing the rounded corners
      padding: '20px',
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
      <IconButton onClick={handleCloseProduct}>
        <Close />
      </IconButton>
    </Box>

    <Box py={5}>
      <Slider {...sliderSettings}>
        {variants?.length > 0 &&
          variants.map((variant, index) => (
            <div key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 20px' }}>
                <img
                  src={variant}
                  alt={`Variant ${index + 1}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </div>
          ))}
      </Slider>
    </Box>
  </div>
</Modal>

</>
    );
}

ProductDetailModal.propTypes = {
    open: PropTypes.bool,
    product: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default ProductDetailModal;



