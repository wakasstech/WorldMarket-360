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

// /* eslint-disable react/prop-types */
// // Argon Dashboard 2 PRO MUI components
// import ArgonBadge from "components/ArgonBadge";

// // brandsList page components
// import ProductCell from "layouts/ecommerce/brands/brands-list/components/ProductCell";
// import ActionCell from "layouts/ecommerce/brands/brands-list/components/ActionCell";

// // Images
// const adidasHoodie =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/adidas-hoodie.jpg";
// const macBookPro =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/macbook-pro.jpg";
// const metroChair =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/metro-chair.jpg";
// const alchimiaChair =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/alchimia-chair.jpg";
// const fendiCoat =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/fendi-coat.jpg";
// const offWhiteJacket =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/off-white-jacket.jpg";
// const yohjiYamamoto =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yohji-yamamoto.jpg";
// const mcqueenShirt =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/mcqueen-shirt.jpg";
// const yellowChair =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yellow-chair.jpg";
// const heronTshirt =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/heron-tshirt.jpg";
// const livingChair =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/living-chair.jpg";
// const orangeSofa =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/orange-sofa.jpg";
// const burberry =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/burberry.jpg";
// const dgSkirt =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/d&g-skirt.jpg";
// const undercover =
//   "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/undercover.jpg";

// // Badges
// const outOfStock = (
//   <ArgonBadge variant="contained" color="error" size="xs" badgeContent="out of stock" container />
// );
// const inStock = (
//   <ArgonBadge variant="contained" color="success" size="xs" badgeContent="in stock" container />
// );

// const dataTableData = {
//   columns: [
//     // {
//     //   Header: "product",
//     //   accessor: "product",
//     //   width: "40%",
//     //   Cell: ({ value: [name, data] }) => (
//     //     <ProductCell image={data.image} name={name} checked={data.checked} />
//     //   ),
//     // },
//     { Header: "category", accessor: "category" },
//     { Header: "description", accessor: "description" },

//     // { Header: "price", accessor: "price" },
//     // { Header: "sku", accessor: "sku" },
//     // { Header: "quantity", accessor: "quantity" },
//     // {
//     //   Header: "status",
//     //   accessor: "status",
//     //   Cell: ({ value }) => (value === "in stock" ? inStock : outOfStock),
//     // },
//     { Header: "action", accessor: "action" },
//   ],

//   rows: [
//     {
//       category: "Clothing",
//       description: "A wide range of clothing items.",
//       action: <ActionCell />,
//     },
//     {
//       category: "Electronics",
//       description: "Latest electronic gadgets and accessories.",
//       action: <ActionCell />,
//     },
//     // {
//     //   product: ["BKLGO Full Zip Hoodie", { image: adidasHoodie, checked: true }],
//     //   category: "Cloting",
//     //   price: "$1,321",
//     //   sku: 243598234,
//     //   quantity: 0,
//     //   status: "out of stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["MacBook Pro", { image: macBookPro, checked: true }],
//     //   category: "Electronics",
//     //   price: "$1,869",
//     //   sku: 877712,
//     //   quantity: 0,
//     //   status: "out of stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Metro Bar Stool", { image: metroChair, checked: false }],
//     //   category: "Furniture",
//     //   price: "$99",
//     //   sku: "0134729",
//     //   quantity: 978,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Alchimia Chair", { image: alchimiaChair, checked: false }],
//     //   category: "Furniture",
//     //   price: "$2,999",
//     //   sku: 113213,
//     //   quantity: 0,
//     //   status: "out of stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Fendi Gradient Coat", { image: fendiCoat, checked: false }],
//     //   category: "Clothing",
//     //   price: "$869",
//     //   sku: 634729,
//     //   quantity: 725,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Off White Cotton Bomber", { image: offWhiteJacket, checked: false }],
//     //   category: "Clothing",
//     //   price: "$1,869",
//     //   sku: 634729,
//     //   quantity: 725,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Y-3 Yohji Yamamoto", { image: yohjiYamamoto, checked: true }],
//     //   category: "Shoes",
//     //   price: "$869",
//     //   sku: 634729,
//     //   quantity: 725,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Alexander McQueen", { image: mcqueenShirt, checked: true }],
//     //   category: "Clothing",
//     //   price: "$1,199",
//     //   sku: "00121399",
//     //   quantity: 51293,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Luin Floor Lamp", { image: yellowChair, checked: true }],
//     //   category: "Furniture",
//     //   price: "$1,900",
//     //   sku: 434729,
//     //   quantity: 34,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Heron Preston T-shirt", { image: heronTshirt, checked: false }],
//     //   category: "Clothing",
//     //   price: "$149",
//     //   sku: 928341,
//     //   quantity: 0,
//     //   status: "out of stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Gray Living Chair", { image: livingChair, checked: true }],
//     //   category: "Furniture",
//     //   price: "$2,099",
//     //   sku: 9912834,
//     //   quantity: 32,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Derbyshire Orange Sofa", { image: orangeSofa, checked: false }],
//     //   category: "Furniture",
//     //   price: "$2,999",
//     //   sku: 561151,
//     //   quantity: 22,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Burberry Low-Tops", { image: burberry, checked: true }],
//     //   category: "Shoes",
//     //   price: "$869",
//     //   sku: 634729,
//     //   quantity: 725,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Dolce & Gabbana Skirt", { image: dgSkirt, checked: false }],
//     //   category: "Designer",
//     //   price: "$999",
//     //   sku: "01827391",
//     //   quantity: 0,
//     //   status: "out of stock",
//     //   action: <ActionCell />,
//     // },
//     // {
//     //   product: ["Undercover T-shirt", { image: undercover, checked: true }],
//     //   category: "Shoes",
//     //   price: "$869",
//     //   sku: 63472,
//     //   quantity: 725,
//     //   status: "in stock",
//     //   action: <ActionCell />,
//     // },
//   ],
// };

