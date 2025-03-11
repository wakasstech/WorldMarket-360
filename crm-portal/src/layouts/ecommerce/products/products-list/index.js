// import { useState, useEffect, useMemo, useRef, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Menu, MenuItem, Button, Checkbox, IconButton, Box, Typography } from "@mui/material";
// import UploadIcon from "@mui/icons-material/Upload";

// // Argon Dashboard 2 PRO MUI components
// import Card from "@mui/material/Card";
// import Stack from "@mui/material/Stack";

// // Argon Dashboard 2 PRO MUI example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// // import DataTable from "./components/DataTable";
// import DataTable from "examples/Tables/DataTable";


// import { fetchCategories } from "globalStore/Slices/categoriesSlice";
// import createDataTableData from "./data/dataTableData";
// import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";
// import ArgonButton from "components/ArgonButton";
// import { fetchProducts } from "globalStore/Slices/productSlice";
// import Swal from "sweetalert2";
// import { fetchBrands } from "globalStore/Slices/categoriesSlice";
// import { Padding } from "@mui/icons-material";
// import LoadingSpinner from "layouts/Categories/new-product/components/LoadingSpinner/LoadingSpinner";
// import { updateProduct } from "globalStore/Slices/productSlice";
// import ArgonProgress from "components/ArgonProgress";
// import axios from "../../../../axios/axios";




// function CategoriesList() {
//   const dispatch = useDispatch();
//   const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";
// // State for pagination
// const [limit, setLimit] = useState(10); // Entries per page
// const [currentPage, setCurrentPage] = useState(1); // Current page number
// // Get data from Redux state
// // const { products, loading, error, totalItems, totalPages } = useSelector((state) => ({
// //   products: state.products.products,
// //   loading: state.products.loading,
// //   error: state.products.error,
// //   totalItems: state.products.totalItems,  // Total number of items from Redux
// //   totalPages: state.products.totalPages,  // Total number of pages from Redux
// // })); 
// // const { products, loading, error, totalItems, totalPages  } = useSelector((state) => state.products);

// const [products, setProducts] = useState([]);
// const [loading , setLoading] = useState(false);
// const [totalItems, setTotalItems] = useState(0);
// const [totalPages, setTotalPages] = useState(0);

// console.log(products, 'productssss')
// const { brands, categories } = useSelector((state) => state.categories);
//   const [reloadCount, setReloadCount] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");


//   const [progress, setProgress] = useState(0); // State for progress
//   const [uploading, setUploading] = useState(false); // State for upload status
//   const fileInputRef = useRef(null); // Add ref for file input

//   const [search , setSearch] = useState('');

//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [status, setStatus] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [brandAnchorEl, setBrandAnchorEl] = useState(null);
//   const [selectedBrand, setSelectedBrand] = useState("All Brands");
//   const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState({ id: null, name: "All Categories" });
//   const [loadImage, setImageChangeLoading] = useState(false)
//  // Fetch products whenever currentPage, limit, or search term changes
// //  const fetchData = ({ page, limit, search = "" }) => {
// //   dispatch(fetchProducts({ limit, page, search }));
// // };
// const fetchData = useCallback(async (limit, page) => {
//   try {
//     // const response = await axios.get(`/products/getAllProducts?page=${page}&limit=${limit}`);
//     const response = await axios.get(`/products/getAllProducts`, {
//       headers: {
//         'ngrok-skip-browser-warning': '69420'
//       }
//     });

//     setProducts(response.data.result);
//     setTotalPages(response.data.totalPages);
//     setTotalItems(response.data.total);
//   } catch (error) {
//     console.log(error);
//   }
// }, []);

// useEffect(() => {
//   console.log('Current limit:', limit);  // Debug log
//   fetchData(limit, currentPage );
// }, [dispatch, limit, currentPage]);
//   useEffect(() => {
//     if ( !categories.length || !brands.length) {
//       // dispatch(fetchProducts());
    
//       dispatch(fetchCategories());
//       dispatch(fetchBrands());
//     }
//   }, [dispatch,   categories?.length, brands?.length]);

 

//   useEffect(() => {
//     if (reloadCount > 0) {
//       fetchData(limit, currentPage );
//       dispatch(fetchCategories());
//       dispatch(fetchBrands());
//     }
//   }, [dispatch, reloadCount]);

//     // Fetch products on page load and whenever pagination changes



//   const handleSelect = (id) => {
//     setSelectedProducts((prevSelected) => {
//       if (prevSelected.includes(id)) {
//         return prevSelected.filter((productId) => productId !== id);
//       }
//       return [...prevSelected, id];
//     });
//   };


//   // const handleDelete = () => {
//   //   Swal.fire({
//   //     title: "Are you sure?",
//   //     text: "You won't be able to revert this!",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#3085d6",
//   //     cancelButtonColor: "#d33",
//   //     confirmButtonText: "Yes, delete it!"
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       const requestBody = { ids: selectedProducts };
//   //       fetch('https://boy.ranaafaqali.com/api/products/deleteproducts', {
//   //         method: 'DELETE',
//   //         headers: { 'Content-Type': 'application/json' },
//   //         body: JSON.stringify(requestBody)
//   //       })
//   //         .then(response => response.json())
//   //         .then(data => {
//   //           Swal.fire({
//   //             title: "Deleted!",
//   //             text: data.message,
//   //             icon: "success"
//   //           });
//   //           setReloadCount(reloadCount + 1);
//   //           setSelectedProducts([]);
//   //         })
//   //         .catch(error => {
//   //           console.error('Error deleting products:', error);
//   //         });
//   //     }
//   //   });
//   // };
//   const handleDelete = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const requestBody = { ids: selectedProducts };
//         axios.delete('/products/deleteproducts', {
//           data: requestBody
//         })
//           .then(response => {
//             Swal.fire({
//               title: "Deleted!",
//               text: response.data.message,
//               icon: "success"
//             });
//             setReloadCount(reloadCount + 1);
//             setSelectedProducts([]);
//           })
//           .catch(error => {
//             console.error('Error deleting products:', error);
//           });
//       }
//     });
//   };
  

