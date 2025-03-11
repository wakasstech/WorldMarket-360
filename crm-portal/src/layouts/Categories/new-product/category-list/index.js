// /**
// =========================================================
// * Argon Dashboard 2 PRO MUI - v3.0.1
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // react-router-dom components
// import { Link } from "react-router-dom";

// // @mui material components
// import Card from "@mui/material/Card";
// import Stack from "@mui/material/Stack";

// // Argon Dashboard 2 PRO MUI components
// import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";
// import ArgonButton from "components/ArgonButton";

// // Argon Dashboard 2 PRO MUI example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchCategories } from "globalStore/Slices/categoriesSlice";
// import { useSelector } from "react-redux";
// import createDataTableData from "./data/dataTableData";
// import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
// import axios from "../../../../axios/axios";
// import Swal from "sweetalert2";
// import ArgonProgress from "components/ArgonProgress";
// // Data

// function CategoriesList() {
//   const dispatch = useDispatch();
//   const { categories, loading } = useSelector(state => state.categories);
//   const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [progress, setProgress] = useState(0); // State for progress
//   const [uploading, setUploading] = useState(false); // State for upload status

//   const fileInputRef = useRef(null); // Add ref for file input

//   useEffect(() => {
//     // if (!categories || categories.length === 0) {
//       dispatch(fetchCategories());
//     // }
//   }, [dispatch]);

//   const handleSelect = (id) => {
//     setSelectedCategories((prevSelected) => {
//       if (prevSelected.includes(id)) {
//         return prevSelected.filter((categoryId) => categoryId !== id);
//       }
//       return [...prevSelected, id];
//     });
//   };


//   const dataTableData = useMemo(() => createDataTableData(categories,  handleSelect, selectedCategories

//   ), [categories, selectedCategories]);



//   const handleDelete = () => {
//     const requestBody = { ids: selectedCategories };
//     console.log(requestBody);
//   };


//   const handleFileChange = async (event) => {
//     console.log("File input triggered");
  
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
  
//       setUploading(true);

//       setProgress(0); // Reset progress before starting upload
  
//       try {
//         const response = await axios.post("/categories/import-bulk-categories", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total) {
//               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//               setProgress(percentCompleted);
//             }
//           },
//         });
  
