// import { useEffect, useState } from "react";
// import { Grid, Card, CardContent, Typography, CardActions, Box, CircularProgress } from "@mui/material";
// import ArgonBox from "components/ArgonBox";
// import ArgonButton from "components/ArgonButton";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Footer from "examples/Footer";
// import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
// import usePost from "hooks/usePost";
// import  {useNavigate} from 'react-router-dom'
// import Header from "./components/Header";
// import { createCategory } from "globalStore/Slices/categoriesSlice";
// import { useDispatch } from "react-redux";
// import ArgonTypography from "components/ArgonTypography";
// import Featured from "./components/MultiSelectionFeatured/MultiSelectionFeatured";
// import { CalendarToday, Delete, East, Height, TravelExplore, TravelExploreOutlined } from "@mui/icons-material";
// import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
// import axios from "../../../axios/axios"
// import { ShoppingCart, Store, Category } from '@mui/icons-material'; // Import MUI icons
// import Swal from "sweetalert2";



// const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";





// function HomeFeatures() {

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     category_name: "",

  


//   });

//   const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
//   const [featuredItems, setFeaturedItems] = useState([]); // State for holding featured items
//   const [loading, setLoading] = useState(true); // State for loading indicator

//   const [isDeleted, setIsDeleted] = useState(false); // State for loading indicator

 

 
//   useEffect(() => {
//     const fetchFeaturedItems = async () => {
//       setLoading(true); // Set loading to true before fetching data
//       try {
//         const response = await axios.get('/featured/getAll'); // Replace with your actual API endpoint
//         setFeaturedItems(response.data); // Set the response data to state
       
//       } catch (err) {
//         console.error('Error fetching featured items:', err);
        
//       } finally {
//         setLoading(false); // Reset loading state after API call
//       }
//     };

//     fetchFeaturedItems(); // Call the function to fetch data
//   }, [isDeleted]); // Empty dependency array to run once on mount

  
 

//   const handleViewAllClick = () => {
//     // Navigate to the /boycott/feature/:id route
    
//   };
//   const fetchFeaturedItems = async () => {
//     setLoading(true); // Set loading to true before fetching data
//     try {
//       const response = await axios.get('/featured/getAll'); // Replace with your actual API endpoint
//       setFeaturedItems(response.data); // Set the response data to state
     
//     } catch (err) {
//       console.error('Error fetching featured items:', err);
      
//     } finally {
//       setLoading(false); // Reset loading state after API call
//     }
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setLoading(true); // Show loading during the deletion process
//         axios.delete(`/featured/deletefeature?id=${id}`)
//           .then(response => {
//             Swal.fire(
//               'Deleted!',
//               'Your feature has been deleted.',
//               'success'
//             )
//             setIsDeleted(true)
//           })
//           .catch(error => {
//             Swal.fire(
//               'Error!',
//               'There was a problem deleting your feature.',
//               'error'
//             );
//             console.error('There was an error deleting the feature:', error);
//           })
//           .finally(() => {
//             setLoading(false); // Reset loading state after deletion attempt
//           });
//       }
//     });
//   };

 
//   return (
//     <DashboardLayout
//     sx={{
//       backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
//         `${linearGradient(
//           rgba(gradients.info.main, 0.6),
//           rgba(gradients.info.state, 0.6)
//         )}, url(${bgImage})`,
//       backgroundPositionY: "50%",
//     }}
//   >
//       <Header showFeature={true}/>
//       <ArgonBox mt={3} mb={20}       sx={{ height: '100vh' }} // Set height to full viewport height
//       >
//         <Grid container >
//           <Grid item xs={12} lg={12}>
//           {loading ? (
//         <LoadingSpinner size={48} /> // Show spinner while loading
//       ) : (
//         <ArgonBox mt={3} mb={20} sx={{ height: '100vh' }}>
//         <Grid container spacing={2}>
//           {featuredItems.map((item) => {
//             // Parse products, brands, and categories fields (which are stored as JSON strings)
//             const products = JSON.parse(item.products || '[]');
//             const brands = JSON.parse(item.brands || '[]');
//             const categories = JSON.parse(item.categories || '[]');
//             const countries = JSON.parse(item.countries || '[]');
//             return (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
//                 <Card
//                   sx={{
//                     border:'1px solid #d9d9d9',
//                     color: '#fff',
//                     boxShadow:5
//                   }}
//                 >
//                   <CardContent sx={{background: 'linear-gradient(135deg, #3a5895 0%, #909399 100%)',}}>
                   