//   const handleStatusUpdate = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleBrandClick = (event) => {
//     setBrandAnchorEl(event.currentTarget);
//   };

//   const handleBrandChange = (event) => {
//     const brand = event.target.getAttribute('value');
//     setSelectedBrand(brand);
//     setBrandAnchorEl(null);
//   };

//   const handleCategoryClick = (event) => {
//     setCategoryAnchorEl(event.currentTarget);
//   };

//   const handleCategoryChange = (event) => {
//     const categoryId = event.target.getAttribute('value');
//   const categoryName = categories.find(cat => cat.id.toString() === categoryId)?.name || "All Categories";
//   setSelectedCategory({ id: categoryId, name: categoryName });
//   setCategoryAnchorEl(null);
//   };

//   const handleClearFilters = () => {
//     setSelectedBrand("All Brands");
 
//     setSelectedCategory({ id: null, name: "All Categories" });
//      setReloadCount(reloadCount + 1); // Increment to trigger re-fetch if necessary
//   };
  

//   // const handleStatusChange = (event) => {
//   //   const newStatus = event.target.getAttribute('value');
//   //   setStatus(newStatus);
//   //   if (selectedProducts.length === 0) return;

//   //   const requestBody = {
//   //     ids: selectedProducts,
//   //     status: newStatus
//   //   };

//   //   fetch('https://boy.ranaafaqali.com/api/products/updateStatuses', {
//   //     method: 'PUT',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify(requestBody)
//   //   })
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       setReloadCount(reloadCount + 1);
//   //       setAnchorEl(null);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error updating product statuses:', error);
//   //     });
//   // };


//   const handleStatusChange = (event) => {
//     const newStatus = event.target.getAttribute('value');
//     setStatus(newStatus);
//     if (selectedProducts.length === 0) return;
  
//     const requestBody = {
//       ids: selectedProducts,
//       status: newStatus
//     };
  
//     axios.put('https://boy.ranaafaqali.com/api/products/updateStatuses', requestBody)
//       .then(response => {
//         setReloadCount(reloadCount + 1);
//         setAnchorEl(null);
//       })
//       .catch(error => {
//         console.error('Error updating product statuses:', error);
//       });
//   };
  
//   const filteredProducts = useMemo(() => {
//     let filtered = products;

//     if (selectedBrand !== "All Brands") {
//       filtered = filtered.filter(product => product.brand_name === selectedBrand);
//     }

//     if (selectedCategory.name !== "All Categories") {
//       filtered = filtered.filter(product => product.category_id === selectedCategory.id);
//     }

//      // Apply search filter
//   if (searchTerm) {
//     filtered = filtered.filter(product =>
//       product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }

//     return filtered;
//   }, [products, selectedBrand, selectedCategory, searchTerm, categories]);
// // Update the search handler to update local state instead of calling fetchData
// const handleSearch = (searchValue) => {
//   setSearchTerm(searchValue); // Update local search state
// };


// const handleImageUpload = async (product) => {
//   const { id, file } = product; // Destructure the product to get id and file
 
//   const myImage = file;


//   // if(myCategoryName && (myCategoryImage === "null"))
//   //   {
//   //     setAlert({ open: true, message: "Image is required", severity: "error" });
//   //     return;
//   //   } 
//   const data = new FormData();
    
  

// // Assuming myCategoryImage is a File object, you can append it directly
// if (myImage) {
//   data.append('logo', myImage)
// } else {
//   console.error('brand logo is not a valid File object');
// }

//     try {
//       const action = await dispatch(updateProduct({ productId: id, updateData: data }));
//       if (action.meta.requestStatus === 'fulfilled') {
//       // setAlert({ open: true, message: "Product updated successfully!", severity: "success" });
//      console.log( "Product updated successfully!")
//      setReloadCount(reloadCount + 1);

     
//     }  else if (action.meta.requestStatus === 'rejected') {
//       const errorMessage = action.error.message || "Failed to create product. Please try again.";
//       console.log(`Error: ${errorMessage}`);

//       // Check if the error message includes "409" and show a specific message
//       if (errorMessage.includes('409')) {
//         // setAlert({ open: true, message: "Category with this name already exists. Please choose a different name.", severity: "error" });
//         console.log( "Product updated successfully!")

//       } else {
//         console.log( errorMessage)

//         // setAlert({ open: true, message: errorMessage, severity: "error" });
//       }
//     }
    
//     } catch (error) {
//       console.log( "Failed to create product. Please try again.")

//       // setAlert({ open: true, message: "Failed to create product. Please try again.", severity: "error" });
//     } finally {