// export default dataTableData;

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

// brandsList page components
// import ProductCell from "layouts/ecommerce/brands/brands-list/components/ProductCell";
import ActionCell from "../components/ActionCell";
import SeeAllButton from "../components/ActionCell/SeeAllButton";

import { Button, Checkbox, IconButton } from "@mui/material";
import { Category } from "@mui/icons-material";


const myCategories = [
  {
         "id": 4,
         "name": "electronics4",
         "category_description": "this   isin categroy of  electronics4",
         "category_image": "http://res.cloudinary.com/dqcimdgce/image/upload/v1722076527/v5ew68vh1nkbgxkd6edr.png",
         "createdAt": "2024-07-27T10:35:25.000Z",
         "updatedAt": "2024-07-27T10:35:25.000Z"
     },
     {
         "id": 5,
         "name": "electronics5",
         "category_description": "this   isin categroy of  electronics5",
         "category_image": "http://res.cloudinary.com/dqcimdgce/image/upload/v1722248355/khhtyqlckxrcvh2tm217.png",
         "createdAt": "2024-07-29T10:19:12.000Z",
         "updatedAt": "2024-07-29T10:19:12.000Z"
     },
     {
         "id": 6,
         "name": "undefined",
         "category_description": "undefined",
         "category_image": null,
         "createdAt": "2024-07-29T11:14:38.000Z",
         "updatedAt": "2024-07-29T11:14:38.000Z"
     }
 ];

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





const createDataTableData = (categories,handleSelect, selectedCategories) => ({
  columns: [
    { Header: "", accessor: "checkbox", width: 50 },

    { Header: "category", accessor: "category" },
    { Header: "description", accessor: "description" },
    { Header: "image", accessor: "image" },
    { Header: "bgColor", accessor: "bgColor" },

    { Header: "createdAt", accessor: "createdAt" },
    { Header: "updatedAt", accessor: "updatedAt" },
    // { Header: "action", accessor: "action" },
    // { Header: "brands", accessor: "brands" },
  ],
  rows: categories? categories.map((category) => ({
    checkbox: (
      <Checkbox
        sx={{ border: "2px solid #d2d6da" }}
        checked={selectedCategories.includes(category.id)}
        onChange={() => handleSelect(category.id)}
      />
    ),
    category: category.name,
    description: category.category_description,
    image: category.category_image ? (
      <img
        src={category.category_image || "https://via.placeholder.com/150"}
        alt={category.name}
        style={{ width: "50px", height: "50px" }}
      />
    ) : (
      <IconButton color="primary" component="label">
        {/* <input
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              handleImageUpload({ ...brand, file });
            }
          }}
        /> */}
        <Category />
      </IconButton>
    ),
    bgColor: (
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: category.bgColor,
          display: "inline-block",
        }}
      ></div>
    ),
    createdAt: new Date(category.createdAt).toLocaleDateString(),
    updatedAt: new Date(category.updatedAt).toLocaleDateString(),
    // action: <ActionCell category={category}/>,
    // brands: <SeeAllButton />,
  })) : [],
});

export default createDataTableData;
