/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable react/prop-types */
// Argon Dashboard 2 PRO MUI components
import ArgonBadge from "components/ArgonBadge";

// ProductsList page components
import ProductCell from "layouts/ecommerce/products/products-list/components/ProductCell";
import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";
import { Box, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import { AddBoxOutlined, AddToPhotos, BorderColorOutlined, Description, FlagCircle, InfoOutlined, PostAdd, UploadFile, UploadFileOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";





// const handleImageUpload =(props) => {
// console.log(props)
// }

const createDataTableData = (products, handleSelect, selectedCategories, handleImageUpload) => ({
  columns: [
    { Header: "", accessor: "checkbox", width: 50 },
    { Header: "product", accessor: "product" },
    { Header: "createdAt", accessor: "createdAt" },

    { Header: "category", accessor: "category" },


    { Header: "brand", accessor: "brand" },
    { Header: "logo", accessor: "logo" },
    { Header: "status", accessor: "status" },

    {
      Header: "countries",
      accessor: "countries"
    },

        { Header: "about", accessor: "about" },
        { Header: "reference", accessor: "reference" },
    { Header: "updatedAt", accessor: "updatedAt" },
    { Header: "action", accessor: "action" },
  ],
  rows: products.length > 0
    ? products.map((product) => ({
        checkbox: (
          <Checkbox sx={{border: '2px solid #d2d6da'}}
            checked={selectedCategories.includes(product.id)}
            onChange={() => handleSelect(product.id)}
          />
        ),
        product: (
          <Box display="flex" alignItems="center">
          
            <Typography
              sx={{
                fontSize: 14,
                // fontFamily: 'Arial, sans-serif',
                // fontStyle: 'italic',
                // textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                // color: '#333',
                fontWeight: 500,
                 marginRight: 0.5
              }}
              variant="body2"
            >
              {product.product_name} 
            </Typography>
            <sup>
            <span style={{ fontSize: '16px', lineHeight: 0 }}>
                {product.imported ? (
                  <UploadFileOutlined style={{ color: 'orangered',  marginRight: 1 }} />
                ) : (
                  <AddToPhotos style={{ color: 'green',marginRight: 1 }} />
                )}
              </span>
            </sup>
          </Box>
        ),
        createdAt: (
          <Typography
            sx={{
              color: '#87837d',
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
       
       
         category: product.category_name,
        brand: product.brand_name,
        // description: product.category_description,
        logo: (product.logo || product.logo === 1 )? (
          <img
            src={product.logo}
            alt={product.product_name}
            style={{ width: "50px", height: "50px" }}
          />
        ) : (
          <IconButton color="primary" component="label">
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleImageUpload({ ...product, file });
                }
              }}
            />
            <UploadFile />
          </IconButton>
        ),
        
        status: product?.status,

        countries :  <Tooltip title="View product details">
          <Link to={`/product_managment/products/product-info/${product.id}`}>
          <IconButton
          // onClick={() => navigate(`/product_managment/products/product-info/${}`)}
          size="medium"
        >
          <FlagCircle  /> <p style={{fontSize: 12, textDecoration: 'underline', fontStyle: 'italic'}}>Click here</p>
        </IconButton>
          </Link>
      
      </Tooltip>,
        about:  product?.reason?.length > 25 ? `${product.reason.slice(0, 25)}...` : product.reason,
        reference: product?.reference ? (
          <a href={product.reference} target="_blank" rel="noopener noreferrer">
            {product.reference.length > 25 ? `${product.reference.slice(0, 25)}...` : product.reference}
          </a>
        ) : (
          ""
        ),
      
        updatedAt: new Date(product.updatedAt).toLocaleDateString(),
        action: <ActionCell product={product} />,
      }))
    : [],
});

export default createDataTableData;