//     }
// };
// const handleFileChange = async (event) => {
//   console.log('File input triggered');

//   const file = event.target.files[0];
//   if (file) {
//     const formData = new FormData();
//     formData.append('file', file);

//     setUploading(true);
//     setProgress(0); // Reset progress before starting upload

//     try {
//       const response = await axios.post('/products/import-excel', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.total) {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setProgress(percentCompleted);
//           }
//         },
//       });

//       if (response.status === 200) {
//         setReloadCount(reloadCount + 1);

//         Swal.fire({
//           title: 'Success!',
//           text: 'Excel sheet Successfully Imported!',
//           icon: 'success',
//         }).then(() => {
//           // Trigger any other actions needed after successful upload
//           setProgress(100); // Manually set to 100 on success
//         });
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     } finally {
//       setUploading(false);
//       setProgress(0); // Reset progress after upload is complete
//       fileInputRef.current.value = ''; // Reset the file input
//     }
//   }
// };
// const searchRecords = useCallback(async (search) => {
//   setLoading(true);
//   try {
//     const response = await axios.post(searachUrl, {
//       search : search,
//       table_name : table_name
//     });
//     setLeads(response.data?.result);
//   } catch (error) {
//     setAlert({ open: true, message: error.message, severity: "error" });
//   } finally {
//     setLoading(false);
//   }
// }, []);
// // useEffect(()=>{
// //   if(search.length > 0){
// //     // searchRecords(search)
// //     fetchData(limit, currentPage);
// //   }
// //   else{
// //     fetchData(limit, currentPage);
// //   }
// // } , [search])

//   const dataTableData = useMemo(
//     () => createDataTableData(filteredProducts, handleSelect, selectedProducts, handleImageUpload),
//     [filteredProducts, selectedProducts]
//   );
//   // const dataTableData = useMemo(
//   //   () => createDataTableData(products, handleSelect, selectedProducts),
//   //   [products, selectedProducts]
//   // );




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
//   >      <DashboardNavbar />
//       <ArgonBox my={3}>
//         <Card>
//           <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
//             <ArgonBox lineHeight={1}>
//               <ArgonTypography variant="h5" fontWeight="bold">
//                 All Products
//               </ArgonTypography>
//             </ArgonBox>
//             <Stack spacing={1} direction="row">
//               {selectedProducts.length > 0 && (
//                 <>
//                   <ArgonButton variant="gradient" color="error" size="small" onClick={handleDelete}>
//                     Delete
//                   </ArgonButton>
//                   <ArgonButton variant="gradient" color="info" size="small" onClick={handleStatusUpdate}>
//                     Update Status ▼
//                   </ArgonButton>
//                   <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//                     <MenuItem onClick={handleStatusChange} value="in_boycott">
//                       in_boycott
//                     </MenuItem>
//                     <MenuItem onClick={handleStatusChange} value="questionable">
//                       questionable
//                     </MenuItem>
//                   </Menu>
//                 </>
//               )}
             
//                 {/* <ArgonButton variant="gradient" color="info" size="small">
//                   See All Products
//                 </ArgonButton> */}
//                   <ArgonButton variant="gradient" color="info" size="small" component="label">
//   + Import Products
//   <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileChange} ref={fileInputRef} />
// </ArgonButton>
             
//               <Link to="/product_managment/products/new-product">
//                 <ArgonButton variant="gradient" color="info" size="small">
//                   + New Product
//                 </ArgonButton>
//               </Link>
//             </Stack>
//           </ArgonBox>

//           <ArgonBox display="flex" flexDirection="column" alignItems="flex-start" sx={{padding: '30px 24px'}}>
//             <ArgonBox display="flex" alignItems="center" mb={1}>
//               <ArgonBox lineHeight={1} mr={2}>

            
//               <ArgonTypography variant="h5" fontWeight="medium" sx={{color: '#748093', marginBottom: 1.5, fontSize: 18 }}>
//         Filters{' '}
//         <span style={{ color: 'lightgray', fontSize: '0.875rem' }}>
//           (Choose a Brand or Category to Filter)
//         </span>
//       </ArgonTypography>
           

//                 <ArgonButton variant="gradient" color="info" size="small" onClick={handleBrandClick}>
//                   {selectedBrand} ▼
//                 </ArgonButton>
//                 <Menu anchorEl={brandAnchorEl} open={Boolean(brandAnchorEl)} onClose={() => setBrandAnchorEl(null)}>
//                   <MenuItem onClick={handleBrandChange} value="All Brands">
//                     All Brands
//                   </MenuItem>
//                   {brands.map((brand) => (
//                 <MenuItem
//                   key={brand.id}
//                   onClick={handleBrandChange}
//                   value={brand.name}
//                 >
//                   {brand.name}
//                 </MenuItem>
//               ))}
//                 </Menu>

//                 <ArgonButton sx={{ 
//                    marginLeft: {
//                     xs: '0px', // Flex direction column for extra-small screens
//                     md: '10px',    // Flex direction row for medium screens and up
//                     lg: '10px'     // Flex direction row for large screens and up
//                   },
//                   marginTop: {
//                     xs: '10px', // Flex direction column for extra-small screens
//                     md: '0px',    // Flex direction row for medium screens and up
//                     lg: '0px'     // Flex direction row for large screens and up
//                   },

//                  }} variant="gradient" color="info" size="small" onClick={handleCategoryClick}>
//                   {selectedCategory.name} ▼
//                 </ArgonButton>
//                 <Menu anchorEl={categoryAnchorEl} open={Boolean(categoryAnchorEl)} onClose={() => setCategoryAnchorEl(null)}>
//                   <MenuItem onClick={handleCategoryChange} value="">
//                     All Categories
//                   </MenuItem>
//                   {categories.map((category) => (
//                     <MenuItem key={category.id} onClick={handleCategoryChange} value={category.id.toString()}>
//                       {category.name}
//                     </MenuItem>
//                   ))}
//                 </Menu>
//                 <ArgonButton sx={{  marginLeft: {
//                     xs: '0px', // Flex direction column for extra-small screens
//                     md: '10px',    // Flex direction row for medium screens and up
//                     lg: '10px'     // Flex direction row for large screens and up
//                   } }} variant="outlined" color="error" size="small" onClick={handleClearFilters}>
//               Clear Filters
//             </ArgonButton>
//               </ArgonBox>
//             </ArgonBox>
//           </ArgonBox>

//           {uploading && (
//             <ArgonBox px={3} pb={3}>
//               <ArgonProgress value={progress} />
//               <ArgonTypography variant="body2" color="text">
//                 {progress == 100  ? (
//                   'Import Completed'
//                 ) : (
//                     `Importing: ${progress}%`
//                 )}
//               </ArgonTypography>
//             </ArgonBox>
//           )}

//           {products?.length > 0 ? (
//         //    <DataTable
//         //    table={dataTableData}
//         //    entriesPerPage={{
//         //      defaultValue: limit,
//         //      entries: [5, 10, 15, 20, 50], // Limit options for pagination
//         //    }}
//         //    totalRecords={totalItems}   // Passing totalItems to DataTable
//         //    currentPage={currentPage}    // Current page state
//         //    setCurrentPage={setCurrentPage} // Set current page function
//         //    totalPages={totalPages}     // Passing totalPages to DataTable
//         //    setLimit={setLimit}         // Set limit function
//         //    canSearch           // Enable built-in search
//         //    onSearch={handleSearch}  // Call handleSearch for search input

//         //   //  onSearch={(searchTerm) => fetchData({ limit, page: currentPage, search: searchTerm })}
//         //  />

//         <DataTable
//             table={dataTableData}
//             entriesPerPage={{
//               defaultValue: limit,
//               entries: [5, 20, 50, 100],
//             }}
//             canSearch
//             // fetchData={fetchData}
//             // loading={loading}
//             currentPage ={currentPage}
//             setCurrentPage ={setCurrentPage}
//             limit={limit}
//             setLimit={setLimit}
//             totalPages ={totalPages}
//             totalRecords = {totalItems}
//             setSearch = {setSearch}
//             search = {search}
//             // table_name={table_name}
//           />

//           ) : (
//             <LoadingSpinner message="Please wait a moment while we fetch the products" /> // Render loading spinner with message when data is loading

// )
// }

// {products.length === 0 && (
//           <ArgonTypography sx={{    color: '#c1b6b6',fontWeight: 800, paddingBottom: '110px', marginTop: 5}} variant="body2" fontSize={14} align="center">
//           No products found.
//         </ArgonTypography> )}
           

// {/* {loading ? (
//             <LoadingSpinner message="Please wait a moment while we fetch the brands" /> // Render loading spinner with message when data is loading
//           ) : products?.length > 0 ? (
//             <DataTable
//               table={dataTableData}
//               entriesPerPage={{
//                 defaultValue: 7,
//                 entries: [5, 7, 10, 15, 20, 25],
//               }}
//               canSearch
//             />
//           ) : (          
//            <ArgonTypography sx={{    color: '#c1b6b6',fontWeight: 800, paddingBottom: '110px', marginTop: 5}} variant="body2" fontSize={14} align="center">
//               No products found.
//             </ArgonTypography>
//           )} */}
 
 

//         </Card>
//       </ArgonBox>
//     </DashboardLayout>
//   );
// }

// export default CategoriesList;

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Material-UI components
import {
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Button,
  IconButton,
  Pagination,
  Modal,
  Typography,
  Box,
  Avatar,
  Tooltip,
  Paper,
  PaginationItem,
  Menu,
  MenuItem,
} from "@mui/material";

// Material-UI icons
import {

  Edit as EditIcon,
  
  Padding,
  ArrowBackIos,
  ArrowDropDown,
  ArrowForwardIos,
  Close as CloseIcon,
  Delete,
  VisibilityOutlined,
  UploadFileOutlined,
  AddToPhotos,
} from "@mui/icons-material";

// Argon Dashboard 2 PRO MUI components and examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonProgress from "components/ArgonProgress";
import ArgonSelect from "components/ArgonSelect";
import UploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
// Project-specific imports
import { styled } from '@mui/material/styles';

import ProductTable from "./data/ImportAndEditProducts";
import LoadingSpinner from "layouts/Categories/new-product/components/LoadingSpinner/LoadingSpinner";
import FormField from "layouts/Categories/new-product/components/FormField";
import Swal from "sweetalert2";
import axios from "../../../../axios/axios";

// Ant Design components
import { Select } from 'antd';
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import { fetchBrands } from "globalStore/Slices/categoriesSlice";
import ProductDetailModal from "./data/ProductDetailModal";


const { Option } = Select;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '600',
  color: theme.palette.text.primary,
  fontSize: '14px',
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1.5),
  paddingLeft: theme.spacing(4), // Increase left padding for additional space between columns
  paddingRight: theme.spacing(4),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[100],
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));



