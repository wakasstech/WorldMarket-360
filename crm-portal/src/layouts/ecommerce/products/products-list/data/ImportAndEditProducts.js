import React, { useState, useEffect, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TextField, Button, IconButton, Pagination,
  Modal, Typography, Box, Avatar, Tooltip, Paper,
  PaginationItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { Select } from 'antd';
import { ArrowBackIos, ArrowDropDown, ArrowForwardIos } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ArgonTypography from 'components/ArgonTypography';
import ArgonBox from 'components/ArgonBox';
import ArgonSelect from 'components/ArgonSelect';
import CloseIcon from '@mui/icons-material/Close';
import FormField from 'layouts/Categories/new-product/components/FormField';

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

const ProductTable = () => {


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

  useEffect(() => {
    fetchProducts(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage]);

  const fetchProducts = async (page, limit) => {
const response = await fetch(`https://boy.ranaafaqali.com/api/products/getAllProducts?page=${page}&limit=${limit}`);
const data = await response.json();
    setProducts(data.result);
    setTotalPages(data.totalPages);
  };

  const handleRowEdit = (product) => {
    setEditProduct(product);
    setEditModalOpen(true);
  };

  const handleLogoUpload = async (productId, file) => {
    const formData = new FormData();
    formData.append('logo', file);
    await fetch(`https://boy.ranaafaqali.com/api/products/updateProductLogo?id=${productId}`, {
      method: 'PUT',
      body: formData,
    });
    fetchProducts(currentPage, entriesPerPage);
  };
  const handleFileChange = (productId, event) => {
    const file = event.target.files[0];
    if (file) handleLogoUpload(productId, file);
  };

  const handleFieldUpdate = async (productId, field, value) => {
 
    await fetch(`https://boy.ranaafaqali.com/api/products/updatePDetails?id=${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });
    fetchProducts(currentPage, entriesPerPage);
  };

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

  const handleSelectChange = (name, value) => {
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    const { id, product_name, category_name, brand_name } = editProduct;

    console.log('Updated values:', {
      product_name,
      category_name,
      brand_name,
    });

  


    await fetch(`https://boy.ranaafaqali.com/api/products/updatePDetails?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_name, category_name, brand_name }),
    });

     fetchProducts(currentPage, entriesPerPage);
    setEditModalOpen(false);
  };

 


  const dataTableData = useMemo(() => ({
    columns: [
      { Header: "", accessor: "checkbox", width: 50 },
      { Header: "Logo", accessor: "logo" },
      { Header: "Product Name", accessor: "productName" },
      { Header: "Category", accessor: "category" },
      { Header: "Brand", accessor: "brand" },
      { Header: "BgColor", accessor: "bgColor" },
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
        <img src={product?.logo} alt={"img"} style={{ width: '30%', borderRadius: '8px' }} />
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
        <TextField
          defaultValue={product.product_name}
          variant="standard"
          onBlur={(e) => handleFieldUpdate(product.id, 'product_name', e.target.value)}
          fullWidth
          sx={{ input: { fontSize: '14px', color: 'text.primary' } }}
        />
      ),
      category: product.category_name,
      brand: product.brand_name || "N/A",
      bgColor: (
        <input
          type="color"
          defaultValue={product.bgColor}
          onChange={(e) => handleFieldUpdate(product.id, 'bgColor', e.target.value)}
          style={{ width: '80%', height: '30px', border: 'none', cursor: 'pointer' }}
        />
      ),
      action: (
        <Tooltip title="Edit">
          <StyledIconButton onClick={() => handleRowEdit(product)}>
            <EditIcon style={{color: '#1190EF'}}/>
          </StyledIconButton>
        </Tooltip>
      ),
    })),
  }), [products, selectedRows]);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: 'background.default' }}>
      {/* <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        Products Table
      </Typography> */}
    
 
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
/>
  {/* <Typography variant="h6" sx={{ mx: 2, alignSelf: 'center' }}>
    &lt; {currentPage} &gt;
  </Typography> */}
</Box>
    





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
    </Paper>
  );
};

export default ProductTable;