//         if (response.status === 200) {
//           Swal.fire({
//             title: "Success!",
//             text: "Excel sheet Successfully Imported!",
//             icon: "success",
//           }).then(async () => {
//             // Trigger category refetch after successful upload
//             await dispatch(fetchCategories());
//             setProgress(100); // Manually set to 100 on success
//           });
//         }
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       } finally {
//         setUploading(false);

//          setProgress(0); // Reset progress after upload is complete
//         fileInputRef.current.value = ""; // Reset the file input
//       }
//     }
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
//   >      <DashboardNavbar />
//       <ArgonBox my={3}>
//         <Card>
//           <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
//             <ArgonBox lineHeight={1}>
//               <ArgonTypography variant="h5" fontWeight="medium">
//                 All Categories
//               </ArgonTypography>
//             </ArgonBox>
            
//             <Stack spacing={1} direction="row">
//             {selectedCategories.length > 0 && (
//                 <ArgonButton variant="gradient" color="error" size="small" onClick={handleDelete}>
//                   Delete
//                 </ArgonButton>
//               )}

//             <Link to="/boycott/categories-list">
//                 <ArgonButton variant="gradient" color="info" size="small">
//                   See All Brands
//                 </ArgonButton>
//               </Link>
//               <Link to="/boycott/create-category">
//                 <ArgonButton variant="gradient" color="info" size="small">
//                   + New Category
//                 </ArgonButton>
//               </Link>

//               <ArgonButton variant="gradient" color="info" size="small" component="label">
//   + Import Categories
//   <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileChange} ref={fileInputRef} />
// </ArgonButton>
             

             
//             </Stack>
//           </ArgonBox>
//           {/* {categories?.length > 0 && (
//             <DataTable
//   table={ dataTableData }
//   entriesPerPage={{
//               defaultValue: 7,
//               entries: [5, 7, 10, 15, 20, 25],
//             }}
//             canSearch
//           />
//           )} */}

// {uploading && (
//             <ArgonBox px={3} pb={3}>
//               <ArgonProgress value={progress} />
//               <ArgonTypography variant="body2" color="text">
//                 {progress == 100  ? (
//                   'Import Completed Please wait...'
//                 ) : (
//                     `Importing: ${progress}%`
//                 )}
//               </ArgonTypography>
//             </ArgonBox>
//           )}
// {loading ? (
//             <LoadingSpinner message="Please wait a moment while we fetch the categories" /> // Render loading spinner with message when data is loading
//           ) : categories.length > 0 ? (
//             <DataTable
//   table={ dataTableData }
//   entriesPerPage={{
//               defaultValue: 50,
//               entries: [5, 7, 10, 15, 20, 25],
//             }}
//             canSearch
//           />
//           ) : (          
//            <ArgonTypography sx={{    color: '#c1b6b6',fontWeight: 800, paddingBottom: '110px', marginTop: 5}} variant="body2" fontSize={14} align="center">
//               No categories found.
//             </ArgonTypography>
//           )}
          
//         </Card>
//       </ArgonBox>
//       {/* <Footer /> */}
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
  VisibilityOutlined,
  Delete,
  Clear,
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


import Swal from "sweetalert2";
import axios from "../../../../axios/axios";

// Ant Design components
import { Select } from 'antd';
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import FormField from "../components/FormField";
import CategoryDetailModal from "./CategoryDetailModal";


const { Option } = Select;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '600',
  color: theme.palette.text.primary,
  fontSize: '14px',
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  // padding: theme.spacing(1),
  paddingLeft: theme.spacing(2), // Increase left padding for additional space between columns
  paddingRight: theme.spacing(2),
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
  color: '#11BBEF',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#11BBEF',
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
  // const { categories } = useSelector(state => state.categories);
  // const [brandOptions, setBrandOptions] = useState([]);
  
  // const categoryOptions = categories.map(category => ({
  //   value: category.name,
  //   label: category.name,
  // }));

  const [categories, setCategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  useEffect(() => {
    fetchBrands(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage]);

  const fetchProductsWithoutLoading = async (page, limit) => {
  const response = await fetch(`https://boy.ranaafaqali.com/api/categories/CategoryAll`);
  const data = await response.json();
    setCategories(data);
    // setTotalPages(data.totalPages);
  };
  

  const fetchBrands = async (page, limit) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`https://boy.ranaafaqali.com/api/categories/CategoryAll`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories'); // Handle non-200 responses
      }
      const data = await response.json();
      setCategories(data);
      // setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // End loading
    }
  };
  const handleRowEdit = (category) => {
    setEditProduct(category);
    setEditModalOpen(true);
  };

  const handleOpenDetailModal = (category) => {
    setSelectedCategory(category);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedCategory(null);
  };
  
  const handleLogoUpload = async (categoryId, file) => {
    const formData = new FormData();
    formData.append('category_image', file);
    await fetch(`https://boy.ranaafaqali.com/api/categories/updateCategory?id=${categoryId}`, {
      method: 'PUT',
      body: formData,
    });
    fetchProductsWithoutLoading(currentPage, entriesPerPage);
  };
  const handleFileChange = (categoryId, event) => {
    const file = event.target.files[0];
    if (file) handleLogoUpload(categoryId, file);
  };
  
  const handleFieldUpdate = async (categoryId, field, value) => {
    let updatedFields = { [field]: value };
  
    if (field === 'bgColor') {
      updatedFields.bgColortext = value;
    } else if (field === 'bgColortext') {
      updatedFields.bgColor = value;
    }
  
    await fetch(`https://boy.ranaafaqali.com/api/categories/updateCategory?id=${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    });
  
    fetchProductsWithoutLoading(currentPage, entriesPerPage);
  };
  
  useEffect(() => {
    if (editProduct?.bgColor || editProduct?.bgColortext) {
      fetchProductsWithoutLoading(currentPage, entriesPerPage);
    }
  }, [editProduct?.bgColor, editProduct?.bgColortext]);
  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

    // Debounce the handleFieldUpdate function
    const debouncedHandleFieldUpdate = useMemo(
      () => debounce((productId, field, value) => {
        handleFieldUpdate(productId, field, value);
      }, 500),
      []
    );

  const handleCheckboxChange = (categoryId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
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
  const handleLocalImageDelete = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId ? { ...category, category_image: null } : category
      )
    );
  };
  
  

  const handleSaveChanges = async () => {
    const { id,  name, bgColor } = editProduct;
  
    console.log('Updated values:', {
      id,
      name,
      bgColor,
    });
  
  
  
  
  // Send update request to the API
  await fetch(`https://boy.ranaafaqali.com/api/categories/updateCategory?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, bgColor }),
  });

  // Refetch the updated list of categories
  await fetchBrands(currentPage, entriesPerPage);
    setEditModalOpen(false);
  };

 
  
  const dataTableData = useMemo(() => ({
    columns: [
      { Header: "", accessor: "checkbox", },
      { Header: "Image", accessor: "image" },
      { Header: "Category Name", accessor: "categoryName" },
      { Header: "BgColor", accessor: "bgColortext" },
      { Header: "Created", accessor: "created" },
      { Header: "Updated", accessor: "updated" },
      // { Header: "SelectBgColor", accessor: "bgColor" },
      { Header: "Brands", accessor: "totalBrands" },
      { Header: "Products", accessor: "totalProducts" },

      { Header: "Action", accessor: "action" },
      // { Header: "View", accessor: "View Detail" },
 
    ],
    rows: categories.map((category) => ({
      checkbox: (
        <Checkbox 
          checked={selectedRows.includes(category.id)}
          onChange={() => handleCheckboxChange(category.id)}
        />
      ),
      image: category.category_image ? (
        <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
     
    
      
    }}
  >
    <img
      src={category.category_image}
      alt="img"
      style={{ width: '30%', borderRadius: '8px' }}
    />
   <Typography
  variant="body2"
  color="error"
  sx={{ cursor: 'pointer', mt: 0.5,  ml: { xs: 0, md: 0 }, fontSize:9, fontWeight:'bold', textDecoration: 'underline' }} // Optional margin-top and margin-left for spacing
  onClick={() => handleLocalImageDelete(category.id)}
>
  Remove
</Typography>
  </Box>
      ) : (
        <>
          <StyledButton
            startIcon={<UploadIcon />}
            onClick={() => document.getElementById(`upload-category_image-${category.id}`).click()}
          >
            Upload
          </StyledButton>
          <input
            type="file"
            id={`upload-category_image-${category.id}`}
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(category.id, e)}
          />
        </>
      ),
      categoryName: (
        <TextField
          defaultValue={category.name}
          variant="standard"
          onBlur={(e) => debouncedHandleFieldUpdate(category.id, 'name', e.target.value)}
          fullWidth
          sx={{ width:150, fontSize:12 }}
          />
      ),

      bgColortext : (
        <input
        defaultValue={category.bgColor}
        type="text"
        onBlur={(e) => debouncedHandleFieldUpdate(category.id, 'bgColortext', e.target.value)}
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

      created: (
        <Typography
        sx={{
         
          fontSize: 12,
          fontFamily: 'Arial, sans-serif', // Optional: Add custom font
          fontStyle: 'italic', // Optional: Add font style
        }}
      >
        {(() => {
          const date = new Date(category.createdAt);
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
          const date = new Date(category.updatedAt);
          const day = date.toLocaleDateString('en-GB', { weekday: 'long' }); // Get the full day name
          const formattedDate = date.toLocaleDateString('en-GB'); // Format date as dd/mm/yyyy
          return `(${formattedDate}) ${day}`;
        })()}
      </Typography>
      ),
      // category: category.category_name,
      // category: category.brand_name || "N/A",
  //     bgColor: (
     
  //       <input
  //   type="color"
  //   defaultValue={category.bgColor}
  //   onChange={(e) => debouncedHandleFieldUpdate(category.id, 'bgColor', e.target.value)}
  //   style={{ width: '80%', height: '30px', border: 'none', cursor: 'pointer' }}
  // />
      

  
       
  //     ),
      totalBrands: (
        <ArgonTypography style={{textAlign: 'center', fontSize:17}}>
          {category?.brandCount}
        </ArgonTypography>
      ),
      totalProducts: (
        <ArgonTypography style={{textAlign: 'center', fontSize:17}}>
           {category?.productCount}
        </ArgonTypography>
      ),
   
      action: (
        // <Tooltip title="Edit">
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Delete style={{color: 'red', fontSize:15, cursor: 'pointer'}}/>
          <VisibilityOutlined style={{color: '#1190EF',fontSize:15, cursor: 'pointer'}}
                      onClick={() => handleOpenDetailModal(category)} // Open modal with category details

          />
            <EditIcon style={{color: '#1190EF',fontSize:15, cursor: 'pointer'}} onClick={() => handleRowEdit(category)}/>
          
          </Box>
       // </Tooltip>
      ),
    })),
  }), [categories, selectedRows]);
  
  const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

