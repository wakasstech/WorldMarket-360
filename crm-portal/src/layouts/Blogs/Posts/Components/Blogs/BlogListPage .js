// import React, { useState, useEffect } from 'react';
// import { Alert, Box, Button, Container, Divider, Grid, Icon, Menu, MenuItem, Pagination, Select, Typography } from '@mui/material';
// import Sidebar from './components/Sidebar';
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
// import ArgonBox from 'components/ArgonBox';
// import ArgonButton from 'components/ArgonButton';
// import axios from '../../../../../axios/axios';
// import BlogCard from './components/BlogCard';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { fetchBrands } from 'globalStore/Slices/categoriesSlice';

// const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

// const BlogListPage = () => {
//   const dispatch = useDispatch();
//   const { brands } = useSelector((state) => state.categories);
//   const [countries, setCountries] = useState([]);
//   const [selectedBrand, setSelectedBrand] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [alertMessage, setAlertMessage] = useState('');

//   console.log(selectedBrand, 'selectedBrand')
//   const [brandAnchorEl, setBrandAnchorEl] = useState(null);
//   const [countryAnchorEl, setCountryAnchorEl] = useState(null);

//   const [blogs, setBlogs] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);


//   useEffect(() => {
//     dispatch(fetchBrands());
//   }, [dispatch]);

//   useEffect(() => {
//     axios.get('/area/getAll-country', {
//       headers: {
//         'ngrok-skip-browser-warning': '69420'
//       }
//   })
//       .then(response => {
//         const data = response.data;
//         console.log(data, 'countries')
//         setCountries(data);
//       })
//       .catch(error => {
//         console.error('Error fetching blogs:', error);
//       });
//   }, []);
//   // useEffect(() => {
//   //   axios.get(`https://boy.ranaafaqali.com/api/blog/getAllBlog`)
//   //     .then(response => {
//   //       setBlogs(response.data.result);
//   //       setTotalPages(response.data.totalPages);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching blogs:', error);
//   //     });
//   // }, [page]);
//   useEffect(() => {
//     const fetchBlogs = () => {
//       // const url = selectedBrand 
//       //   ? `https://boy.ranaafaqali.com/api/blog/getblogByBrand?brand=${selectedBrand}`
//       //   : `https://boy.ranaafaqali.com/api/blog/getAllBlog`;

//       const url =  selectedBrand
//     ? `/blog/getblogByBrand?brand=${selectedBrand}`
//     : selectedCountry
//     ? `/blog/getblogByCountry?country=${selectedCountry}`
//     : `/blog/getAllBlog`;

//     axios.get(url)
//     .then(response => {
//       if (response.data.result && response.data.result.length > 0) {
//         setBlogs(response.data.result);
//         setTotalPages(response.data.totalPages);
//         setAlertMessage(''); // Clear any previous alert message
//       } else {
//         setBlogs([]); // Clear blogs if no result is found
//         setAlertMessage('No blogs found.');
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching blogs:', error);
//       if (error.response && error.response.status === 404) {
//         setAlertMessage('No blogs found.');
//       } else {
//         setAlertMessage('An error occurred while fetching blogs.');
//       }
//     });
// };


//     fetchBlogs();
//   }, [selectedBrand,selectedCountry, page]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//     // Fetch new page data here if using real API
//   };
//   const handleBrandClick = (event) => {
//     setBrandAnchorEl(event.currentTarget);
//   };
//   const handleCountryClick = (event) => {
//     setCountryAnchorEl(event.currentTarget);
//   };

//   const handleBrandChange = (event) => {
//     setBlogs([]);
//     setSelectedCountry('');
//     const brand = event.target.getAttribute('value');
//     setSelectedBrand(brand);
 
//     setBrandAnchorEl(null);
//     setPage(1); // Reset to the first page when changing the brand
//   };

//   const handleCountryChange = (event) => {
//     setBlogs([]);
//     setSelectedBrand('');
 
   
//     const country = event.target.getAttribute('value');
//     setSelectedCountry(country);
    
//     setCountryAnchorEl(null);
//     setPage(1); // Reset to the first page when changing the brand
//   };

//   const handleClearFilters = () => {
//     setSelectedBrand('');
//     setSelectedCountry('');
//     setPage(1); // Reset to the first page when clearing the filter
//   };

//   return (
//     // <DashboardLayout>
  
//     // <ArgonBox sx={{}} py={3} mt={34}>
     
//     //   <ArgonBox mb={3}>
       
//     //   </ArgonBox>
//     //   <ArgonBox mb={3}>
//     //    <Container>
//     //    <Grid container spacing={3}>
//     //      <Grid item xs={12} md={8}>
//     //        <Grid container spacing={3}>
//     //          {blogs.map(blog => (
//     //           <Grid item xs={12} sm={6} key={blog.id}>
//     //             <BlogCard blog={blog} />
//     //           </Grid>
//     //         ))}
//     //       </Grid>
//     //       <Pagination sx={{marginTop: 5}} count={totalPages} page={page} onChange={handlePageChange} />
//     //     </Grid>
//     //     {/* <Divider orientation="vertical" flexItem sx={{ mx: 2 }} /> */}

//     //     <Grid item xs={12} md={4}>
//     //       <Sidebar />
//     //     </Grid>
//     //   </Grid>
//     // </Container>
//     //   </ArgonBox>

//     //   </ArgonBox>

//     //   </DashboardLayout>