//                   <Box display="flex" alignItems="center" justifyContent={"space-between"}>

//                     <Typography style={{color: 'white', fontWeight: 'bold'}} variant="h5" component="div">
//                       {item.feature_title}
//                     </Typography>
                   
//                     <Delete onClick ={() => handleDelete( item?.id)} sx={{ fontSize: 15, marginRight: '4px', color:'#fff' }} />

                  
//                      </Box>

//                     <Box display="flex" alignItems="center" sx={{ marginRight: '16px', marginTop:1}}>
                       
//                        <div style={{ fontSize: 14, marginRight: '4px',}}>
//                        <CalendarToday    style={{color:'#fff' }} />
//                         </div> 
//                         <Typography style={{fontSize: 14}} color="inherit">
//                     {new Date(item.createdAt).toLocaleDateString('en-US', { 
//   month: 'long', 
//   day: 'numeric', 
//   year: 'numeric' 
// })}
//                     </Typography>
//                       </Box>

//                       <Box display="flex" alignItems="center" gap={3}  sx={{ marginRight: '16px', marginTop:1}}>
                       
                       
//                         <Typography  onClick={()=>navigate(`/boycott/feature/${item?.id}`)} style={{fontSize: 13, fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer'}} color="inherit">
//                     View 
//                     </Typography>


//                       </Box>


                   
//                   </CardContent>
  
//                   {/* Updated Card Footer */}
//                   <CardActions sx={{ padding: '16px',  }}>
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         justifyContent: 'space-around',
//                         width: '100%',
//                         flexWrap: 'wrap',
//                         rowGap: '8px', // Adds space between rows if needed
//                       }}
//                     >
//                         <Box display="flex" alignItems="center" sx={{ marginRight: '16px' }}>
//                         <Category sx={{ fontSize: 18, marginRight: '4px', color:'#7c7893' }} />
//                         <Typography style={{fontSize: 13, color: '#344767', fontWeight: 600}} >
//                          <span style={{fontSize: 22}}> {categories.length}</span> Categories
//                         </Typography>
//                       </Box>
//                       <Box display="flex" alignItems="center" sx={{ marginRight: '16px' }}>
//                         <TravelExploreOutlined sx={{ fontSize: 18, marginRight: '4px', color:'#7c7893' }} />
//                         <Typography style={{fontSize: 13, color: '#344767', fontWeight: 600}} >
//                          <span style={{fontSize: 22}}> {countries.length}</span> Countries
//                         </Typography>
//                       </Box>

//                       <Box display="flex" alignItems="center" sx={{ marginRight: '16px' }}>
//                         <Store sx={{ fontSize: 18, marginRight: '4px',  color:'#7c7893' }} />
//                         <Typography style={{fontSize: 13, color: '#344767', fontWeight: 600}} >
//                         <span style={{fontSize: 22}}>  {brands.length} </span> Brands
//                         </Typography>
//                       </Box>
//                       {/* First Row */}
//                       <Box display="flex" alignItems="center" sx={{ marginRight: '16px' }}>
//                         <ShoppingCart sx={{ fontSize: 18, marginRight: '4px',  color:'#7c7893' }} />
//                         <Typography style={{fontSize: 13, color: '#344767', fontWeight: 600}} >
//                         <span style={{fontSize: 22}}> {products.length}</span>  Products
//                         </Typography>
//                       </Box>
  
                     
  
//                       {/* Second Row */}
                      
//                     </Box>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </ArgonBox>
//       )}
//           </Grid>
//         </Grid>
//       </ArgonBox>
//       {/* <Footer /> */}
//       <ArgonSnackbar
//         color={alert.severity}
        
//         title="Message"
//         content={alert.message}
//         open={alert.open}
//         close={() => setAlert({ ...alert, open: false })}
//       />
//     </DashboardLayout>
//   );
// }

// export default HomeFeatures;



import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, CardActions, Box, CircularProgress } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
import usePost from "hooks/usePost";
import  {useNavigate} from 'react-router-dom'
import Header from "./components/Header";
import { createCategory } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import ArgonTypography from "components/ArgonTypography";
import Featured from "./components/MultiSelectionFeatured/MultiSelectionFeatured";
import { CalendarToday, Delete, East, Height, TravelExplore, TravelExploreOutlined } from "@mui/icons-material";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import axios from "../../../axios/axios"
import { ShoppingCart, Store, Category } from '@mui/icons-material'; // Import MUI icons
import Swal from "sweetalert2";



