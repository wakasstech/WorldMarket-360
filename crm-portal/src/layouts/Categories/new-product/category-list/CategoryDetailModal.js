// import React from 'react';
// import { Modal, Box, Typography, Divider, Grid, IconButton, Stack } from '@mui/material';
// import PropTypes from 'prop-types';
// import { Close } from '@mui/icons-material';

// function CategoryDetailModal({ open, onClose, category }) {
//     if (!category) return null;

//     const countries = JSON.parse(category.countries);
    
//     // Mock data for brands and products with clearer images
//     const brands = [
//         { id: 1, name: 'Brand A', logo: 'https://via.placeholder.com/100x100.png?text=Brand+A' },
//         { id: 2, name: 'Brand B', logo: 'https://via.placeholder.com/100x100.png?text=Brand+B' },
//         { id: 3, name: 'Brand C', logo: 'https://via.placeholder.com/100x100.png?text=Brand+C' },
//     ];

//     const products = [
//         { id: 1, name: 'Product X', logo: 'https://via.placeholder.com/100x100.png?text=Product+X' },
//         { id: 2, name: 'Product Y', logo: 'https://via.placeholder.com/100x100.png?text=Product+Y' },
//         { id: 3, name: 'Product Z', logo: 'https://via.placeholder.com/100x100.png?text=Product+Z' },
//     ];

//     return (
//         <Modal open={open} onClose={onClose} aria-labelledby="category-detail-modal">
//             <Box
//                 sx={{
//                     maxWidth: '70vw',  // Responsive width
//                     maxHeight: '85vh',  // Responsive height
//                     overflowY: 'auto',  // Vertical scroll for overflow content
//                     margin: 'auto',
//                     mt: 4,
//                     bgcolor: 'background.paper',
//                     borderRadius: 2,
//                     boxShadow: 24,
//                     p: 3,
//                     position: 'relative',  // For close icon positioning
//                 }}
//             >
//                 {/* Close Button */}
//                 <IconButton
//                     onClick={onClose}
//                     sx={{
//                         position: 'absolute',
//                         top: 8,
//                         right: 8,
//                     }}
//                 >
//                     <Close />
//                 </IconButton>

//                 {/* Header Section */}
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         backgroundColor: category.bgColor,
//                         p: 2,
//                         borderRadius: 2,
//                     }}
//                 >
//                     <img
//                         src={category.category_image}
//                         alt={category.name}
//                         style={{ width: 80, height: 80, borderRadius: '50%', marginRight: '16px' }}
//                     />
//                     <Box>
//                         <Typography variant="h5">{category.name}</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Created on: {new Date(category.createdAt).toLocaleDateString()}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Products: {category.totalProducts} | Brands: {category.totalBrands}
//                         </Typography>
//                     </Box>
//                 </Box>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Countries by Continent Section */}
//                 <Typography variant="h6" sx={{ mb: 2 }}>Countries by Continent</Typography>
//                 <Grid container spacing={1}>
//                     {Object.entries(countries).map(([continent, countryList]) => (
//                         <Grid item xs={12} key={continent}>
//                             <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'background.default' }}>
//                                 <Typography variant="subtitle1" fontWeight="bold">
//                                     {continent}
//                                 </Typography>
//                                 {countryList.length > 0 ? (
//                                     <Stack direction="row" spacing={1} rowGap={1} flexWrap="wrap" sx={{ mt: 1 }}>
//                                         {countryList.map((country) => (
//                                             <Typography
//                                                 key={country}
//                                                 variant="body2"
//                                                 sx={{
//                                                     padding: '2px 6px',
//                                                     fontSize: '0.75rem',
//                                                     backgroundColor: 'grey.200',
//                                                     borderRadius: 1,
//                                                     margin: '2px 2px',
//                                                 }}
//                                             >
//                                                 {country}
//                                             </Typography>
//                                         ))}
//                                     </Stack>
//                                 ) : (
//                                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                                         No countries found
//                                     </Typography>
//                                 )}
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Brands Section */}
//                 <Typography variant="h6" sx={{ mb: 2 }}>Brands</Typography>
//                 <Grid container spacing={2}>
//                     {brands.map((brand) => (
//                         <Grid item xs={12} sm={6} md={4} key={brand.id}>
//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     p: 1,
//                                     borderRadius: 1,
//                                     bgcolor: 'background.default',
//                                 }}
//                             >
//                                 <img src={brand.logo} alt={brand.name} style={{ width: 40, height: 40, marginRight: 8 }} />
//                                 <Typography variant="body1">{brand.name}</Typography>
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Products Section */}
//                 <Typography variant="h6" sx={{ mb: 2 }}>Products</Typography>
//                 <Grid container spacing={2}>
//                     {products.map((product) => (
//                         <Grid item xs={12} sm={6} md={4} key={product.id}>
//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     p: 1,
//                                     borderRadius: 1,
//                                     bgcolor: 'background.default',
//                                 }}
//                             >
//                                 <img src={product.logo} alt={product.name} style={{ width: 100, height: 100, marginRight: 8 }} />
//                                 <Typography variant="body1">{product.name}</Typography>
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>
//         </Modal>
//     );
// }