function CategoriesList() {

const dispatch = useDispatch();
  const { categories, brands } = useSelector(state => state.categories);
  // const [brandOptions, setBrandOptions] = useState([]);
  
  const categoryOptions = categories.map(category => ({
    value: category.name,
    label: category.name,
  }));
  
  const brandOptions = brands.map(brand => ({
    value: brand.name,
    label: brand.name,
  }));
  
  
  
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [variantImages, setVariantImages] = useState(editProduct?.variant || []);

  
  useEffect(() => {
    fetchProducts(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
   
  }, [dispatch]);
  
  const fetchProductsWithoutLoading = async (page, limit) => {
  const response = await fetch(`https://boy.ranaafaqali.com/api/products/getAllProducts?page=${page}&limit=${limit}`);
  const data = await response.json();
    setProducts(data.result);
    setTotalPages(data.totalPages);
  };
  

  const fetchProducts = async (page, limit) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`https://boy.ranaafaqali.com/api/products/getAllProducts?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products'); // Handle non-200 responses
      }
      const data = await response.json();
      setProducts(data.result);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // End loading
    }
  };
  const handleRowEdit = (product) => {
    setEditProduct(product);
    setEditModalOpen(true);
  };
  
  const handleLogoUpload = async (productId, file) => {
    const formData = new FormData();
    formData.append('logo', file);
    await fetch(`https://boy.ranaafaqali.com/api/products/updateProductImages?id=${productId}`, {
      method: 'PUT',
      body: formData,
    });
    fetchProductsWithoutLoading(currentPage, entriesPerPage);
  };
  const handleFileChange = (productId, event) => {
    const file = event.target.files[0];
    if (file) handleLogoUpload(productId, file);
  };
  
  const handleFieldUpdate = async (productId, field, value) => {
  
    await fetch(`https://boy.ranaafaqali.com/api/products/updateProductImages?id=${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });
    fetchProductsWithoutLoading(currentPage, entriesPerPage);
  };
  const handleFieldUpdateLogo = async (productId, event, field) => {
    const file = event.target.files[0];
    console.log(file);
  
    // Create a FormData instance
    const formData = new FormData();
    formData.append(field, file); // Add the file with the specified field name
  
    // Send the request with FormData
    await fetch(`https://boy.ranaafaqali.com/api/products/updateProductImages?id=${productId}`, {
      method: 'PUT',
      body: formData,
    });
  
    fetchProductsWithoutLoading(currentPage, entriesPerPage);
  };
  

  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }
  
  const debouncedHandleFieldUpdate = useMemo(
    () => debounce((productId, field, value) => {
      handleFieldUpdate(productId, field, value);
    }, 500),
    []
  ); 
  
  const handleCheckboxChange = (productId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };
  
  const handleDeleteSelected = () => {
    console.log('Selected IDs for deletion:', selectedRows);
  };
  
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditProduct(null);
  };
  const handleEntriesPerPageChange = (value) => {
    setEntriesPerPage(value);
    setCurrentPage(1); // Reset to the first page
  };
  
  
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangeColor = (e) => {
    const { name, value } = e.target;
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleChangeStatus = (e) => {
    const { name, value } = e.target;
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangeDescription  = ( e)=> {
    const { name, value } = e.target;
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name, value) => {
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOpenDetailModal = (category) => {
    setSelectedProduct(category);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleLocalImageDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, logo: null } : product
      )
    );
  };
  const handleLocalImageDeleteLogo = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, product_image: null } : product
      )
    );
  };
  
  const handleSaveChanges = async () => {
    const { id, product_name, category_name, brand_name, bgColor, status, description, product_image} = editProduct;
    const payloadBody = {product_name, category_name, brand_name,
      bgColor,
      status,
      description,
      variant: variantImages}
    console.log('Updated values:',payloadBody);
 
    await fetch(`https://boy.ranaafaqali.com/api/products/updatePDetails?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_name, category_name, brand_name,
        bgColor,
        status,
        description,
        variant: variantImages
       }),
    });
  
    fetchProductsWithoutLoading(currentPage, entriesPerPage);
    setEditModalOpen(false);
  };
  
  
  
  
  const dataTableData = useMemo(() => ({
    columns: [
      { Header: "", accessor: "checkbox", width: 50 },
      { Header: "Image", accessor: "logo" },
      { Header: "Product Name", accessor: "productName" },
      { Header: "BgColorInput", accessor: "bgColortext" },
      { Header: "Logo", accessor: "productlogo" },
      { Header: "Category", accessor: "category" },
      { Header: "Position", accessor: "position" },

      { Header: "Created", accessor: "created" },
      { Header: "Updated", accessor: "updated" },
      { Header: "Status", accessor: "status" },
      { Header: "Brand", accessor: "brand" },
      { Header: "BgColor", accessor: "bgColor" },
      // { Header: "Categories", accessor: "categories" },

      { Header: "Action", accessor: "action" },
    ],
    rows: products.map((product) => ({
      checkbox: (
        <Checkbox 
          checked={selectedRows.includes(product.id)}
          onChange={() => handleCheckboxChange(product.id)}
        />
      ),


      
      logo: product.logo ? (
        // <img src={product?.logo} alt={"img"} style={{ width: '30%', borderRadius: '8px' }} />
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
         
        
          
        }}
      >
        <img
          src={product?.logo}
          alt="img"
          style={{ width: '80%', borderRadius: '8px' }}
        />
       <Typography
      variant="body2"
      color="error"
      sx={{ cursor: 'pointer', mt: 0.5, fontSize:9, fontWeight:'bold', textDecoration: 'underline' }} // Optional margin-top and margin-left for spacing
      onClick={() => handleLocalImageDelete(product.id)}
    >
      Remove
    </Typography>
      </Box>
      ) : (
        <>
          <StyledButton
            startIcon={<UploadIcon />}
            onClick={() => document.getElementById(`upload-logo-${product.id}`).click()}
          >
            Upload
          </StyledButton>
          <input
            type="file"
            id={`upload-logo-${product.id}`}
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(product.id, e)}
          />
        </>
      ),
      productName: (
        <>
          <TextField
          defaultValue={product.product_name}
          variant="standard"
          onBlur={(e) => debouncedHandleFieldUpdate(product.id, 'product_name', e.target.value)}
          fullWidth
          sx={{ input: { fontSize: '14px', color: 'text.primary' } }}
        />
        </>
      
      ),
      bgColortext : (
        <input
        defaultValue={product.bgColor}
        type="text"
        onBlur={(e) => debouncedHandleFieldUpdate(product.id, 'bgColor', e.target.value)}
        style={{
          width: '60px',
          border: '1px solid #c3c3c3',
          borderRadius: '5px',
          padding: '5px 6px',
          fontSize: '12px',
          color: 'text.primary'
        }}
      />
      ),


      productlogo: product.product_image ? (
        // <img src={product?.logo} alt={"img"} style={{ width: '30%', borderRadius: '8px' }} />
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
         
        
          
        }}
      >
        <img
          src={product?.product_image}
          alt="logo"
          style={{ width: 60,height:60, borderRadius: '8px' }}
        />
       <Typography
      variant="body2"
      color="error"
      sx={{ cursor: 'pointer', mt: 0.5, fontSize:9, fontWeight:'bold', textDecoration: 'underline', textAlign:'center' }} // Optional margin-top and margin-left for spacing
      onClick={() => handleLocalImageDeleteLogo(product.id)}
    >
      Remove
    </Typography>
      </Box>
      ) : (
        <>
          <StyledButton
            startIcon={<UploadIcon />}
            onClick={() => document.getElementById(`upload-logo-${product.id}`).click()}
          >
            Upload
          </StyledButton>
          <input
            type="file"
            id={`upload-logo-${product.id}`}
            style={{ display: 'none' }}
            onChange={(e) => handleFieldUpdateLogo(product.id, e, 'product_image' )}
          />
        </>
      ),
      category: product.category_name,

      position : ( <sup>
      <span style={{ fontSize: '16px', lineHeight: 0 }}>
          {product.imported ? (
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <UploadFileOutlined style={{ color: 'orangered',  marginRight: 1 }} /> 
            <span style={{fontSize: 12}}>
              Imported
              </span>
              </Box>
          ) : (
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <AddToPhotos style={{ color: 'green',marginRight: 1 }} />
            <span>
              Created
              </span>
            </Box>
          )}
        </span>
      </sup>),
      created: (
        <Typography
        sx={{
         
          fontSize: 12,
          fontFamily: 'Arial, sans-serif', // Optional: Add custom font
          fontStyle: 'italic', // Optional: Add font style
        }}
      >
        {(() => {
          const date = new Date(product.createdAt);
          const day = date.toLocaleDateString('en-GB', { weekday: 'long' }); // Get the full day name
          const formattedDate = date.toLocaleDateString('en-GB'); // Format date as dd/mm/yyyy
          return `(${formattedDate}) ${day}`;
        })()}
      </Typography>
      ),
      updated: (
        <Typography
        sx={{
         
          fontSize: 12,
          fontFamily: 'Arial, sans-serif', // Optional: Add custom font
          fontStyle: 'italic', // Optional: Add font style
        }}
      >
        {(() => {
          const date = new Date(product.updatedAt);
          const day = date.toLocaleDateString('en-GB', { weekday: 'long' }); // Get the full day name
          const formattedDate = date.toLocaleDateString('en-GB'); // Format date as dd/mm/yyyy
          return `(${formattedDate}) ${day}`;
        })()}
      </Typography>
      ),
      status : (
        <Typography
        sx={{
         
          fontSize: 10,
          fontFamily: 'Arial, sans-serif', // Optional: Add custom font
          backgroundColor: 'orangered',
          width: 60,
          textAlign: 'center',
          padding: '2px 5px',
          color: '#fff',
          fontWeight:'bold',
          borderRadius: 2
        }}
      >
        In Boycott
      </Typography>
      ),
      // categories: (
      //   <ArgonTypography style={{textAlign: 'center', fontSize: 17}}>
      //     {product?.totalCategories}
      //   </ArgonTypography>
      // ),
      brand: product.brand_name || "N/A",
      bgColor: (
        <input
          type="color"
          defaultValue={product.bgColor}
          onChange={(e) => debouncedHandleFieldUpdate(product.id, 'bgColor', e.target.value)}
          style={{ width: '80%', height: '30px', border: 'none', cursor: 'pointer' }}
        />
      ),
      action: (
        // <Tooltip title="Edit">
        //   <StyledIconButton onClick={() => handleRowEdit(product)}>
        //     <EditIcon style={{color: '#1190EF'}}/>
        //   </StyledIconButton>
        // </Tooltip>

        <Box display={"flex"} alignItems={"center"} gap={1}>
<Delete style={{color: 'red', fontSize:15, cursor: 'pointer'}}/>
<VisibilityOutlined style={{color: '#1190EF',fontSize:15, cursor: 'pointer'}}
          onClick={() => handleOpenDetailModal(product)}

/>
<EditIcon style={{color: '#1190EF',fontSize:15, cursor: 'pointer'}} onClick={() => handleRowEdit(product)}/>

</Box>
      ),
    })),
  }), [products, selectedRows]);
  
  const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

const [loading , setLoading] = useState(false);






  const [progress, setProgress] = useState(0); // State for progress
  const [uploading, setUploading] = useState(false); // State for upload status
  const fileInputRef = useRef(null);
  const [search , setSearch] = useState('');

const handleFileChangee = async (event) => {
  console.log('File input triggered');

  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setProgress(0); // Reset progress before starting upload

    try {
      const response = await axios.post('/products/import-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      if (response.status === 200) {
        fetchProductsWithoutLoading(currentPage, entriesPerPage);
        Swal.fire({
          title: 'Success!',
          text: 'Excel sheet Successfully Imported!',
          icon: 'success',
        }).then(() => {
          // Trigger any other actions needed after successful upload
          setProgress(100); // Manually set to 100 on success
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
      setProgress(0); // Reset progress after upload is complete
      fileInputRef.current.value = ''; // Reset the file input
    }
  }
};



useEffect(() => {
  if (editProduct?.variant) {
    setVariantImages(editProduct.variant);
  }
}, [editProduct]);

const handleImageUpload = async (event) => {
  const files = Array.from(event.target.files);

  // Create a FormData instance for each file and upload them
  const uploadedImages = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("variant", file);

      try {
        const response = await axios.post(
          "/products/uploadImageToCloudinary",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Return the Cloudinary URL
        return response.data.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    })
  );

  // Filter out any failed uploads and update the state
  setVariantImages((prev) => [...prev, ...uploadedImages.filter(Boolean)]);
};
const handleRemoveImage = (index) => {
  setVariantImages(prev => prev.filter((_, i) => i !== index));
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
  >      <DashboardNavbar />
      <ArgonBox my={0}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
          <ArgonBox lineHeight={1} display="flex" flexDirection="row" alignItems="center" gap={10}>
              <ArgonTypography variant="h5" fontWeight="bold">
                All Products
              </ArgonTypography>
           

            <Box display="flex" flexDirection="row" alignItems="center"  gap={1} >

<ArgonTypography sx={{fontSize: 14, fontStyle: 'italic', color:'#918c8c'}}>
    Entries per page
</ArgonTypography>
<Box>
<Select
                label="Select Entries"
                onChange={handleEntriesPerPageChange}
                defaultValue={50}
                suffixIcon={<ArrowDropDown />} // Replace with any icon you prefer
              >
                {[ 50, 100, 200].map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
</Box>
         
              </Box>  
              </ArgonBox>

            

            <Stack spacing={1} direction="row">
              {/* {products.length > 0 && (
                <>
                  <ArgonButton variant="gradient" color="error" size="small" onClick={handleDelete}>
                    Delete
                  </ArgonButton>
                  <ArgonButton variant="gradient" color="info" size="small" onClick={handleStatusUpdate}>
                    Update Status ▼
                  </ArgonButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={handleFileChangee} value="in_boycott">
                      in_boycott
                    </MenuItem>
                    <MenuItem onClick={handleStatusChange} value="questionable">
                      questionable
                    </MenuItem>
                  </Menu>
                </>
              )} */}
             
                
                  <ArgonButton variant="gradient" color="info" size="small" component="label">
  + Import Products
  <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileChangee} ref={fileInputRef} />
</ArgonButton>
             
              <Link to="/boycott/brands-list">
                <ArgonButton variant="gradient" color="info" size="small">
                  See All Brands
                </ArgonButton>
              </Link>
            </Stack>
          </ArgonBox>

          

          {uploading && (
            <ArgonBox px={3} pb={3}>
              <ArgonProgress value={progress} />
              <ArgonTypography variant="body2" color="text">
                {progress == 100  ? (
                  'Import Completed'
                ) : (
                    `Importing: ${progress}%`
                )}
              </ArgonTypography>
            </ArgonBox>
          )}


{loading ? (
            <LoadingSpinner message="Please wait a moment while we fetch the products" /> // Render loading spinner with message when data is loading
          ) : (
           products?.length > 0 ? (

              <Paper elevation={3} sx={{  borderRadius: 2, backgroundColor: 'background.default' }}>
                    {/* <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                      Products Table
                    </Typography> */}
                  
                  <Box sx={{ overflowX: 'auto', height: '65vh' }}> {/* Add horizontal scroll */}
                
              
                            {dataTableData.columns.map((column) => (
                              <StyledTableCell key={column.accessor}>{column.Header}</StyledTableCell>
                            ))}
                       
                      
                          {dataTableData.rows.map((row, index) => (
                            <StyledTableRow key={index}>
                              {dataTableData.columns.map((column) => (
                                <StyledTableCell key={column.accessor}>
                                  {row[column.accessor]}
                                </StyledTableCell>
                              ))}
                            </StyledTableRow>
                          ))}
                       
              
                    {selectedRows.length > 0 && (
                      <StyledButton
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{ mt: 2 }}
                        onClick={handleDeleteSelected}
                      >
                        Delete Selected
                      </StyledButton>
                    )}
              
                   
              
           
                  
              
              
              
              
              
                    <Modal
                  open={editModalOpen}
                  onClose={handleCloseEditModal}
                  aria-labelledby="edit-product-modal-title"
                  aria-describedby="edit-product-modal-description"
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
                      borderRadius: 5,
                      p: 4,
                      width: 400,
                      height: 400,
                      overflowY: 'auto',
                      // borderRadius: 2,
                      outline: 'none', // Remove default outline
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <IconButton
                      aria-label="close"
                      onClick={handleCloseEditModal}
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
                    <Typography variant="h6" gutterBottom style={{marginBottom: 10, fontWeight: 'bold'}}>Edit Product</Typography>
              
              
              
              <FormField
                            type="text"
                            label="Product Name"
                            placeholder="eg. Mac Book"
                            name="product_name"
                            value={editProduct?.product_name || ''}
                            onChange={handleChange}
                           
                          />

<Box  style={{  marginTop: 3 }}>

<FormField
                     
                     type="text"
                     label="Bg Color"
                     placeholder=""
                     name="bgColor"
                     value={editProduct?.bgColor || ''}
                     onChange={handleChangeColor}
                  
                   />
                   </Box>


{/* Variant Image Upload */}
<Box sx={{ marginTop: 3 }}>
          <ArgonTypography component="label" variant="caption" fontWeight="bold">
          Variant Images
                </ArgonTypography>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'block', marginTop: 8 }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
            {variantImages.map((image, index) => (
              <Box key={index} sx={{ position: 'relative', width: 100, height: 100 }}>
                <img src={image} alt={`variant-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)', // Change to a darker color on hover
                    },
                     
                  }}
                >
                  <CloseIcon fontSize="small" style={{color: 'white'}}/>
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>





                   <Box  style={{  marginTop: 3 }}>