const [loading , setLoading] = useState(false);

  const [progress, setProgress] = useState(0); // State for progress
  const [uploading, setUploading] = useState(false); // State for upload status
  const fileInputRef = useRef(null);
  const [search , setSearch] = useState('');
 
  const handleFileChangee = async (event) => {
    console.log("File input triggered");
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      setUploading(true);

      setProgress(0); // Reset progress before starting upload
  
      try {
        const response = await axios.post('/categories/import-bulk-categories', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percentCompleted);
            }
          },
        });
  
        if (response.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Excel sheet Successfully Imported!",
            icon: "success",
          }).then(async () => {
            // Trigger category refetch after successful upload
            // await dispatch(fetchBrands()).then((fetchedBrands) => {
            //   setAllBrands(fetchedBrands || []);
            //   setDisplayedBrands(fetchedBrands || []);
            // });
            await  fetchProductsWithoutLoading(currentPage, entriesPerPage);
            setProgress(100); // Manually set to 100 on success
          });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);

         setProgress(0); // Reset progress after upload is complete
        fileInputRef.current.value = ""; // Reset the file input
      }
    }
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
      <ArgonBox my={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="bold">
                All Categories
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              {/* {categories.length > 0 && (
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
  + Import Categories
  <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileChangee} ref={fileInputRef} />
</ArgonButton>
             
              <Link to="/product_managment/products/products-list">
                <ArgonButton variant="gradient" color="info" size="small">
                  See All Products
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
            <LoadingSpinner message="Please wait a moment while we fetch the categories" /> // Render loading spinner with message when data is loading
          ) : (
           categories?.length > 0 ? (

              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: 'background.default' }}>
                    {/* <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                      Products Table
                    </Typography> */}
                         <Box sx={{ overflowX: 'auto' }}> {/* Add horizontal scroll */}
          
                  <Select
                label="Select Entries"
                onChange={handleEntriesPerPageChange}
                defaultValue={25}
                suffixIcon={<ArrowDropDown />} // Replace with any icon you prefer
              >
                {[25, 50, 100].map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
              
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
              
                   
              
              <Box display="flex" justifyContent="flex-end" mt={4}>
              {/* <Pagination
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
                      minWidth: '40px',
                      minHeight: '40px',
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
              /> */}
                {/* <Typography variant="h6" sx={{ mx: 2, alignSelf: 'center' }}>
                  &lt; {currentPage} &gt;
                </Typography> */}
              </Box>

                    <Modal
                  open={editModalOpen}
                  onClose={handleCloseEditModal}
                  aria-labelledby="edit-category-modal-title"
                  aria-describedby="edit-category-modal-description"
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
                    <Typography variant="h6" gutterBottom style={{marginBottom: 10, fontWeight: 'bold'}}>Edit Category</Typography>
              
              
              
              <FormField
                            type="text"
                            label="Category Name"
                            placeholder=""
                            name="name"
                            value={editProduct?.name || ''}
                            onChange={handleChange}
                           
                          />
                               <Box mt={3}>
                               <FormField
                     
                     type="text"
                     label="Bg Color"
                     placeholder=""
                     name="bgColor"
                     value={editProduct?.bgColor || ''}
                     onChange={handleChangeColor}
                    
                   />
                               </Box>
                     
 
              <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ marginTop:2}}>
               <ArgonTypography style={{color: 'white', fontSize:17, fontWeight: 'bold',}}>
                Save Changes
                </ArgonTypography> 
              </Button>
                  </Box>
                </Modal> 
                  </Box>
                  </Paper>
                        )
                        : (         

                          <ArgonTypography sx={{    color: '#c1b6b6',fontWeight: 800, paddingBottom: '110px', marginTop: 5}} variant="body2" fontSize={14} align="center">
                             No categories found.
                           </ArgonTypography>
                         )
                        
          )} 

        </Card>

        <div>
      {/* Render the data table */}
      
      {/* Render the modal */}
      <CategoryDetailModal 
        open={isDetailModalOpen} 
        onClose={handleCloseDetailModal} 
        category={selectedCategory} 
      />
    </div>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default CategoriesList;