// CategoryDetailModal.propTypes = {
//     open: PropTypes.bool,
//     category: PropTypes.object,
//     onClose: PropTypes.func.isRequired,
// };

// export default CategoryDetailModal;


import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Divider, Grid, IconButton, Stack, Card, CardMedia, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { Close } from '@mui/icons-material';
import axios from 'axios';

function CategoryDetailModal({ open, onClose, category }) {
    if (!category) return null;

    const countries = category.countries;
    const [brands, setBrands] = useState([]);

   const fetchBrandsAndProducts = async () => {
        try {
          const response = await axios.get(`https://boy.ranaafaqali.com/api/brands/getBrandsByCategory?category=Food %26 Beverages`); // Replace with your actual API endpoint
          return response.data.brands; // Adjust according to the structure of your API response
        } catch (error) {
          console.error("Error fetching brands and products:", error);
          return [];
        }
      };
      useEffect(() => {
        if (category?.name) {
          fetchBrandsAndProducts().then(data => {
            console.log("Fetched Brands:", data);  // Debug log
            setBrands(data);
          });
        }
      }, [category]);
   
    

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="category-detail-modal">
            <Box
                sx={{
                    maxWidth: '70vw',  // Responsive width
                    maxHeight: '85vh',  // Responsive height
                    overflowY: 'auto',  // Vertical scroll for overflow content
                    margin: 'auto',
                    mt: 4,
                    bgcolor: 'background.paper',
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

                {/* Header Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#368EF5',
                        p: 2,
                        mt:3,
                        borderRadius: 2,
                    }}
                >
                    <img
                        src={category?.category_image}
                        alt={category.name}
                        style={{ width: 80, height: 80, borderRadius: '50%', marginRight: '16px', resize: 'contain', border: '1px solid white', background: category?.bgColor, padding:2 }}
                    />
                    <Box>
                        <Typography variant="h5" style={{color:'white'}}>{category.name}</Typography>
                        <Typography variant="body2" style={{color:'white'}}>
                            Created on: {new Date(category.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" style={{color:'white'}}>
                            Products: {category?.productCount} | Brands: {category?.brandCount}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

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
                                    <Stack direction="row" spacing={1} rowGap={1} flexWrap="wrap" sx={{ mt: 1 }}>
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

                <Divider sx={{ my: 2 }} />

                {/* Brands and Products Section */}
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontSize: 23, color: 'black', fontWeight:'bold' }}>Brands and Products</Typography>
                <Grid container spacing={2}>
                    {brands.map((brand) => (
                        <Grid item xs={12} key={brand.id}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 1,
                                    borderRadius: 1,
                                    background: brand?.bgColor,
                                    mb: 2,
                                }}
                            >
                                <img src={brand.brand_image} alt={brand.name} style={{ width: 40, height: 40, marginRight: 8 }} />
                                <Typography variant="h6" style={{color: 'white'}}>{brand.name}</Typography>
                            </Box>
                            <Grid container spacing={2} sx={{ ml: 4 }}>
                                {brand.products.map((product) => (
                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                        <Card sx={{ maxWidth: 150 }}>
                                        <CardMedia
    component="img"
    height="100"
    image={product.logo}
    alt={product.product_name}
    sx={{ objectFit: 'contain' }}
/>
                                            <CardContent>
                                                <Typography variant="body1" align="center">
                                                    {product.product_name}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* <CategoryDetailModal 
        open={isDetailModalOpen} 
        onClose={handleCloseDetailModal} 
        category={selectedCategory} 
      /> */}
        </Modal>
    );
}

CategoryDetailModal.propTypes = {
    open: PropTypes.bool,
    category: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default CategoryDetailModal;