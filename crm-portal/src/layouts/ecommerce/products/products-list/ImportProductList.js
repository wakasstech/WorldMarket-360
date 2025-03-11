import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Button, Checkbox, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "../../../../axios/axios"
// Argon Dashboard 2 PRO MUI components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import createTableData from "./data/dataTableExcel";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { fetchProducts } from "globalStore/Slices/productSlice";
import Swal from "sweetalert2";
import ArgonProgress from "components/ArgonProgress";
import { fetchBrands } from "globalStore/Slices/categoriesSlice";
import LoadingSpinner from "layouts/Categories/new-product/components/LoadingSpinner/LoadingSpinner";





function ImportProductList() {
  const dispatch = useDispatch();
  const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

  const { products, loading } = useSelector((state) => state.products);
  const { brands, categories } = useSelector((state) => state.categories);




  const [reloadCount, setReloadCount] = useState(0);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [shouldReload, setShouldReload] = useState(false);
  const [progress, setProgress] = useState(0); // State for progress
  const [uploading, setUploading] = useState(false); // State for upload status
  const fileInputRef = useRef(null); // Add ref for file input

  const [brandAnchorEl, setBrandAnchorEl] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({ id: null, name: "All Categories" });
  
  // useEffect(() => {
  //   if (!products || products.length === 0) {
  //     dispatch(fetchProducts());
  //   }
  // }, [dispatch, products]);

  useEffect(() => {
    if (!products.length || !categories.length || !brands.length) {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchBrands());
    }
  }, [dispatch,  products.length, categories.length, brands.length]);

 



  useEffect(() => {
    if (reloadCount > 0) {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchBrands());
    }
  }, [dispatch, reloadCount]);

  const handleSelect = (id) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((productId) => productId !== id);
      }
      return [...prevSelected, id];
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion
        const requestBody = {
          ids: selectedProducts
        };

        fetch('https://boy.ranaafaqali.com/api/products/deleteproducts', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
          Swal.fire({
            title: "Deleted!",
            text: data.message,
            icon: "success"
          });

          setReloadCount(reloadCount + 1); // This will trigger a refetch in useEffect
          setSelectedProducts([]);
        })
        .catch(error => {
          console.error('Error deleting products:', error);
        });
      }
    });
  };


  const handleStatusUpdate = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleBrandClick = (event) => {
    setBrandAnchorEl(event.currentTarget);
  };

  const handleBrandChange = (event) => {
    const brand = event.target.getAttribute('value');
    setSelectedBrand(brand);
    setBrandAnchorEl(null);
  };

  const handleCategoryClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.getAttribute('value');
  const categoryName = categories.find(cat => cat.id.toString() === categoryId)?.name || "All Categories";
  setSelectedCategory({ id: categoryId, name: categoryName });
  setCategoryAnchorEl(null);
  };

  const handleClearFilters = () => {
    setSelectedBrand("All Brands");
 
    setSelectedCategory({ id: null, name: "All Categories" });
     setReloadCount(reloadCount + 1); // Increment to trigger re-fetch if necessary
  };
  

  const handleStatusChange = (event) => {
    const newStatus = event.target.getAttribute('value');
    setStatus(newStatus);
    if (selectedProducts.length === 0) {
      return; // No products selected
    }
    console.log("Status:", newStatus, "Product IDs:", selectedProducts);
    // Prepare the request body
      const requestBody = {
        ids: selectedProducts,
        status: newStatus
      };

  // Make the API call
  fetch('https://boy.ranaafaqali.com/api/products/updateStatuses', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);

    setReloadCount(reloadCount + 1); // This will trigger a refetch in useEffect
    setSelectedProducts([]);
  })
  .catch(error => {
    console.error('Error updating product statuses:', error);
  });




    
  };

  const handleImageUpload = (product) => {
    console.log("Product info for image upload:", product);
    // Add your image upload logic here
  };

  // const handleFileChange = async (event) => {
  //   console.log('File input triggered');
     
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  
  //     setUploading(true);
  //     setProgress(0); // Reset progress before starting upload
  
  //     try {
  //       let response = await axios.post('/products/import-excel', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           if (progressEvent.total) {
  //             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //             setProgress(percentCompleted);
  //           }
  //         },
  //       });

  //       if(response.status == 200){
  //         Swal.fire({
  //           title: "Success!",
  //           text: "Excel sheet Successfully Imported!",
  //           icon: "success"
  //         }).then(() => {
  //           setReloadCount(reloadCount + 1); // This will trigger a refetch in useEffect
  //           setSelectedProducts([]);
  //         });
  //       } 

  //   } catch (error) {
  //       console.error('Error uploading file:', error);
  //     } finally {
  //       setUploading(false);
  //       setProgress(0); // Reset progress after upload is complete
  //       fileInputRef.current.value = ''; // Reset the file input
  //     }
  //   }
  // };


  const handleFileChange = async (event) => {
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
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedBrand !== "All Brands") {
      filtered = filtered.filter(product => product.brand_name === selectedBrand);
    }

    if (selectedCategory.name !== "All Categories") {
      filtered = filtered.filter(product => product.category_id === selectedCategory.id);
    }

    return filtered;
  }, [products, selectedBrand, selectedCategory]);

  const dataTableData = useMemo(
    () => createTableData(filteredProducts, handleSelect, selectedProducts),
    [filteredProducts, selectedProducts]
  );
  const importedProducts = products?.filter(product => product.imported) || [];
  console.log(importedProducts)
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
              <ArgonTypography variant="h5" fontWeight="medium">
                All Products
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              {selectedProducts.length > 0 && (
                <>
                  <ArgonButton variant="gradient" color="error" size="small"  onClick={handleDelete}>
                  Delete
                  </ArgonButton>
                  <ArgonButton variant="gradient" color="info" size="small"  onClick={handleStatusUpdate}>                   
                  Update Status ▼
                  </ArgonButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={handleStatusChange} value="in_boycott">
                      in_boycott
                    </MenuItem>
                    <MenuItem onClick={handleStatusChange} value="questionable">
                      questionable
                    </MenuItem>
                  </Menu>
                </>
              )}
              {/* <Link to="/boycott/create-product"> */}
              <Link to="/product_managment/products/products-list">
                <ArgonButton variant="gradient" color="info" size="small">
                  See All Products
                </ArgonButton>
              </Link>
              <ArgonButton variant="gradient" color="info" size="small" component="label">
  + Import Products
  <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileChange} ref={fileInputRef} />