<FormField
                     
                     type="text"
                     label="Status"
                     placeholder=""
                     name="status"
                     value={editProduct?.status || ''}
                     onChange={handleChangeStatus}
                  
                   />
                   </Box>

                   

                   <Box  style={{  marginTop: 3 }}>
                   <FormField
             type="text"
             label="description"
             placeholder="Enter a description "
             name="description"
             value={editProduct?.description}
             onChange={handleChangeDescription}
           
             multiline
             rows={5} // Specify the number of rows for the textarea
             style={{ width: '100%', marginTop: 3 }} // Adjust width and other styles as needed
           />
                </Box>
              <ArgonBox mb={2}>
                <ArgonTypography component="label" variant="caption" fontWeight="bold">
                  Select Category
                </ArgonTypography>
                <ArgonSelect
                  name="category_name"
                  value={categoryOptions.find(option => option.value === editProduct?.category_name)}
                  onChange={(selected) => handleSelectChange('category_name', selected.value)}
                  options={categoryOptions}
                  isSearchable={false}
                />
              </ArgonBox>
              
              <ArgonBox mb={2}>
                <ArgonTypography component="label" variant="caption" fontWeight="bold">
                  Select Brand
                </ArgonTypography>
                <ArgonSelect
                  name="brand_name"
                  value={brandOptions.find(option => option.value === editProduct?.brand_name)  }
                  onChange={(selected) => handleSelectChange('brand_name', selected.value)}
                  options={brandOptions}
                  isSearchable={true}
                />
              </ArgonBox>

             
              
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
               <ArgonTypography style={{color: 'white', fontSize:17, fontWeight: 'bold'}}>
                Save Changes
                </ArgonTypography> 
              </Button>
                  </Box>
                    </Modal> 

                </Box>

                <Box display="flex" justifyContent="flex-end" mt={1}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    slots={{
                      previous: ArrowBackIos,
                      next: ArrowForwardIos,
                    }}
                    sx={{
                      color: item.page === currentPage ? '#fff' : '#000',
                      backgroundColor: item.page === currentPage ? '#1190EF' : '#c5cae9',
                      borderRadius: '8px',
                      minWidth: '30px',
                      minHeight: '15px',
                      '&:hover': {
                        backgroundColor: item.page === currentPage ? '#1190EF' : '#b3b9d5',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#1190EF',
                        color: '#fff',
                      },
                    }}
                  />
                )}
              />
                {/* <Typography variant="h6" sx={{ mx: 2, alignSelf: 'center' }}>
                  &lt; {currentPage} &gt;
                </Typography> */}
              </Box>
                  </Paper>
                        )
                        : (         
                          
                          <ArgonTypography sx={{    color: '#c1b6b6',fontWeight: 800, paddingBottom: '110px', marginTop: 5}} variant="body2" fontSize={14} align="center">
                             No products found.
                           </ArgonTypography>
                         )
                        
          )} 


 
 

        </Card>
      </ArgonBox>

      <ProductDetailModal
        open={isDetailModalOpen} 
        onClose={handleCloseDetailModal} 
        product={selectedProduct} 
      />
    </DashboardLayout>
  );
}

export default CategoriesList;