//     <DashboardLayout  sx={{
//       backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
//         `${linearGradient(
//           rgba(gradients.info.main, 0.6),
//           rgba(gradients.info.state, 0.6)
//         )}, url(${bgImage})`,
//       backgroundPositionY: "50%",
//     }}>
//         <ArgonBox sx={{ backgroundColor: 'white' }}  mt={20}>
          
//         <Container>
          
//         <center><h1 style={{fontWeight: 'bold', color: '#ffff'}}>Blogs</h1></center> 
//         </Container>
//         </ArgonBox>
//       <ArgonBox sx={{ backgroundColor: 'white' }} py={3} mt={9}>
//       <Container>

    
//           <ArgonBox
//             display="flex"
//             sx={{
//               flexDirection: {
//                 xs: "column",
//                 md: "row",
//                 lg: "row",
//               },
//             }}
//             alignItems="flex-start"
//           >
//             <ArgonButton
//               variant="gradient"
//               color="info"
//               size="small"
//               onClick={handleBrandClick}
//               sx={{
//                 marginRight: {
//                   xs: "0px",
//                   md: "2px",
//                   lg: "2px",
//                 },
//               }}
//             >
//               {selectedBrand || 'Select Brand'} ▼
//             </ArgonButton>
//             <Menu
//               anchorEl={brandAnchorEl}
//               open={Boolean(brandAnchorEl)}
//               onClose={() => setBrandAnchorEl(null)}
//             >
//               <MenuItem onClick={handleBrandChange} value="">
//                 All Brands
//               </MenuItem>
//               {brands.map((brand) => (
//                 <MenuItem
//                   key={brand.id}
//                   onClick={handleBrandChange}
//                   value={brand.name}
//                 >
//                   {brand.name}
//                 </MenuItem>
//               ))}
//             </Menu>


//             <ArgonButton
//               variant="gradient"
//               color="info"
//               size="small"
//               onClick={handleCountryClick}
//               sx={{
//                 marginRight: {
//                   xs: "0px",
//                   md: "2px",
//                   lg: "2px",
//                 },
//               }}
//             >
//               {selectedCountry || 'Select Country'} ▼
//             </ArgonButton>
//             <Menu
//               anchorEl={countryAnchorEl}
//               open={Boolean(countryAnchorEl)}
//               onClose={() => setCountryAnchorEl(null)}
//             >
//               <MenuItem onClick={handleCountryChange} value="">
//                 All Countries
//               </MenuItem>
//               {countries.map((country) => (
//                 <MenuItem
//                   key={country.country_code}
//                   onClick={handleCountryChange}
//                   value={country.country_name}
//                 >
//                   {country.country_name}
//                 </MenuItem>
//               ))}
//             </Menu>



//             <ArgonButton
//               sx={{
//                 marginLeft: {
//                   xs: "0px",
//                   md: "8px",
//                   lg: "8px",
//                 },
//               }}
//               variant="outlined"
//               color="error"
//               size="small"
//               onClick={handleClearFilters}
//             >
//               Clear Filters
//             </ArgonButton>
//           </ArgonBox>
//           {alertMessage && (
// <Box mt={2} pb={10}>

//             <Alert severity="warning">{alertMessage}</Alert>
          
// </Box>
// )}
//           <Box sx={{ display: 'flex', marginTop: 4 }}>
//             <Grid container spacing={3} sx={{ flex: 1 }}>
//               <Grid item xs={12}>
//                 <Grid container spacing={3}>
//                   {blogs.length > 0 && blogs.map(blog => (
//                     <Grid item xs={12} sm={6} lg={4} key={blog.id}>
//                       <BlogCard blog={blog} />
//                     </Grid>
//                   ))}
//                 </Grid>
//                 <Pagination sx={{ marginTop: 5, display: 'flex', justifyContent: 'flex-end' }} count={totalPages} page={page} onChange={handlePageChange} />
//               </Grid>
//             </Grid>
          
//           </Box>
//         </Container>
//       </ArgonBox>
//     </DashboardLayout>
//   );
// };

// export default BlogListPage;


import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Container, Divider, Grid, Icon, Menu, MenuItem, Pagination, Select, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import ArgonBox from 'components/ArgonBox';
import ArgonButton from 'components/ArgonButton';
import axios from '../../../../../axios/axios';
import BlogCard from './components/BlogCard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchBrands } from 'globalStore/Slices/categoriesSlice';

const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

const BlogListPage = () => {


  return (
   

    <DashboardLayout  sx={{
      backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
        `${linearGradient(
          rgba(gradients.info.main, 0.6),
          rgba(gradients.info.state, 0.6)
        )}, url(${bgImage})`,
      backgroundPositionY: "50%",
    }}>
        <ArgonBox sx={{ backgroundColor: 'white' }}  mt={20}>
          
        <Container>
          
        <center><h1 style={{fontWeight: 'bold', color: '#ffff'}}>Blogs</h1></center> 
        </Container>
        </ArgonBox>
      <ArgonBox sx={{ backgroundColor: 'white' }} py={3} mt={9}>
      <Container>

    
         <ArgonBox>
         <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em' }}>Under Maintenance</h1>
          <p style={{ fontSize: '1.2em' }}>We are currently working on the page. Please check back later.</p>
        </div>
         </ArgonBox>
        </Container>
      </ArgonBox>
    </DashboardLayout>
  );
};

export default BlogListPage;