</ArgonButton>
              {/* </Link> */}
            </Stack>
          </ArgonBox>


          <ArgonBox display="flex" flexDirection="column" alignItems="flex-start" sx={{padding: '30px 24px'}}>
            <ArgonBox display="flex" alignItems="center" mb={1}>
              <ArgonBox lineHeight={1} mr={2}>

            
              <ArgonTypography variant="h5" fontWeight="medium" sx={{ color: '#748093', marginBottom: 1.5, fontSize: 18 }}>
        Filters{' '}
        <span style={{ color: 'lightgray', fontSize: '0.875rem' }}>
          (Choose a Brand or Category to Filter) 
        </span>
      </ArgonTypography>
           

                <ArgonButton variant="gradient" color="success" size="small" onClick={handleBrandClick}>
                  {selectedBrand} ▼
                </ArgonButton>
                <Menu anchorEl={brandAnchorEl} open={Boolean(brandAnchorEl)} onClose={() => setBrandAnchorEl(null)}>
                  <MenuItem onClick={handleBrandChange} value="All Brands">
                    All Brands
                  </MenuItem>
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} onClick={handleBrandChange} value={brand.name}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Menu>

                <ArgonButton sx={{   marginLeft: {
                    xs: '0px', // Flex direction column for extra-small screens
                    md: '10px',    // Flex direction row for medium screens and up
                    lg: '10px'     // Flex direction row for large screens and up
                  },
                  marginTop: {
                    xs: '10px', // Flex direction column for extra-small screens
                    md: '0px',    // Flex direction row for medium screens and up
                    lg: '0px'     // Flex direction row for large screens and up
                  }, }} variant="gradient" color="info" size="small" onClick={handleCategoryClick}>
                  {selectedCategory.name} ▼
                </ArgonButton>
                <Menu anchorEl={categoryAnchorEl} open={Boolean(categoryAnchorEl)} onClose={() => setCategoryAnchorEl(null)}>
                  <MenuItem onClick={handleCategoryChange} value="">
                    All Categories
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} onClick={handleCategoryChange} value={category.id.toString()}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Menu>
                <ArgonButton sx={{ marginLeft: {
                    xs: '0px', // Flex direction column for extra-small screens
                    md: '10px',    // Flex direction row for medium screens and up
                    lg: '10px'     // Flex direction row for large screens and up
                  } }} variant="outlined" color="error" size="small" onClick={handleClearFilters}>
              Clear Filters
            </ArgonButton>
              </ArgonBox>
            </ArgonBox>
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
          {products?.length > 0 ? (
          <DataTable
            table={dataTableData}
            entriesPerPage={{
              defaultValue: 7,
              entries: [5, 7, 10, 15, 20, 25],
            }}
            canSearch
          />
          ) : (
                        <LoadingSpinner message="Please wait a moment while we fetch the brands" /> // Render loading spinner with message when data is loading

          )
          }
        {importedProducts.length === 0 && (
          <ArgonTypography sx={{    color: '#c1b6b6',fontWeight: 800, paddingBottom: '110px', marginTop: 5}} variant="body2" fontSize={14} align="center">
          No products found.
        </ArgonTypography> )}
          
          {/* {loading ? (
            <LoadingSpinner message="Please wait a moment while we fetch the brands" /> // Render loading spinner with message when data is loading
          ) : products?.length > 0 ? (
            <DataTable
            table={dataTableData}
            entriesPerPage={{
              defaultValue: 7,
              entries: [5, 7, 10, 15, 20, 25],
            }}
            canSearch
          />
          ) : (          
           <ArgonTypography sx={{    color: '#c1b6b6',fontWeight: 800, paddingBottom: '110px', marginTop: 5}} variant="body2" fontSize={14} align="center">
              No products found.
            </ArgonTypography>
          )} */}
        </Card>
      </ArgonBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default ImportProductList;