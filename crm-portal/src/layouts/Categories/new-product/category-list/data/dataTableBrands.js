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
// import ProductCell from "layouts/ecommerce/products/products-list/components/ProductCell";
import { Button, Checkbox, IconButton } from "@mui/material";
import BrandCell from "../components/BrandCell";
import { UploadFile } from "@mui/icons-material";


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


const createDataTableData = (brands, handleSelect, selectedBrands, handleImageUpload) =>   {
    console.log(brands , 'in table brandsss')
 
    
    return ({
  columns: [
    { Header: "", accessor: "checkbox", width: 50 },
    { Header: "Brand Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    { Header: "Image", accessor: "image" },
    { Header: "Created At", accessor: "createdAt" },
    { Header: "Updated At", accessor: "updatedAt" },
    { Header: "Action", accessor: "action" },
  ],
  rows:   Array.isArray(brands) ? brands.map((brand) => ({
        checkbox: (
          <Checkbox
            sx={{ border: "2px solid #d2d6da" }}
            checked={selectedBrands.includes(brand.id)}
            onChange={() => handleSelect(brand.id)}
          />
        ),
        name: brand.name,
        description: brand.brand_description,
        // image: (
        //   <img
        //     src={brand.brand_image || "https://via.placeholder.com/150"}
        //     alt={brand.name}
        //     style={{ width: "50px", height: "50px" }}
        //   />
        // ),


        image: brand.brand_image ? (
          <img
            src={brand.brand_image || "https://via.placeholder.com/150"}
            alt={brand.name}
            style={{ width: "50px", height: "50px", resizeMode: 'contain' }}
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
                  handleImageUpload({ ...brand, file });
                }
              }}
            />
            <UploadFile />
          </IconButton>
        ),


        createdAt: new Date(brand.createdAt).toLocaleDateString(),
        updatedAt: new Date(brand.updatedAt).toLocaleDateString(),
        action: <BrandCell brand={brand} />, // Ensure ActionCell component handles brand data
      }))
    : [],
});
  }
export default createDataTableData;
