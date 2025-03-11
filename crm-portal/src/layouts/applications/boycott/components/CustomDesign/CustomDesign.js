import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

import './CustomDesign.css';

const CustomDesign = () => {
//   const dispatch = useDispatch();
//   const { brands, categories } = useSelector(state => state.categories);
//   const categoriesWithBrands = categories.map(category => ({
//     ...category,
//     brands: brands.filter(brand => brand.category_id === category.id),
//   }));

//   useEffect(() => {
   
//     dispatch(fetchCategories());
//     dispatch(fetchBrands());
//   }, [dispatch]);

  const categoriesWithBrandss = [
    {
      id: 1,
      name: "Snacks",
      category_description: "Popular snack items",
      category_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg",
      brands: [
        { id: 1, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 2, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 3, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 4, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 5, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 6, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 7, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 8, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
      ]
    },
    {
      id: 2,
      name: "Beverages",
      category_description: "Popular beverage items",
      category_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg",
      brands: [
        { id: 9, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 10, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 11, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay's_logo_2019.svg" },
        { id: 12, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 13, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 14, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 15, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        { id: 16, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
      ]
    },
    {
        id: 2,
        name: "Clasic Snacks",
        category_description: "Popular beverage items",
        category_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg",
        brands: [
          { id: 9, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
          { id: 10, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
          { id: 11, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay's_logo_2019.svg" },
          { id: 12, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
          { id: 13, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
          { id: 14, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
          { id: 15, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
          { id: 16, name: "Lay's", brand_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg" },
        ]
      }
  ];
  
  
  return (
    <Grid container spacing={2}>
    {categoriesWithBrandss.map(category => (
      <Grid item xs={12} key={category.id}>
        <Box mb={2}>
          <Typography variant="h6">{category.name}</Typography>
          <Box
            display="flex"
            overflow="auto"
            width="100%"
            whiteSpace="nowrap"
            py={1}
            sx={{
              '&::-webkit-scrollbar': { height: '8px' },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#a4e9e3',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#e9e9e9',
                borderRadius: '10px',
              },
              boxShadow: 5
            }}
          >
            {category.brands.map(brand => (
              <Box key={brand.id} mr={2} minWidth={100}>
                <Card>
                  <CardMedia
                    component="img"
                    height="50"
                    image={brand.brand_image}
                    alt={brand.name}
                  />
                  <CardContent>
                    <Typography variant="body2" >
                      {brand.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
  );
};

export default CustomDesign;
