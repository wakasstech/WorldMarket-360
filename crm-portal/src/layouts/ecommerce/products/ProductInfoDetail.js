import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, CircularProgress, CardMedia, Divider } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import axios from "../../../axios/axios";
import { CalendarToday } from "@mui/icons-material";

const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

const ProductInfoDetail = () => {
  const { id } = useParams(); // Retrieve product ID from URL
  const [product, setProduct] = useState(null); // Product state


  const [loading, setLoading] = useState(true); // Loading state

   useEffect(() => {
    axios
      .get(`/products/getProductsById?id=${id}`) // Using id from URL params
      .then((response) => {
        console.log(response.data.result, "Product response before parsing");

        // Parsing 'countries' if it's a string
        let countriesParsed = {};
        if (response.data.result.countries) {
          try {
            countriesParsed = JSON.parse(
              response.data.result.countries // Replacing single quotes with double quotes
            );
          } catch (parseError) {
            console.error("Error parsing countries:", parseError);
          }
        }

        const productData = {
          ...response.data.result,
          countries: countriesParsed,
        };

        console.log(productData, "Product data after setting state");

        setProduct(productData); // Set product data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching product info:", error);
        setLoading(false); // Even on error, stop the loader
      });
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <ArgonBox my={3} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress /> {/* Show loader while loading */}
        </ArgonBox>
      </DashboardLayout>
    );
  };

  console.log(product.countries, 'countriesss')

  const countries = {
    Africa: ['Algeria', 'Egypt'],
    Asia: ['Bahrain', 'Israel'],
    Europe: ['Germany', 'France'],
  };

  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <DashboardNavbar />
      <ArgonBox my={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <Box p={4}>
             


               <Box display={"flex"} flexDirection={"row"} gap={6}>  
                <Box sx={{ flexShrink: 0 }}> {/* Prevent image from shrinking */}
                <CardMedia
    component="img"
    style={{
        maxWidth: '100%',
        maxHeight: '200px', // Limit height
        objectFit: 'contain', // Maintain aspect ratio
        display: 'block',
        margin: '0 auto', // Center the image
        padding: '16px' // Adjust padding as needed
    }}
    image={product?.logo} // Replace with an appropriate image URL
    alt="Boycott Product"
/>
                </Box>
             

<Box>
<Typography variant="h5" gutterBottom>
                      {product.product_name}
                    </Typography>


                    <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>           
                    <Box
                      sx={{
                        bgcolor: '#d96e72',
                        color: '#ffff',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {product.brand_name.toUpperCase()}
                    </Box>
                </Box>


                <Box display="flex" alignItems="center" mt={1} mb={4}>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: 15 }}>
                    <span style={{ fontWeight: 'bold', color: '#B73439' }}>Category:</span> {" "}
                    {product?.category_name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                    <CalendarToday fontSize="small" sx={{ mr: 0.5, color: '#9f9797' }} />
                    {new Date(product?.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                    <Typography variant="body1" paragraph sx={{fontSize:17}}>
                      {/* {product.description} */}
                      Our application empowers consumers to make informed choices about their purchases. With a focus on products associated with Israel, we provide a platform to identify and boycott brands that do not align with your values.

Explore our extensive database to discover which products to avoid, learn about the social and political implications of your purchases, and connect with like-minded individuals.

Join us in promoting ethical consumption and making a positive impact in the world.


                    </Typography>
</Box>
                 </Box>

              
                
                
                <CardContent sx={{marginTop: 3}}>
                  

                    {product.countries && (
                      <Box>
                      <Typography sx={{fontSize: 22, fontWeight: 'bold', color: '#8f8989'}}>Nations on the corresponding continents</Typography>
                      {Object.keys(product.countries).map((region) => (
                        <Box key={region} mt={2}>
                          <Typography sx={{fontWeight: 'bold', fontSize: 17, fontStyle:'italic', color: '#afa2a2'}}>{region}</Typography>

                          {product.countries[region].length > 0 ? 
                          (
                            <Typography sx={{ fontSize: 17}}>{product.countries[region].map(country => `${country}`).join(', ')}</Typography>

                          ) :
                          (
                            <Typography sx={{fontStyle: 'italic' ,fontSize: 17,}}>There are no countries on this continent....</Typography>

                          )}
                          <Divider  sx={{
    opacity: 1,  // Set the desired opacity (0.0 to 1.0)
   
  }}/>
                        </Box>
                      ))}
                    </Box>
                    )}

                 
                  </CardContent> 
              
             
            </Box>
          </ArgonBox>
        </Card>
      </ArgonBox>
    </DashboardLayout>
  );
};

export default ProductInfoDetail;
