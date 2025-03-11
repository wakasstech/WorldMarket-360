
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Card from "@mui/material/Card";
// import Stack from "@mui/material/Stack";
// import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";
// import ArgonButton from "components/ArgonButton";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";
// import { fetchBrands } from "globalStore/Slices/categoriesSlice";
// import { useSelector, useDispatch } from "react-redux";
// import createDataTableBrands from "./data/dataTableBrands";
// import { Link } from "react-router-dom";
// import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
// import { updateBrand } from "globalStore/Slices/categoriesSlice";
// import ArgonProgress from "components/ArgonProgress";
// import axios from "../../../../axios/axios";
// import Swal from "sweetalert2";
// // Data
// const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

// function Brands() {
//   const dispatch = useDispatch();
//   const { brands, loading } = useSelector((state) => state.categories);
//   // State for selected brands
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   useEffect(() => {
//     // if (!categories || categories.length === 0) {
//       dispatch(fetchBrands());
//     // }
//   }, [dispatch]);

//   const [progress, setProgress] = useState(0); // State for progress
//   const [uploading, setUploading] = useState(false); // State for upload status
//   const [imageUploading, setImageUploading] = useState(false); // State for upload status
//   const fileInputRef = useRef(null); // Add ref for file input

//   const handleSelect = (id) => {
//     setSelectedBrands((prevSelected) => {
//       if (prevSelected.includes(id)) {
//         return prevSelected.filter((brandId) => brandId !== id);
//       }
//       return [...prevSelected, id];
//     });
//   };
//   const handleImageUpload = async (brand) => {
//     const { id, file } = brand; // Destructure the brand to get id and file
//     console.log(id, file)
//     const myImage = file;
//     const data = new FormData();
      
//   // Assuming myCategoryImage is a File object, you can append it directly
//   if (myImage) {
//     data.append('brand_image', myImage)
//   } else {
//     console.error('brand brand_image is not a valid File object');
//   }
//   // setImageUploading(true)
//   try {
//     const action =  await dispatch(updateBrand({ brandId: id, updateData: data }));
//         if (action.meta.requestStatus === 'fulfilled') {
//         // setAlert({ open: true, message: "Product updated successfully!", severity: "success" });
//        console.log( "Brand updated successfully!")
       
//       await dispatch(fetchBrands());

//       }  else if (action.meta.requestStatus === 'rejected') {
//         const errorMessage = action.error.message || "Failed to create brand. Please try again.";
//         console.log(`Error: ${errorMessage}`);
      
//         // Check if the error message includes "409" and show a specific message
//         if (errorMessage.includes('409')) {
//           setAlert({ open: true, message: "Brand with this name already exists. Please choose a different name.", severity: "error" });
//         } else {
//           setAlert({ open: true, message: errorMessage, severity: "error" });
//         }
//       }
//       } catch (error) {
//         console.log( "Failed to create brand. Please try again.")
//         // setAlert({ open: true, message: "Failed to create brand. Please try again.", severity: "error" });
//       } finally {
//         // setImageUploading(false)
//       }
//   };

//   const dataTableBrands = useMemo(
//     () => createDataTableBrands(brands, handleSelect, selectedBrands, handleImageUpload),
//     [brands, selectedBrands]
//   );

//   const handleDelete = () => {
//     const requestBody = { ids: selectedBrands };
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
//         const response = await axios.post("/brands/import-bulk-brands", formData, {
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
//             // await dispatch(fetchBrands()).then((fetchedBrands) => {
//             //   setAllBrands(fetchedBrands || []);
//             //   setDisplayedBrands(fetchedBrands || []);
//             // });
//             await dispatch(fetchBrands());
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
//       sx={{
//         backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
//           `${linearGradient(
//             rgba(gradients.info.main, 0.6),
//             rgba(gradients.info.state, 0.6)
//           )}, url(${bgImage})`,
//         backgroundPositionY: "50%",
//       }}
//     >
//       <DashboardNavbar />
//       <ArgonBox my={3}>
//         <Card>
//           <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
//             <ArgonBox lineHeight={1}>
//               <ArgonTypography variant="h5" fontWeight="medium">
//                 All Brands
//               </ArgonTypography>
//             </ArgonBox>
//             <Stack spacing={1} direction="row">
//               {selectedBrands.length > 0 && (
//                 <ArgonButton variant="gradient" color="error" size="small" onClick={handleDelete}>
//                   Delete
//                 </ArgonButton>
//               )}
//               <Link to="/product_managment/brands/brands-list">
//                 <ArgonButton variant="gradient" color="info" size="small">
//                   See All Products
//                 </ArgonButton>
//               </Link>
//               <Link to="/boycott/create-brand">
//                 <ArgonButton variant="gradient" color="info" size="small">
//                   + New Brand
//                 </ArgonButton>
//               </Link>

//               <ArgonButton variant="gradient" color="info" size="small" component="label">
//   + Import Brands
//   <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileChange} ref={fileInputRef} />
// </ArgonButton>
//             </Stack>
//           </ArgonBox>
//           {uploading && (
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
//           {loading   ? (
//             <LoadingSpinner message="Please wait a moment while we fetch the brands" />
//           ) : brands.length > 0 ? (
//             <DataTable
//               table={dataTableBrands}
//               entriesPerPage={{
//                 defaultValue: 50,
//                 entries: [5, 7, 10, 15, 20, 25],
//               }}
//               canSearch
//             />
//           ) : (
//             <ArgonTypography
//               sx={{
//                 color: '#c1b6b6',
//                 fontWeight: 800,
//                 paddingBottom: '110px',
//                 marginTop: 5,
//               }}
//               variant="body2"
//               fontSize={14}
//               align="center"
//             >
//               No brands found.
//             </ArgonTypography>
//           )}
//         </Card>
//       </ArgonBox>
//     </DashboardLayout>
//   );
// }

// export default Brands;



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
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import FormField from "../components/FormField";

import BrandDetailModel from "./BrandDetailModel";

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
  const { categories } = useSelector(state => state.categories);
  // const [brandOptions, setBrandOptions] = useState([]);
  
  const categoryOptions = categories.map(category => ({
    value: category.name,
    label: category.name,
  }));
  

  
  
  
  const [brands, setBrands] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    fetchBrands(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage]);

  useEffect(() => {
    dispatch(fetchCategories());
    // dispatch(fetchBrands());
   
  }, [dispatch]);
  
  const fetchProductsWithoutLoading = async (page, limit) => {
  const response = await fetch(`https://boy.ranaafaqali.com/api/brands/BrandAll?page=${page}&limit=${limit}`);
  const data = await response.json();
    setBrands(data.brands);
    setTotalPages(data.totalPages);
  };
  

  const fetchBrands = async (page, limit) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`https://boy.ranaafaqali.com/api/brands/BrandAll?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch brands'); // Handle non-200 responses
      }
      const data = await response.json();
      setBrands(data.brands);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false); // End loading
    }
  };
  const handleRowEdit = (brand) => {
    setEditProduct(brand);
    setEditModalOpen(true);
  };
  
  const handleLogoUpload = async (brandId, file) => {
    const formData = new FormData();
    formData.append('brand_image', file);
    await fetch(`https://boy.ranaafaqali.com/api/brands/updateBrandImage?id=${brandId}`, {
      method: 'PUT',
      body: formData,
    });
    fetchProductsWithoutLoading(currentPage, entriesPerPage);
  };
  const handleFileChange = (brandId, event) => {
    const file = event.target.files[0];
    if (file) handleLogoUpload(brandId, file);
  };
  
  const handleFieldUpdate = async (brandId, field, value) => {
  
    await fetch(`https://boy.ranaafaqali.com/api/brands/updateBrand?id=${brandId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
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

    // Debounce the handleFieldUpdate function
    const debouncedHandleFieldUpdate = useMemo(
      () => debounce((productId, field, value) => {
        handleFieldUpdate(productId, field, value);
      }, 500),
      []
    );
  const handleCheckboxChange = (brandId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(brandId)
        ? prevSelected.filter((id) => id !== brandId)
        : [...prevSelected, brandId]
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

  const handleChangeDescription  = ( e)=> {
    const { name, value } = e.target;
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocalImageDelete = (brandId) => {
    setBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === brandId ? { ...brand, brand_image: null } : brand
      )
    );
  };
  
  const handleOpenDetailModal = (brand) => {
    setSelectedBrand(brand);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBrand(null);
  };
  const handleSelectChange = (name, value) => {
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveChanges = async () => {
    const { id, name, category_name, brand_name } = editProduct;
  
    console.log('Updated values:', {
      name,
      category_name,
      brand_name,
    });
  
  
  
  
    await fetch(`https://boy.ranaafaqali.com/api/brands/updateBrand?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category_name, brand_name }),
    });
  
    fetchProductsWithoutLoading(currentPage, entriesPerPage);
    setEditModalOpen(false);
  };
  
  
 
  
  const dataTableData = useMemo(() => ({
    columns: [
      { Header: "", accessor: "checkbox", width: 50 },
      { Header: "Logo", accessor: "image" },
      { Header: "Brand Name", accessor: "brandName" },
  
      { Header: "BgColorInput", accessor: "bgColortext" },

      { Header: "Category", accessor: "category" },

      { Header: "Created", accessor: "created" },
      { Header: "Updated", accessor: "updated" },
      // { Header: "Brand", accessor: "brand" },
      { Header: "BgColor", accessor: "bgColor" },
      { Header: "Products", accessor: "totalProducts" },
      // { Header: "Countries", accessor: "totalCountries" },

      { Header: "Action", accessor: "action" },
    ],
    rows: brands.map((brand) => ({
      checkbox: (
        <Checkbox 
          checked={selectedRows.includes(brand.id)}
          onChange={() => handleCheckboxChange(brand.id)}
        />
      ),
      image:   brand.brand_image ? (
        <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
     
    
      
    }}
  >
    <img
      src={brand.brand_image}
      alt="img"
      style={{ width: '80%', borderRadius: '8px' }}
    />
   <Typography
  variant="body2"
  color="error"
  sx={{ cursor: 'pointer', mt: 0.5, fontSize:9, fontWeight:'bold', textDecoration: 'underline' }} // Optional margin-top and margin-left for spacing
  onClick={() => handleLocalImageDelete(brand.id)}
>
  Remove
</Typography>
  </Box>
      ) : (
        <>
          <StyledButton
            startIcon={<UploadIcon />}
            onClick={() => document.getElementById(`upload-brand_image-${brand.id}`).click()}
          >
            Upload
          </StyledButton>
          <input
            type="file"
            id={`upload-brand_image-${brand.id}`}
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(brand.id, e)}
          />
        </>
      ),
    
      brandName: (
        <TextField
          defaultValue={brand.name}
          variant="standard"
          onBlur={(e) => debouncedHandleFieldUpdate(brand.id, 'name', e.target.value)}
          fullWidth
          sx={{ width:150, fontSize:12 }}
        />
      ),
      bgColortext : (
        <input
        defaultValue={brand.bgColor}
        type="text"
        onBlur={(e) => debouncedHandleFieldUpdate(brand.id, 'bgColor', e.target.value)}
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
      category: brand.category_name,
      // brand: brand.brand_name || "N/A",
      created: (
        <Typography
        sx={{
         
          fontSize: 12,
          fontFamily: 'Arial, sans-serif', // Optional: Add custom font
          fontStyle: 'italic', // Optional: Add font style
        }}
      >
        {(() => {
          const date = new Date(brand.createdAt);
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
          const date = new Date(brand.updatedAt);
          const day = date.toLocaleDateString('en-GB', { weekday: 'long' }); // Get the full day name
          const formattedDate = date.toLocaleDateString('en-GB'); // Format date as dd/mm/yyyy
          return `(${formattedDate}) ${day}`;
        })()}
      </Typography>
      ),
      bgColor: (
        <input
          type="color"
          defaultValue={brand.bgColor}
          onChange={(e) => debouncedHandleFieldUpdate(brand.id, 'bgColor', e.target.value)}
          style={{ width: '80%', height: '30px', border: 'none', cursor: 'pointer' }}
        />
      ),
      totalProducts: (
        <ArgonTypography style={{textAlign: 'center', fontSize: 17}}>
          {brand?.totalProducts}
        </ArgonTypography>
      ),
      // totalCountries: (
      //   <ArgonTypography style={{textAlign: 'center', fontSize: 17}}>
      //     46
      //   </ArgonTypography>
      // ),
      action: (
        // <Tooltip title="Edit">
        //   <StyledIconButton onClick={() => handleRowEdit(brand)}>
        //     <EditIcon style={{color: '#1190EF'}}/>
        //   </StyledIconButton>
        // </Tooltip>

<Box display={"flex"} alignItems={"center"} gap={1}>
<Delete style={{color: 'red', fontSize:15, cursor: 'pointer'}}/>
<VisibilityOutlined style={{color: '#1190EF',fontSize:15, cursor: 'pointer'}}
          onClick={() => handleOpenDetailModal(brand)} // Open modal with category details

/>
<EditIcon style={{color: '#1190EF',fontSize:15, cursor: 'pointer'}} onClick={() => handleRowEdit(brand)}/>

</Box>
      ),
    })),
  }), [brands, selectedRows]);
  
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
        const response = await axios.post('/brands/import-bulk-brands', formData, {
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
      <ArgonBox my={0}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1} display="flex" flexDirection="row" alignItems="center" gap={10}>
              <ArgonTypography variant="h5" fontWeight="bold">
                All Brands
              </ArgonTypography>

              <Box display="flex" flexDirection="row" alignItems="center"  gap={1} >

               <ArgonTypography sx={{fontSize: 14, fontStyle: 'italic', color:'#918c8c'}}>
                   Entries per page
               </ArgonTypography>

                <Select
                label="Select Entries"
                onChange={handleEntriesPerPageChange}
                defaultValue={50}
              

                suffixIcon={<ArrowDropDown />} // Replace with any icon you prefer
              >
                {[ 50, 100, 200].map((option) => (
                  <Option key={option} value={option}   sx={{  fontSize: '4px' }}>
                    {option}
                  </Option>
                ))}
              </Select>
                  </Box>  
            </ArgonBox>
            <Stack spacing={1} direction="row">
              {/* {brands.length > 0 && (
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
  + Import Brands
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
            <LoadingSpinner message="Please wait a moment while we fetch the brands" /> // Render loading spinner with message when data is loading
          ) : (
           brands?.length > 0 ? (

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
                    <Typography variant="h6" gutterBottom style={{marginBottom: 10, fontWeight: 'bold'}}>Edit Brand</Typography>
              
              
              
              <FormField
                            type="text"
                            label="Brand Name"
                            placeholder="eg. Mac Book"
                            name="name"
                            value={editProduct?.name || ''}
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
                   <Box  style={{  marginTop: 3 }}>

<FormField
             type="text"
             label="description"
             placeholder="Enter a description "
             name="brand_description"
             value={editProduct?.brand_description}
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
              
              {/* <ArgonBox mb={2}>
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
              </ArgonBox> */}
              
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
               
              </Box>
                  </Paper>
                        )
                        : (         
                          
                          <ArgonTypography sx={{    color: '#c1b6b6',fontWeight: 800, paddingBottom: '110px', marginTop: 5}} variant="body2" fontSize={14} align="center">
                             No brands found.
                           </ArgonTypography>
                         )
                        
          )} 


 
 

        </Card>
      </ArgonBox>
      <BrandDetailModel
        open={isDetailModalOpen} 
        onClose={handleCloseDetailModal} 
        category={selectedBrand} 
      />
    </DashboardLayout>
  );
}

export default CategoriesList;