const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";





function HomeFeatures() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category_name: "",

  


  });

  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [featuredItems, setFeaturedItems] = useState([]); // State for holding featured items
  const [loading, setLoading] = useState(true); // State for loading indicator

  const [isDeleted, setIsDeleted] = useState(false); // State for loading indicator

 

 
  useEffect(() => {
    const fetchFeaturedItems = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get('/featured/getAll'); // Replace with your actual API endpoint
        setFeaturedItems(response.data); // Set the response data to state
       
      } catch (err) {
        console.error('Error fetching featured items:', err);
        
      } finally {
        setLoading(false); // Reset loading state after API call
      }
    };

    fetchFeaturedItems(); // Call the function to fetch data
  }, [isDeleted]); // Empty dependency array to run once on mount

  
 

  const handleViewAllClick = () => {
    // Navigate to the /boycott/feature/:id route
    
  };
  const fetchFeaturedItems = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get('/featured/getAll'); // Replace with your actual API endpoint
      setFeaturedItems(response.data); // Set the response data to state
     
    } catch (err) {
      console.error('Error fetching featured items:', err);
      
    } finally {
      setLoading(false); // Reset loading state after API call
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true); // Show loading during the deletion process
        axios.delete(`/featured/deletefeature?id=${id}`)
          .then(response => {
            Swal.fire(
              'Deleted!',
              'Your feature has been deleted.',
              'success'
            )
            setIsDeleted(true)
          })
          .catch(error => {
            Swal.fire(
              'Error!',
              'There was a problem deleting your feature.',
              'error'
            );
            console.error('There was an error deleting the feature:', error);
          })
          .finally(() => {
            setLoading(false); // Reset loading state after deletion attempt
          });
      }
    });
  };
  const continents = [
    { title: "Africa" },
    { title: "Antarctica" },
    { title: "Asia" },
    { title: "Europe" },
    { title: "North America" },
    { title: "Australia" },
    { title: "South America" }
  ];
 
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
      <Header showFeature={true}/>
      <ArgonBox mt={3} mb={20}       sx={{ height: '100vh' }} // Set height to full viewport height
      >
        <Grid container >
          <Grid item xs={12} lg={12}>
          
        <ArgonBox mt={3} mb={20} sx={{ height: '100vh' }}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} >
                <Card
                  sx={{
                    border:'1px solid #d9d9d9',
                    color: '#fff',
                    boxShadow:5
                  }}
                >
                  <CardContent sx={{background: 'linear-gradient(135deg, #3a5895 0%, #909399 100%)',}}>
                   
                  <Box display="flex" alignItems="center" justifyContent={"space-between"}>

                    <Typography style={{color: 'white', fontWeight: 'bold'}} variant="h5" component="div">
                     Home Features
                    </Typography>
                   
                    {/* <Delete onClick ={() => handleDelete( item?.id)} sx={{ fontSize: 15, marginRight: '4px', color:'#fff' }} /> */}

                  
                     </Box>

                    {/* <Box display="flex" alignItems="center" sx={{ marginRight: '16px', marginTop:1}}>
                       
                       <div style={{ fontSize: 14, marginRight: '4px',}}>
                       <CalendarToday    style={{color:'#fff' }} />
                        </div> 
                        <Typography style={{fontSize: 14}} color="inherit">
                    {new Date(item.createdAt).toLocaleDateString('en-US', { 
  month: 'long', 
  day: 'numeric', 
  year: 'numeric' 
})}
                    </Typography>
                      </Box> */}

                      <Box display="flex" alignItems="center" gap={3}  sx={{ marginRight: '16px', marginTop:1}}>
                       
                       
                        <Typography  onClick={()=>navigate(`/boycott/all-features`)} style={{fontSize: 13, fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer'}} color="inherit">
                    View 
                    </Typography>


                      </Box>


                   
                  </CardContent>
  
                  {/* Updated Card Footer */}
                
                </Card>
              </Grid>
        </Grid>
      </ArgonBox>
     
          </Grid>
        </Grid>
      </ArgonBox>
      {/* <Footer /> */}
      <ArgonSnackbar
        color={alert.severity}
        
        title="Message"
        content={alert.message}
        open={alert.open}
        close={() => setAlert({ ...alert, open: false })}
      />
    </DashboardLayout>
  );
}

export default HomeFeatures;
