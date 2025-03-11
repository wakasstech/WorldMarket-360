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
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { BorderColorOutlined, Description, UploadFile } from "@mui/icons-material";

// Images
const adidasHoodie =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/adidas-hoodie.jpg";
const macBookPro =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/macbook-pro.jpg";
const metroChair =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/metro-chair.jpg";
const alchimiaChair =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/alchimia-chair.jpg";
const fendiCoat =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/fendi-coat.jpg";
const offWhiteJacket =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/off-white-jacket.jpg";
const yohjiYamamoto =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yohji-yamamoto.jpg";
const mcqueenShirt =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/mcqueen-shirt.jpg";
const yellowChair =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yellow-chair.jpg";
const heronTshirt =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/heron-tshirt.jpg";
const livingChair =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/living-chair.jpg";
const orangeSofa =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/orange-sofa.jpg";
const burberry =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/burberry.jpg";
const dgSkirt =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/d&g-skirt.jpg";
const undercover =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/undercover.jpg";

// Badges
const outOfStock = (
  <ArgonBadge variant="contained" color="error" size="xs" badgeContent="out of stock" container />
);
const inStock = (
  <ArgonBadge variant="contained" color="success" size="xs" badgeContent="in stock" container />
);
const createDataTableData = (products, handleSelect, selectedCategories, handleImageUpload) => ({
  columns: [
    { Header: "", accessor: "checkbox", width: 50 },
    { Header: "product", accessor: "product" },
    { Header: "review", accessor: "review" },
    { Header: "createdAt", accessor: "createdAt" },
    { Header: "category", accessor: "category" },
    { Header: "brand", accessor: "brand" },
    { Header: "logo", accessor: "logo" },
    { Header: "status", accessor: "status" },
    { Header: "about", accessor: "about" },
    { Header: "reference", accessor: "reference" },
    { Header: "updatedAt", accessor: "updatedAt" },
    { Header: "action", accessor: "action" },
  ],
  rows: products.length > 0
    ? products
        .filter(product => product.imported) // Filter products where imported is true
        .map((product) => ({
          checkbox: (
            <Checkbox sx={{ border: '2px solid #d2d6da' }}
              checked={selectedCategories.includes(product.id)}
              onChange={() => handleSelect(product.id)}
            />
          ),
          product: product.product_name,
          review: product.imported 
          ? (
            <Box display="flex" alignItems="center">
              <Description style={{ color: 'green', fontSize: 30, marginRight: 1 }} />
              <Typography sx={{
      fontSize: 12,
      fontFamily: 'Arial, sans-serif', // Replace with your preferred font family
      fontStyle: 'italic', // Use 'normal' for regular text
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', // Adds shading effect
      color: '#333' // Adjust text color if needed
    }} variant="body2">Imported</Typography>
            </Box>
          ) 
          : (
            <Box display="flex" alignItems="center">
              <BorderColorOutlined style={{ color: '#dce1dc', fontSize: 30, marginRight: 1 }}  />
              <Typography sx={{
      fontSize: 12,
      fontFamily: 'Arial, sans-serif', // Replace with your preferred font family
      fontStyle: 'italic', // Use 'normal' for regular text
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', // Adds shading effect
      color: '#333' // Adjust text color if needed
    }}  variant="body2">Created</Typography>
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
          logo: product.logo ? (
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
          about: product?.reason?.length > 25 ? `${product.reason.slice(0, 25)}...` : product.reason,
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

