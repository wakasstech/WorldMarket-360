// import React, { useState, useEffect } from "react";
// import { Select, Space, Tag, Button, message, Input } from "antd";
// import { useDispatch } from "react-redux";
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// import PropTypes from "prop-types";
// import ArgonBox from "components/ArgonBox";
// import ArgonButton from "components/ArgonButton";
// import { CircularProgress, TextField } from "@mui/material";
// import ArgonTypography from "components/ArgonTypography";
// import axios from "../../../../../axios/axios"
// import Swal from "sweetalert2"; 

// import { useNavigate } from "react-router-dom";

// const fetchCountries = async () => {
//   const response = await fetch("https://boy.ranaafaqali.com/api/area/getAll-country");
//   return await response.json();
// };

// const fetchCategories = async () => {
//   const response = await fetch("https://boy.ranaafaqali.com/api/categories/CategoryAll");
//   return await response.json();
// };

// const fetchBrands = async () => {
//   const response = await fetch("https://boy.ranaafaqali.com/api/brands/BrandAll");
//   return await response.json();
// };

// const fetchProducts = async () => {
//   const response = await fetch("https://boy.ranaafaqali.com/api/products/getAllProducts");
//   return await response.json();
// };
// const categories = [
//   {
//     label: 'Beauty & Personal Care',
//     value: 3,
//     flag: 'http://res.cloudinary.com/ddjqflks0/image/upload/v1728302062/Bycottapp/Category/categoryLogos/2024-10-07/t30qhvjl7u1atnsr5imc.png',
//   },
//   {
//     label: 'Household & Cleaning Products',
//     value: 1,
//     flag: 'http://res.cloudinary.com/ddjqflks0/image/upload/v1728301642/Bycottapp/Category/categoryLogos/2024-10-07/mgfhrvbkijoc9gqunswq.png',
//   },
// ];

// function Featured() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate()


//   const [loading, setLoading] = useState(true); // Loader starts as true
//   const [submitLoading, setSubmitLoading] = useState(false); // Loader starts as true

//   const [selectedCountries, setSelectedCountries] = useState([]);
//   const [selectedCategories, setSelectedCategories] =  useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);

//   const [countryOptions, setCountryOptions] = useState([]);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [brandOptions, setBrandOptions] = useState([]);
//   const [productOptions, setProductOptions] = useState([]);
//   const [featureFieldValue, setFeatureFieldValue] = useState('');


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Set loading to true before the requests
//         setLoading(true);

//         // Fetch all data concurrently
//         const [countries, categories, brands, products] = await Promise.all([
//           fetchCountries(),
//           fetchCategories(),
//           fetchBrands(),
//           fetchProducts(),
//         ]);
       

//         // After all data is fetched, set the options
//         setCountryOptions(formatCountries(countries));
//         setCategoryOptions(formatCategories(categories));
//         setBrandOptions(formatBrands(brands));
//         setProductOptions(formatProducts(products));
//       } catch (error) {
//         message.error("Error fetching data");
//         console.error("Error:", error);
//       } finally {
//         // Hide loader after all API calls are done
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     setFeatureFieldValue(event.target.value);
//   };

//   const formatCountries = (countries) => {
//     const flatCountries = Object.values(countries).flat();
//     return flatCountries.map((country) => ({
//       label: country?.country_name,
//       value: country?.id,
//       flag: country?.country_flag,
//     }));
//   };

//   const formatCategories = (categories) =>
//     categories.map((cat) => ({
//       label: cat?.name,
//       value: cat?.id,
//       flag: cat?.category_image,
//     }));

//   const formatBrands = (brandsData) =>
//     brandsData.brands.map((brand) => ({
//       label: brand?.name,
//       value: brand?.id,
//       flag: brand?.brand_image,
//     }));

//   const formatProducts = (productsData) =>
//     productsData.result.map((product) => ({
//       label: product?.product_name,
//       value: product?.id,
//       flag: product?.logo,
//     }));

//     const handleSubmit =async () => {
//       const selectedCountryIDs = selectedCountries.map(country => country.value);
//       console.log("Selected Country IDs:", selectedCountryIDs);

//       const selectedCountryObjects = selectedCountryIDs.map(countryValue => {
//         const foundCountry = countryOptions.find(option => option.value === countryValue);
        
//         if (!foundCountry) {
//           console.warn(`Country not found for value: ${countryValue}`);
//         }
        
//         return foundCountry;
//       });
    
//       const selectedCategoryObjects = selectedCategories.map(categoryValue =>
//         categoryOptions.find(option => option.value === categoryValue)
//       );
    
//       const selectedBrandObjects = selectedBrands.map(brandValue =>
//         brandOptions.find(option => option.value === brandValue)
//       );
    
//       const selectedProductObjects = selectedProducts.map(productValue =>
//         productOptions.find(option => option.value === productValue)
//       );
    
//       const payload = {
//         feature_title : featureFieldValue,
//         countries: selectedCountryObjects,
//         categories: selectedCategoryObjects,
//         brands: selectedBrandObjects,
//         products: selectedProductObjects,
//       };
    
//       console.log("Payload:", payload);
//       setSubmitLoading(true)
//       try {
//         const response = await axios.post('/featured/create', payload);
//         // Handle successful response
//         // navigate('/success-page'); // Replace with your success route
//         Swal.fire({
//           title: 'Success!',
//           text: 'Features item created successfully!',
//           icon: 'success',
//         }).then(() => {
//           // Trigger any other actions needed after successful upload
//           navigate('/boycott/all-features'); 
//         });
          
      
//       } catch (error) {
//         console.error('Error submitting data:', error);
//         // Handle error response
//       } finally {
//         // Reset loading state after API call
//         setSubmitLoading(false);
//       }


    
//     };
    

//   const tagRender = (props, source) => {
//     const { label, value, onClose } = props;
//     let flag;

//     // Determine the correct flag based on the source
//     if (source === "countries") {
//       const countryOption = countryOptions.find((option) => option.value === value);
//       flag = countryOption?.flag;
//     }

//     return (
//       <Tag
//         closable={true}
//         onClose={onClose}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           margin: "4px", // Adds space between tags
//           padding: "4px 8px", // Optional: add padding for better visual appearance
//         }}
//       >
//         {flag && <img src={flag} alt={label} style={{ width: 24, marginRight: 8 }} />}
//         {label}
//       </Tag>
//     );
//   };

//   return (
//     <ArgonBox sx={{ marginTop: 3 }}>
//       {loading ? (
//         <LoadingSpinner size={48} /> // Show spinner while loading
//       ) : (
//         <Space direction="vertical" style={{ width: "100%", gap: "16px" }}>
//           {/* Countries Multi Select */}
//           {/* <Select
//             mode="multiple"
//             placeholder="Select countries"
//             style={{ width: '100%' }}
//             options={countryOptions}
//             value={selectedCountries}
//             onChange={setSelectedCountries}
//     tagRender={(props) => tagRender(props, 'countries')}  // Pass source as 'countries'
//           /> */}

//           <ArgonBox>
//           <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
//               Enter feature title
//             </ArgonTypography>
//     <Input placeholder="" value={featureFieldValue} onChange={handleChange}/>
//           </ArgonBox>

//           <ArgonBox>
//             <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
//               Select countries <span style={{ fontSize: 12, fontStyle: 'italic' }}>
//               (Click on the input to choose several options from the dropdown menu)
//               </span>
//             </ArgonTypography>

//             <Select
//               mode="multiple"
//               placeholder="Select countries"
//               showSearch
//               style={{ width: '100%',  }} // Note: Horizontal padding won't work on the Select input, use CSS for vertical padding
//               //   options={countryOptions}
//               value={selectedCountries}
//               onChange={setSelectedCountries}
//               tagRender={(props) => tagRender(props, "countries")} // Pass source as 'countries'
//               optionLabelProp="label" // This displays the label (and you can also show flag)
//               labelInValue // Ensures you get both value and label when selected
//               filterOption={(input, option) =>
//                 option.label.toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {countryOptions.map((option) => (
//                 <Select.Option key={option.value} value={option.value} label={option.label}>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <img
//                       src={option.flag}
//                       alt={option.label}
//                       style={{ width: 20, height: 16, marginRight: 8 }}
//                     />
//                     {option.label}
//                   </div>
//                 </Select.Option>
//               ))}
//             </Select>
//           </ArgonBox>

//           <ArgonBox>
//             <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
//               Select categories <span style={{ fontSize: 12, fontStyle: 'italic' }}>
//               (Click on the input to choose several options from the dropdown menu)
//               </span>
//             </ArgonTypography>

//             {/* Categories Multi Select */}
//             <Select
//               showSearch
//               mode="multiple"
//               placeholder="Select categories"
//               style={{ width: "100%"}}
//               // options={categoryOptions}
//               value={selectedCategories}
//               onChange={setSelectedCategories}
//               tagRender={(props) => tagRender(props, "categories")} // Pass source as 'categories'
//               filterOption={(input, option) =>
//                 option.label.toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {categoryOptions.map((option) => (
//                 <Select.Option key={option.value} value={option.value} label={option.label}>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <img
//                       src={option.flag}
//                       alt={option.label}
//                       style={{ width: 24, height: 19, marginRight: 8 }}
//                     />
//                     {option.label}
//                   </div>
//                 </Select.Option>
//               ))}
//             </Select>
//           </ArgonBox>

//           <ArgonBox>
//             <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
//               Select brands <span style={{ fontSize: 12, fontStyle: 'italic' }}>
//               (Click on the input to choose several options from the dropdown menu)
//               </span>
//             </ArgonTypography>

//             {/* Brands Multi Select */}
//             <Select
//               showSearch
//               mode="multiple"
//               placeholder="Select brands"
//               style={{ width: "100%" }}
//               // options={brandOptions}
//               value={selectedBrands}
//               onChange={setSelectedBrands}
//               tagRender={(props) => tagRender(props, "brands")} // Pass source as 'brands'
//               filterOption={(input, option) =>
//                 option.label.toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {brandOptions.map((option) => (
//                 <Select.Option key={option.value} value={option.value} label={option.label}>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <img
//                       src={option.flag}
//                       alt={option.label}
//                       style={{ width: 24, height: 19, marginRight: 8 }}
//                     />
//                     {option.label}
//                   </div>
//                 </Select.Option>
//               ))}
//             </Select>
//           </ArgonBox>

//           <ArgonBox>
//             <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
//               Select products <span style={{ fontSize: 12, fontStyle: 'italic' }}>
//               (Click on the input to choose several options from the dropdown menu)
//               </span>
//             </ArgonTypography>

//             {/* Products Multi Select */}
//             <Select
//               showSearch
//               mode="multiple"
//               placeholder="Select products"
//               style={{ width: "100%" }}
//               // options={productOptions}
//               value={selectedProducts}
//               onChange={setSelectedProducts}
//               tagRender={(props) => tagRender(props, "products")} // Pass source as 'products'
//               filterOption={(input, option) =>
//                 option.label.toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {productOptions.map((option) => (
//                 <Select.Option key={option.value} value={option.value} label={option.label}>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <img
//                       src={option.flag}
//                       alt={option.label}
//                       style={{ width: 24, height: 19, marginRight: 8 }}
//                     />
//                     {option.label}
//                   </div>
//                 </Select.Option>
//               ))}
//             </Select>
//           </ArgonBox>
//         </Space>
//       )}

//       {/* <Button
//         type="primary"
//         onClick={handleSubmit}
//         disabled={loading}
//         style={{ marginTop: 16 }}
//       >
//         {loading ? <LoadingSpinner size={24} /> : 'Create'}
//       </Button> */}

//       <ArgonBox mt={3} width="100%" display="flex" justifyContent="flex-end">
//         <ArgonButton
//           variant="gradient"
//           color="secondary"
//           onClick={handleSubmit}
//           disabled={submitLoading} // Disable button when loading
//         >
//           {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Create"}
//         </ArgonButton>
//       </ArgonBox>
//     </ArgonBox>
//   );
// }

// Featured.propTypes = {
//   label: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   onClose: PropTypes.func.isRequired,
//   flag: PropTypes.string,
// };

// export default Featured;






// import { Public } from '@mui/icons-material';
// import { Box } from '@mui/material';
// import ArgonTypography from 'components/ArgonTypography';
// import React, { useState } from 'react';

// const App = () => {
// const mockData = {
//     step1: {
//       continent: 'ASIA',
//       response: ['Pakistan', 'China']
//     },
//     step2: {
//       input: ['Pakistan', 'China'],
//       response: {
//         data: {
//           Pakistan: [
//             { category_id: 1, category_name: 'Food' },
//             { category_id: 2, category_name: 'Beverages' }
//           ],
//           China: [
//             { category_id: 3, category_name: 'Beauty' },
//             { category_id: 4, category_name: 'Electronics' }
//           ]
//         }
//       }
//     },
//     step3: {
//       input: { Pakistan: [1, 2], China: [3, 4] },
//       response: {
//         data: {
//           Pakistan: [
//             {
//               category_id: 1,
//               category_name: 'Food',
//               brands: [
//                 { brand_id: 101, brand_name: 'Pepsi' },
//                 { brand_id: 102, brand_name: 'Coca-Cola' }
//               ]
//             },
//             {
//               category_id: 2,
//               category_name: 'Beverages',
//               brands: [
//                 { brand_id: 103, brand_name: 'Nestle' },
//                 { brand_id: 104, brand_name: 'Sprite' }
//               ]
//             }
//           ],
//           China: [
//             {
//               category_id: 3,
//               category_name: 'Beauty',
//               brands: [
//                 { brand_id: 105, brand_name: "L'Oreal" },
//                 { brand_id: 106, brand_name: 'Dove' }
//               ]
//             },
//             {
//               category_id: 4,
//               category_name: 'Electronics',
//               brands: [
//                 { brand_id: 107, brand_name: 'Samsung' },
//                 { brand_id: 108, brand_name: 'Huawei' }
//               ]
//             }
//           ]
//         }
//       }
//     },
//     step4: {
//       input: {
//         Pakistan: [
//           {
//             category_id: 1,
//             category_name: 'Food',
//             brands: [
//               { brand_id: 101, brand_name: 'Pepsi' },
//               { brand_id: 102, brand_name: 'Coca-Cola' }
//             ]
//           }
//         ]
//       },
//       response: {
//         data: {
//           Pakistan: [
//             {
//               category_id: 1,
//               category_name: 'Food',
//               products: [
//                 {
//                   brand_id: 101,
//                   brand_name: 'Pepsi',
//                   products: [
//                     { product_id: 201, product_name: 'Dew' },
//                     { product_id: 202, product_name: 'Frootos' }
//                   ]
//                 }
//               ]
//             }
//           ]
//         }
//       }
//     }
//   };


//   const [selectedCountries, setSelectedCountries] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState({});
//   const [selectedBrands, setSelectedBrands] = useState({});
//   const [selectedProducts, setSelectedProducts] = useState({});

//   const handleCountryChange = (country) => {
//     if (selectedCountries.includes(country)) {
//       setSelectedCountries(selectedCountries.filter(c => c !== country));
//       // Remove related selections
//       setSelectedCategories(prev => {
//         const updated = { ...prev };
//         delete updated[country];
//         return updated;
//       });
//       setSelectedBrands(prev => {
//         const updated = { ...prev };
//         delete updated[country];
//         return updated;
//       });
//       setSelectedProducts(prev => {
//         const updated = { ...prev };
//         delete updated[country];
//         return updated;
//       });
//     } else {
//       setSelectedCountries([...selectedCountries, country]);
//       // Initialize empty selections for the new country
//       setSelectedCategories(prev => ({ ...prev, [country]: [] }));
//       setSelectedBrands(prev => ({ ...prev, [country]: [] }));
//       setSelectedProducts(prev => ({ ...prev, [country]: [] }));
//     }
//   };

//   const handleCategoryChange = (country, categoryId) => {
//     setSelectedBrands(prev => ({ ...prev, [country]: [] }));
//     setSelectedProducts(prev => ({ ...prev, [country]: [] }));

//     setSelectedCategories(prev => ({
//       ...prev,
//       [country]: prev[country]?.includes(categoryId)
//         ? prev[country].filter(id => id !== categoryId)
//         : [...(prev[country] || []), categoryId]
//     }));
//   };

//   const handleBrandChange = (country, categoryId, brandId) => {
//     setSelectedProducts(prev => ({ ...prev, [country]: [] }));

//     setSelectedBrands(prev => {
//       const selectedBrand = prev[country]?.find(b => b.category_id === categoryId && b.brand_id === brandId);
//       return {
//         ...prev,
//         [country]: selectedBrand
//           ? prev[country].filter(b => !(b.category_id === categoryId && b.brand_id === brandId))
//           : [...(prev[country] || []), { category_id: categoryId, brand_id: brandId }]
//       };
//     });
//   };

//   const handleProductChange = (country, categoryId, brandId, productId) => {
//     setSelectedProducts(prev => {
//       const selectedProduct = prev[country]?.find(p => p.category_id === categoryId && p.brand_id === brandId && p.product_id === productId);
//       return {
//         ...prev,
//         [country]: selectedProduct
//           ? prev[country].filter(p => !(p.category_id === categoryId && p.brand_id === brandId && p.product_id === productId))
//           : [...(prev[country] || []), { category_id: categoryId, brand_id: brandId, product_id: productId }]
//       };
//     });
//   };

//   return (
//     <div>
      // <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:4,}}>
      //   <div style={{fontSize: 25, color: 'rgb(138 156 193)'}}>

      // <Public />
      // </div>
      // <h2 style={{ color: 'rgb(138 156 193)'}}> 
      //    Asia
       
      //  </h2>
      // </Box>
       
//       <h3 style={{color: '#5E72E4', fontSize: 16, color: 'orangered'}}>Select Countries 
       
//       </h3>
//       <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>
//   {mockData.step1.response.map(country => (
//     <div key={country} style={{}}>
//       <label style={{ fontWeight: 600, fontSize: 18 }}>
//         <input 
//           type="checkbox"
//           style={{ marginRight: 2 }}
//           checked={selectedCountries.includes(country)}
//           onChange={() => handleCountryChange(country)}
//         />
//         {country}
//       </label>
//     </div>
//   ))}
// </div>


//       {selectedCountries.map(country => (
//         <div key={country} style={{border: '1px solid #aba6a6', padding: 15, borderRadius: 15, marginBottom:15, marginTop: 15}}>
         
//           <ArgonTypography variant="h5" style={{fontWeight: 'bold'}}>{country}</ArgonTypography>

//           <h3 style={{color: '#5E72E4', fontSize: 18}}>Select Categories</h3>
//           {mockData.step2.response.data[country].map(category => (
//             // <div  style={{marginLeft: 10}}>

//             <label key={category.category_id} style={{marginRight: 10}}>
//               <input style={{marginRight: 2}}
//                 type="checkbox"
//                 checked={selectedCategories[country]?.includes(category.category_id)}
//                 onChange={() => handleCategoryChange(country, category.category_id)}
//               />
//               {category.category_name}
//             </label>
//             // </div>
//           ))}

// {Object.keys(selectedCategories).some(country => selectedCategories[country]?.length > 0) && (
//   <h3  style={{color: '#5E72E4',  fontSize: 18}}>Select Brands</h3>
// )}
//          {selectedCategories[country]?.map(categoryId => {
//             const category = mockData.step3.response.data[country].find(cat => cat.category_id === categoryId);
//             return (
//               <div key={categoryId}>
//                 <h4 style={{color: '#858585'}}>{category.category_name}</h4>
//                 {category.brands.map(brand => (
//                   <label key={brand.brand_id} style={{marginRight: 10}}>
//                     <input style={{marginRight: 2}}
//                       type="checkbox"
//                       checked={selectedBrands[country]?.find(b => b.category_id === categoryId && b.brand_id === brand.brand_id)}
//                       onChange={() => handleBrandChange(country, categoryId, brand.brand_id)}
//                     />
//                     {brand.brand_name}
//                   </label>
//                 ))}
//               </div>
//             );
//           })}

// {Object.keys(selectedBrands).some(country => selectedBrands[country]?.length > 0) && (
//   <h3  style={{color: '#5E72E4', fontSize: 18}}> Select Products</h3>
// )}
//           {selectedBrands[country]?.map(({ category_id, brand_id }) => {
//             const brand = mockData.step3.response.data[country].find(cat => cat.category_id === category_id).brands.find(b => b.brand_id === brand_id);
//             const products = mockData.step4.response.data[country].find(cat => cat.category_id === category_id).products.find(b => b.brand_id === brand_id)?.products || [];
//             return (
//               <div key={brand_id}>
//                 <h4 style={{color: '#858585'}}>{brand.brand_name}</h4>
//                 {products.map(product => (
//                   <label key={product.product_id} style={{marginRight: 10}}>
//                     <input style={{marginRight: 2}}
//                       type="checkbox"
//                       checked={selectedProducts[country]?.find(p => p.category_id === category_id && p.brand_id === brand_id && p.product_id === product.product_id)}
//                       onChange={() => handleProductChange(country, category_id, brand_id, product.product_id)}
//                     />
//                     {product.product_name}
//                   </label>
//                 ))}
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;
// import { useState, useEffect } from 'react';
// import { Box, Typography, Button, Checkbox } from '@mui/material';

// const App = () => {
//   const [selectedCountries, setSelectedCountries] = useState([]);
//   const [countriesData, setCountriesData] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState({});
//   const [categoriesData, setCategoriesData] = useState({});
//   const [selectedBrands, setSelectedBrands] = useState({});
//   const [brandsData, setBrandsData] = useState({});
//   const [selectedProducts, setSelectedProducts] = useState({});
//   const [productsData, setProductsData] = useState({});

//   // Fetch all countries by continent
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch(
//           `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/area/getCountryByContinent?continent=asia`
//           , {
//             headers: {
//               'ngrok-skip-browser-warning': '69420'
//             }
//           });         const data = await response.json();
//         setCountriesData(data.countries || []);
//       } catch (error) {
//         console.error('Error fetching countries:', error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleCountryChange = async (country) => {
//     const updatedCountries = selectedCountries.includes(country)
//       ? selectedCountries.filter((c) => c !== country)
//       : [...selectedCountries, country];
//     setSelectedCountries(updatedCountries);

//     if (!selectedCountries.includes(country)) {
//       try {
//         const response = await fetch(
//           `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/categories/getmultplecategoriesbycountries`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ countries: updatedCountries }),
//           }
//         );
//         const data = await response.json();
//         setCategoriesData((prev) => ({ ...prev, [country]: data.data[country] || [] }));
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     } else {
//       setSelectedCategories((prev) => {
//         const updated = { ...prev };
//         delete updated[country];
//         return updated;
//       });
//       setSelectedBrands((prev) => {
//         const updated = { ...prev };
//         delete updated[country];
//         return updated;
//       });
//       setSelectedProducts((prev) => {
//         const updated = { ...prev };
//         delete updated[country];
//         return updated;
//       });
//     }
//   };


//   const handleCategoryChange = async (country, categoryId) => {
//     const isSelected = selectedCategories[country]?.includes(categoryId);
//     const updatedCategories = isSelected
//       ? selectedCategories[country].filter((id) => id !== categoryId)
//       : [...(selectedCategories[country] || []), categoryId];

//     setSelectedCategories((prev) => ({ ...prev, [country]: updatedCategories }));
//     setSelectedBrands((prev) => ({ ...prev, [country]: [] }));
//     setSelectedProducts((prev) => ({ ...prev, [country]: [] }));

//     try {
//       const response = await fetch(
//         `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/brands/getCategoriesWithBrandsByCountries`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ Categories: { [country]: updatedCategories } }),
//         }
//       );
//       const data = await response.json();
//       setBrandsData((prev) => ({ ...prev, [country]: data.data[country] || [] }));
//     } catch (error) {
//       console.error('Error fetching brands:', error);
//     }
//   };

//   const handleBrandChange = async (country, categoryId, brandId) => {
//     const isSelected = selectedBrands[country]?.some(
//       (brand) => brand.category_id === categoryId && brand.brand_id === brandId
//     );

//     const updatedBrands = isSelected
//       ? selectedBrands[country].filter((brand) => brand.brand_id !== brandId)
//       : [...(selectedBrands[country] || []), { category_id: categoryId, brand_id: brandId }];

//     setSelectedBrands((prev) => ({ ...prev, [country]: updatedBrands }));
//     setSelectedProducts((prev) => ({ ...prev, [country]: [] }));

//     try {
//       const response = await fetch(
//         `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/brands/getProductsByBrandsInCountries`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ brands: { [country]: updatedBrands.map((b) => b.brand_id) } }),
//         }
//       );
//       const data = await response.json();
//       setProductsData((prev) => ({ ...prev, [country]: data.data[country] || [] }));
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   return (
//     <Box p={2}>
//     <Typography variant="h4">Asia</Typography>
//     <Typography variant="subtitle1" color="orange">
//       Select Countries
//     </Typography>
    
  
//    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>
//    {countriesData.map((country) => (
//       <Box key={country.id}>
//         <Checkbox
//           checked={selectedCountries.includes(country.country_name)}
//           onChange={() => handleCountryChange(country.country_name)}
//         />
//         <Typography component="span">{country.country_name}</Typography>
//       </Box>
//     ))}
//    </Box>
//     {selectedCountries.map((country) => (
//       <Box
//         key={country}
//         p={2}
//         my={2}
//         border="1px solid #d3d3d3"
//         borderRadius="8px"
//         bgcolor="#f9f9f9"
//       >
//         <Typography variant="h6" color="primary">
//           {country}
//         </Typography>

//         <Typography color="blue">Select Categories</Typography>
//         {categoriesData[country]?.length ? (
//           categoriesData[country].map((category) => (
//             <Box key={category.category_id}>
//               <Checkbox
//                 checked={selectedCategories[country]?.includes(category.category_id)}
//                 onChange={() => handleCategoryChange(country, category.category_id)}
//               />
//               <Typography component="span">{category.category_name}</Typography>
//             </Box>
//           ))
//         ) : (
//           <Typography color="textSecondary">No categories found</Typography>
//         )}

// {selectedCategories[country]?.length > 0 && (
//   <Typography color="blue">Select Brands</Typography>
// )}
// {selectedCategories[country]?.length ? (
//   selectedCategories[country].map((categoryId) => {
//     const category = brandsData[country]?.find((cat) => cat.category_id === categoryId);
//     return (
//       category ? (
//         <Box key={categoryId} mt={1}>
//           <Typography variant="subtitle2" color="textSecondary">
//             *{category.category_name}
//           </Typography>
//           {category.brands.length > 0 ? (
//             category.brands.map((brand) => (
//               <Box key={brand.brand_id} ml={2}>
//                 <Checkbox
//                   checked={selectedBrands[country]?.some((b) => b.brand_id === brand.brand_id)}
//                   onChange={() => handleBrandChange(country, categoryId, brand.brand_id)}
//                 />
//                 <Typography component="span">{brand.brand_name}</Typography>
//               </Box>
//             ))
//           ) : (
//             <Typography color="textSecondary" ml={2}>
//               No brands found related to this category
//             </Typography>
//           )}
//         </Box>
//       ) : null
//     );
//   })
// ) : null}
// {selectedBrands[country]?.length > 0 && (
//   <Typography color="blue">Select Products</Typography>
// )}
// {selectedBrands[country]?.length ? (
//   selectedBrands[country].map((selectedBrand) => {
//     const brand = productsData[country]?.find(
//       (cat) => cat.brands.some((b) => b.brand_id === selectedBrand.brand_id)
//     )?.brands.find((b) => b.brand_id === selectedBrand.brand_id);

//     return (
//       brand ? (
//         <Box key={selectedBrand.brand_id} mt={1}>
//           <Typography variant="subtitle2" color="textSecondary">
//             *{brand.brand_name}
//           </Typography>
//           {brand.products.length > 0 ? (
//             brand.products.map((product) => (
//               <Box key={product.product_id} ml={2}>
//                 <Typography component="span">{product.product_name}</Typography>
//               </Box>
//             ))
//           ) : (
//             <Typography color="textSecondary" ml={2}>
//               No products found related to this brand
//             </Typography>
//           )}
//         </Box>
//       ) : null
//     );
//   })
// ) :null}
//       </Box>
//     ))}
//   </Box>
  
//   );
// };




// import { useState, useEffect } from 'react';
// import { Box, Typography } from '@mui/material';
// import { Select } from 'antd';

// const { Option, OptGroup } = Select;

// const App = () => {
//   const [selectedCountries, setSelectedCountries] = useState([]);
//   const [countriesData, setCountriesData] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState({});
//   const [categoriesData, setCategoriesData] = useState({});
//   const [selectedBrands, setSelectedBrands] = useState({});
//   const [brandsData, setBrandsData] = useState({});
//   const [selectedProducts, setSelectedProducts] = useState({});
//   const [productsData, setProductsData] = useState({});

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch(
//           `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/area/getCountryByContinent?continent=asia`,
//           {
//             headers: {
//               'ngrok-skip-browser-warning': '69420',
//             },
//           }
//         );
//         const data = await response.json();
//         setCountriesData(data.countries || []);
//       } catch (error) {
//         console.error('Error fetching countries:', error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleCountryChange = async (value) => {
//     setSelectedCountries(value);

//     try {
//       const response = await fetch(
//         `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/categories/getmultplecategoriesbycountries`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ countries: value }),
//         }
//       );
//       const data = await response.json();
//       setCategoriesData(data.data || {});
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleCategoryChange = async (country, value) => {
//     setSelectedCategories((prev) => ({ ...prev, [country]: value }));

//     try {
//       const response = await fetch(
//         `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/brands/getCategoriesWithBrandsByCountries`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ Categories: { [country]: value } }),
//         }
//       );
//       const data = await response.json();
//       const newBrands = data.data[country] || [];
//       setBrandsData((prev) => ({ ...prev, [country]: newBrands }));

//       const validBrandIds = newBrands.flatMap((cat) => cat.brands.map((b) => b.brand_id));
//       setSelectedBrands((prev) => ({
//         ...prev,
//         [country]: (prev[country] || []).filter((id) => validBrandIds.includes(id)),
//       }));

//       const validProductIds = newBrands.flatMap((cat) =>
//         cat.brands.flatMap((b) => b.products.map((p) => p.product_id))
//       );
//       setSelectedProducts((prev) => ({
//         ...prev,
//         [country]: (prev[country] || []).filter((id) => validProductIds.includes(id)),
//       }));
//     } catch (error) {
//       console.error('Error fetching brands:', error);
//     }
//   };

//   const handleBrandChange = async (country, value) => {
//     setSelectedBrands((prev) => ({ ...prev, [country]: value }));

//     try {
//       const response = await fetch(
//         `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/brands/getProductsByBrandsInCountries`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ brands: { [country]: value } }),
//         }
//       );
//       const data = await response.json();
//       const newProducts = data.data[country] || [];
//       setProductsData((prev) => ({ ...prev, [country]: newProducts }));

//       const validProductIds = newProducts.flatMap((cat) =>
//         cat.brands.flatMap((b) => b.products.map((p) => p.product_id))
//       );
//       setSelectedProducts((prev) => ({
//         ...prev,
//         [country]: (prev[country] || []).filter((id) => validProductIds.includes(id)),
//       }));
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h4">Asia</Typography>
//       <Typography variant="subtitle1" color="orange">
//         Select Countries
//       </Typography>

//       <Select
//         mode="multiple"
//         style={{ width: '100%', marginBottom: '20px' }}
//         placeholder="Select countries"
//         value={selectedCountries}
//         onChange={handleCountryChange}
//       >
//         {countriesData.map((country) => (
//           <Option key={country.id} value={country.country_name}>
//             {country.country_name}
//           </Option>
//         ))}
//       </Select>

//       {selectedCountries.map((country) => (
//         <Box key={country} p={2} my={2} border="1px solid #d3d3d3" borderRadius="8px" bgcolor="#f9f9f9">
//           <Typography variant="h6" color="primary">
//             {country}
//           </Typography>

//           <Typography color="blue">Select Categories</Typography>
//           <Select
//             mode="multiple"
//             style={{ width: '100%', marginBottom: '20px' }}
//             placeholder="Select categories"
//             value={selectedCategories[country] || []}
//             onChange={(value) => handleCategoryChange(country, value)}
//           >
//             {categoriesData[country]?.map((category) => (
//               <Option key={category.category_id} value={category.category_id}>
//                 {category.category_name}
//               </Option>
//             ))}
//           </Select>

//           {selectedCategories[country]?.length > 0 && (
//             <>
//               <Typography color="blue">Select Brands</Typography>
//               <Select
//                 mode="multiple"
//                 style={{ width: '100%', marginBottom: '20px' }}
//                 placeholder="Select brands"
//                 value={selectedBrands[country] || []}
//                 onChange={(value) => handleBrandChange(country, value)}
//               >
//                 {selectedCategories[country].map((categoryId) => {
//                   const category = brandsData[country]?.find((cat) => cat.category_id === categoryId);
//                   return (
//                     category && (
//                       <OptGroup key={category.category_id} label={category.category_name}>
//                         {category.brands.map((brand) => (
//                           <Option key={brand.brand_id} value={brand.brand_id}>
//                             {brand.brand_name}
//                           </Option>
//                         ))}
//                       </OptGroup>
//                     )
//                   );
//                 })}
//               </Select>
//             </>
//           )}

//           {selectedBrands[country]?.length > 0 && (
//             <>
//               <Typography color="blue">Select Products</Typography>
//               <Select
//                 mode="multiple"
//                 style={{ width: '100%', marginBottom: '20px' }}
//                 placeholder="Select products"
//                 value={selectedProducts[country] || []}
//                 onChange={(value) => setSelectedProducts((prev) => ({ ...prev, [country]: value }))}
//               >
//                 {selectedBrands[country].map((brandId) => {
//                   const brand = productsData[country]?.flatMap((cat) =>
//                     cat.brands.filter((b) => b.brand_id === brandId)
//                   )[0];
//                   return (
//                     brand && (
//                       <OptGroup key={brand.brand_id} label={brand.brand_name}>
//                         {brand.products.map((product) => (
//                           <Option key={product.product_id} value={product.product_id}>
//                             {product.product_name}
//                           </Option>
//                         ))}
//                       </OptGroup>
//                     )
//                   );
//                 })}
//               </Select>
//             </>
//           )}
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default App;

// import { useState, useEffect } from 'react';
// import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Select } from 'antd';
// import { Public } from '@mui/icons-material';

// const { Option, OptGroup } = Select;

// const App = () => {
//   const [selectedCountries, setSelectedCountries] = useState([]);
//   const [countriesData, setCountriesData] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState({});
//   const [categoriesData, setCategoriesData] = useState({});
//   const [selectedBrands, setSelectedBrands] = useState({});
//   const [brandsData, setBrandsData] = useState({});
//   const [selectedProducts, setSelectedProducts] = useState({});
//   const [productsData, setProductsData] = useState({});
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch(
//           `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/area/getCountryByContinent?continent=asia`,
//           {
//             headers: {
//               'ngrok-skip-browser-warning': '69420',
//             },
//           }
//         );
//         const data = await response.json();
//         setCountriesData(data.countries || []);
//       } catch (error) {
//         console.error('Error fetching countries:', error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleCountryChange = async (value) => {
//     setSelectedCountries(value);

//     try {
//       const response = await fetch(
//         `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/categories/getmultplecategoriesbycountries`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ countries: value }),
//         }
//       );
//       const data = await response.json();
//       setCategoriesData(data.data || {});
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleCategoryChange = async (country, value) => {
//     setSelectedCategories((prev) => ({ ...prev, [country]: value }));

//     try {
//       const response = await fetch(
//         `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/brands/getCategoriesWithBrandsByCountries`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ Categories: { [country]: value } }),
//         }
//       );
//       const data = await response.json();
//       const newBrands = data.data[country] || [];
//       setBrandsData((prev) => ({ ...prev, [country]: newBrands }));

//       const validBrandIds = newBrands.flatMap((cat) => cat.brands.map((b) => b.brand_id));
//       setSelectedBrands((prev) => ({
//         ...prev,
//         [country]: (prev[country] || []).filter((id) => validBrandIds.includes(id)),
//       }));

//       const validProductIds = newBrands.flatMap((cat) =>
//         cat.brands.flatMap((b) => b.products.map((p) => p.product_id))
//       );
//       setSelectedProducts((prev) => ({
//         ...prev,
//         [country]: (prev[country] || []).filter((id) => validProductIds.includes(id)),
//       }));
//     } catch (error) {
//       console.error('Error fetching brands:', error);
//     }
//   };

//   const handleBrandChange = async (country, value) => {
//     setSelectedBrands((prev) => ({ ...prev, [country]: value }));

//     try {
//       const response = await fetch(
//         `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/brands/getProductsByBrandsInCountries`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ brands: { [country]: value } }),
//         }
//       );
//       const data = await response.json();
//       const newProducts = data.data[country] || [];
//       setProductsData((prev) => ({ ...prev, [country]: newProducts }));

//       const validProductIds = newProducts.flatMap((cat) =>
//         cat.brands.flatMap((b) => b.products.map((p) => p.product_id))
//       );
//       setSelectedProducts((prev) => ({
//         ...prev,
//         [country]: (prev[country] || []).filter((id) => validProductIds.includes(id)),
//       }));
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleAccordionChange = (country) => (event, isExpanded) => {
//     setExpanded(isExpanded ? country : false);
//   };

//   return (
//     <Box p={2}>
//       <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
//         <div style={{ fontSize: 25, color: 'rgb(138 156 193)' }}>
//           <Public />
//         </div>
//         <h2 style={{ color: 'rgb(138 156 193)' }}>Asia</h2>
//       </Box>
//       <Typography variant="subtitle1" style={{ fontSize: 14, color: 'orange', fontWeight: 'bold' }}>
//         Select Countries
//       </Typography>

//       <Select
//         mode="multiple"
//         style={{ width: '100%', marginBottom: '20px' }}
//         placeholder="Select countries"
//         value={selectedCountries}
//         onChange={handleCountryChange}
//       >
//         {countriesData.map((country) => (
//           <Option key={country.id} value={country.country_name}>
//             {country.country_name}
//           </Option>
//         ))}
//       </Select>

//       {selectedCountries.map((country) => (
//         <Accordion
//           key={country}
//           expanded={expanded === country}
//           onChange={handleAccordionChange(country)}
//           style={{ marginBottom: '10px', backgroundColor: '#e3f2fd', borderRadius: 10 }}
//         >
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography variant="h6" color="primary" style={{ fontWeight: 'bold', fontSize: 20 }}>
//             🏳️ {country}
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box>
//               <Typography style={{ fontSize: 14, color: 'orange', fontWeight: 'bold' }}>Select Categories</Typography>
//               <Select
//                 mode="multiple"
//                 style={{ width: '100%', marginBottom: '20px' }}
//                 placeholder="Select categories"
//                 value={selectedCategories[country] || []}
//                 onChange={(value) => handleCategoryChange(country, value)}
//               >
//                 {categoriesData[country]?.map((category) => (
//                   <Option key={category.category_id} value={category.category_id}>
//                     {category.category_name}
//                   </Option>
//                 ))}
//               </Select>

//               {selectedCategories[country]?.length > 0 && (
//                 <>
//                   <Typography style={{ fontSize: 14, color: 'orange', fontWeight: 'bold' }}>Select Brands</Typography>
//                   <Select
//                     mode="multiple"
//                     style={{ width: '100%', marginBottom: '20px' }}
//                     placeholder="Select brands"
//                     value={selectedBrands[country] || []}
//                     onChange={(value) => handleBrandChange(country, value)}
//                   >
//                     {selectedCategories[country].map((categoryId) => {
//                       const category = brandsData[country]?.find((cat) => cat.category_id === categoryId);
//                       return category ? (
//                         <OptGroup key={category.category_id} label={category.category_name}>
//                           {category.brands.length > 0 ? (
//                             category.brands.map((brand) => (
//                               <Option key={brand.brand_id} value={brand.brand_id}>
//                                 {brand.brand_name}
//                               </Option>
//                             ))
//                           ) : (
//                             <Option disabled>No data found for this category</Option>
//                           )}
//                         </OptGroup>
//                       ) : null;
//                     })}
//                   </Select>
//                 </>
//               )}

//               {selectedBrands[country]?.length > 0 && (
//                 <>
//                   <Typography style={{ fontSize: 14, color: 'orange', fontWeight: 'bold' }}>Select Products</Typography>
//                   <Select
//                     mode="multiple"
//                     style={{ width: '100%', marginBottom: '20px' }}
//                     placeholder="Select products"
//                     value={selectedProducts[country] || []}
//                     onChange={(value) => setSelectedProducts((prev) => ({ ...prev, [country]: value }))}
//                   >
//                     {selectedBrands[country].map((brandId) => {
//                       const brand = productsData[country]?.flatMap((cat) =>
//                         cat.brands.filter((b) => b.brand_id === brandId)
//                       )[0];
//                       return brand ? (
//                         <OptGroup key={brand.brand_id} label={brand.brand_name}>
//                           {brand.products.length > 0 ? (
//                             brand.products.map((product) => (
//                               <Option key={product.product_id} value={product.product_id}>
//                                 {product.product_name}
//                               </Option>
//                             ))
//                           ) : (
//                             <Option disabled>No data found for this brand</Option>
//                           )}
//                         </OptGroup>
//                       ) : null;
//                     })}
//                   </Select>
//                 </>
//               )}

//               <Box display="flex" justifyContent="flex-end" mt={2}>
//                 <Button variant="contained" color="primary" style={{ marginRight: '10px', color: 'white' }}>
//                   Save
//                 </Button>
//                 <Button variant="contained" color="secondary" style={{ color: 'white' }}>
//                   Complete
//                 </Button>
//               </Box>
//             </Box>
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </Box>
//   );
// };

// export default App;

import { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Select } from 'antd';
import { CheckCircle, Close, Edit, Public, RotateLeft } from '@mui/icons-material';
import Swal from 'sweetalert2';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import button from 'assets/theme/components/button';

const { Option, OptGroup } = Select;


const App = () => {
     const [loading, setLoading] = useState(true); // State for loading indicator

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [categoriesData, setCategoriesData] = useState({});
  const [selectedBrands, setSelectedBrands] = useState({});
  const [brandsData, setBrandsData] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [productsData, setProductsData] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [initialStatus, setInitialStatus] = useState({}); // Track status for each country



  const [editMode, setEditMode] = useState({});
  console.log(editMode, 'editmodee')

  const toggleEditMode = (country) => {
    setEditMode((prev) => ({
      ...prev,
      [country]: !prev[country],
    }));
  };



  const isCountryComplete = (country) => initialStatus[country] === 'complete';
  const isCountryEditable = (country) => initialStatus[country] === 'edit';
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/area/getCountryByContinent?continent=asia`,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
            },
          }
        );
        const data = await response.json();
        setCountriesData(data.countries || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    // const fetchAllData = async () => {
    //   try {
    //     const response = await fetch(`https://your-api-endpoint.com/fetchAll`);
    //     const data = await response.json();
    //     if (data.countries) {
    //       const countryNames = data.countries.map((c) => c.country);
    //       setSelectedCountries(countryNames);

    //       const categories = {};
    //       const brands = {};
    //       const products = {};

    //       data.countries.forEach((c) => {
    //         categories[c.country] = c.categories.map((cat) => cat.category_id);
    //         brands[c.country] = c.categories.flatMap((cat) =>
    //           cat.brands.map((b) => b.brand_id)
    //         );
    //         products[c.country] = c.categories.flatMap((cat) =>
    //           cat.brands.flatMap((b) => b.products.map((p) => p.product_id))
    //         );
    //       });

    //       setSelectedCategories(categories);
    //       setSelectedBrands(brands);
    //       setSelectedProducts(products);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching all data:', error);
    //   }
    // };

    fetchCountries();
    // fetchAllData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/featured/getAll`, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      });
      const data = await response.json();

      // Set initial data in state
      setSelectedCountries(data.initialCountries || []);
      setInitialStatus(data.initialStatus || {}); // Set initialStatus from response

      setSelectedCategories(data.initialCategories || {});
      setSelectedBrands(data.initialBrands || {});
      setSelectedProducts(data.initialProducts || {});

      // Call handleCountryChange with the fetched countries
      handleCountryChange(data.initialCountries);

      // Call handleCategoryChange for each country in the fetched categories
      Object.entries(data.initialCategories).forEach(([country, categories]) => {
        handleCategoryChange(country, categories);
      });
       // Call handleCategoryChange for each country in the fetched categories
       Object.entries(data.initialBrands).forEach(([country, categories]) => {
        handleBrandChange(country, categories);
      });
      //  // Call handleCategoryChange for each country in the fetched categories
      //  Object.entries(data.initialProducts).forEach(([country, categories]) => {
      //   handleProductChan(country, categories);
      // });
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }finally {
              setLoading(false); // Reset loading state after API call
            }
  };
 
  useEffect(() => {
    fetchInitialData();
  }, []);
  const fetchInitialDataForUpdate = async () => {
    
    try {
      const response = await fetch(`https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/featured/getAll`, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      });
      const data = await response.json();

      // Set initial data in state
      // setSelectedCountries(data.initialCountries || []);
      setInitialStatus(data.initialStatus || {}); // Set initialStatus from response

      setSelectedCategories(data.initialCategories || {});
      setSelectedBrands(data.initialBrands || {});
      setSelectedProducts(data.initialProducts || {});

      // Call handleCountryChange with the fetched countries
      // handleCountryChange(data.initialCountries);

      // Call handleCategoryChange for each country in the fetched categories
      Object.entries(data.initialCategories).forEach(([country, categories]) => {
        handleCategoryChange(country, categories);
      });
       // Call handleCategoryChange for each country in the fetched categories
       Object.entries(data.initialBrands).forEach(([country, categories]) => {
        handleBrandChange(country, categories);
      });
      //  // Call handleCategoryChange for each country in the fetched categories
      //  Object.entries(data.initialProducts).forEach(([country, categories]) => {
      //   handleProductChan(country, categories);
      // });
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };
  

  // const handleCountryChange = async (value) => {
  //   setSelectedCountries(value);

  //   try {
  //     const response = await fetch(
  //       `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/categories/getmultplecategoriesbycountries`,
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ countries: value }),
  //       }
  //     );
  //     const data = await response.json();
  //     setCategoriesData(data.data || {});
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

  

  // const handleCountryChange = async (value) => {
  //   const removedCountries = selectedCountries.filter((country) => !value.includes(country));
  
  //   for (let country of removedCountries) {
  //     if (isCountryEditable(country)) {
  //       const confirmed = await Swal.fire({
  //         title: 'Are you sure?',
  //         text: `Do you want to remove ${country}?`,
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes, remove it!',
  //       });
  
  //       if (!confirmed.isConfirmed) {
  //         return; // Exit if user cancels
  //       }
  //     } else if (isCountryComplete(country)) {
  //       return; // Prevent removal if status is complete
  //     }
  //   }
  
  //   // Proceed with the normal country change if no issues
  //   setSelectedCountries(value);
  //   // Fetch categories as usual
  //   try {
  //     const response = await fetch('https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/categories/getmultplecategoriesbycountries', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ countries: value }),
  //     });
  //     const data = await response.json();
  //     setCategoriesData(data.data || {});
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

  const handleCountryChange = async (value) => {
    const removedCountries = selectedCountries.filter((country) => !value.includes(country));
  
    for (let country of removedCountries) {
      if (isCountryEditable(country) || isCountryComplete(country)) {
        const confirmed = await Swal.fire({
          title: 'Are you sure?',
          text: `Do you want to remove ${country}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, remove it!',
          cancelButtonText: 'Cancel',
        });
  
        if (!confirmed.isConfirmed) {
          continue; // Skip deletion if the user cancels
        }
  
        try {
          const response = await fetch(`https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/featured/deletefeature?country=${country}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            setExpanded(false)
            Swal.fire({
              title: 'Success!',
              text: `${country} removed successfully.`,
              icon: 'success',
              confirmButtonText: 'OK',
            });
            await fetchInitialData(); // Refresh data to update initialStatus
           
          } else {
            throw new Error('Failed to delete country');
          }
        } catch (error) {
          console.error(`Error deleting ${country}:`, error);
        }
      } else if (isCountryComplete(country)) {
        return; // Prevent removal if status is complete
      }
    }
  
    // Proceed with updating the selected countries and fetching categories
    setSelectedCountries(value);
  
    try {
      const response = await fetch('https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/categories/getmultplecategoriesbycountries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countries: value }),
      });
      const data = await response.json();
      setCategoriesData(data.data || {});
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  
  const handleCategoryChange = async (country, value) => {
    setSelectedCategories((prev) => ({ ...prev, [country]: value }));

    try {
      const response = await fetch(
        `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/brands/getCategoriesWithBrandsByCountries`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Categories: { [country]: value } }),
        }
      );
      const data = await response.json();
      const newBrands = data.data[country] || [];
      setBrandsData((prev) => ({ ...prev, [country]: newBrands }));

      const validBrandIds = newBrands.flatMap((cat) => cat.brands.map((b) => b.brand_id));
      setSelectedBrands((prev) => ({
        ...prev,
        [country]: (prev[country] || []).filter((id) => validBrandIds.includes(id)),
      }));

      const validProductIds = newBrands.flatMap((cat) =>
        cat.brands.flatMap((b) => b.products.map((p) => p.product_id))
      );
      setSelectedProducts((prev) => ({
        ...prev,
        [country]: (prev[country] || []).filter((id) => validProductIds.includes(id)),
      }));
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleBrandChange = async (country, value) => {
    setSelectedBrands((prev) => ({ ...prev, [country]: value }));

    try {
      const response = await fetch(
        `https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/brands/getProductsByBrandsInCountries`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brands: { [country]: value } }),
        }
      );
      const data = await response.json();
      const newProducts = data.data[country] || [];
      setProductsData((prev) => ({ ...prev, [country]: newProducts }));

      const validProductIds = newProducts.flatMap((cat) =>
        cat.brands.flatMap((b) => b.products.map((p) => p.product_id))
      );
      setSelectedProducts((prev) => ({
        ...prev,
        [country]: (prev[country] || []).filter((id) => validProductIds.includes(id)),
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAccordionChange = (country) => (event, isExpanded) => {
    setExpanded(isExpanded ? country : false);
  };

  const handleSave = async (country) => {    

    const payload = {
     
      continent: 'Asia',
      country: country,
      categories: selectedCategories[country] || [],
      brands: selectedBrands[country] || [],
      products: selectedProducts[country] || [],
    };
    console.log(payload);
  
    try {
      const response = await fetch(`https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/featured/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        setExpanded(false)
        Swal.fire({
          title: 'Success!',
          text: `Data saved for ${country} successfully`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        await fetchInitialDataForUpdate(); // Refresh data to update initialStatus
    
      } else {
        throw new Error('Failed to save data');
      }
      
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  const handleUpdate = async (country) => {    

    const payload = {
      status: "edit",
      continent: 'Asia',
      country: country,
      categories: selectedCategories[country] || [],
      brands: selectedBrands[country] || [],
      products: selectedProducts[country] || [],
    };
    console.log(payload);
  
    try {
      const response = await fetch(`https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/featured/updatefeature?country=${country}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        setExpanded(false)
        Swal.fire({
          title: 'Success!',
          text: `Data updated for ${country} successfully`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        await fetchInitialDataForUpdate(); // Refresh data to update initialStatus
        setEditMode((prev) => ({
          ...prev,
          [country]: !prev[country],
        }));
      } else {
        throw new Error('Failed to save data');
      }
      
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  // const handleComplete = async (country) => {    

  //   const payload = {
  //     status: "complete",
  //     continent: 'Asia',
  //     country: country,
  //     categories: selectedCategories[country] || [],
  //     brands: selectedBrands[country] || [],
  //     products: selectedProducts[country] || [],
  //   };
  //   console.log(payload);
  
  //   try {
  //     const response = await fetch(`https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/featured/updatefeature?country=${country}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload),
  //     });
  
  //     if (response.ok) {
  //       Swal.fire({
  //         title: 'Success!',
  //         text: `Data saved for ${country} successfully`,
  //         icon: 'success',
  //         confirmButtonText: 'OK',
  //       });
  //       await fetchInitialData(); // Refresh data to update initialStatus
  //     } else {
  //       throw new Error('Failed to save data');
  //     }
      
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //   }
  // };
  const handleComplete = async (country) => {    
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: `Are you ready to complete this country feature for ${country}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, complete it!',
      cancelButtonText: 'No, cancel',
    });
  
    // Check if the user confirmed
    if (!confirmResult.isConfirmed) {
      return; // Exit the function if the user cancels
    }
  
    const payload = {
      status: "complete",
      continent: 'Asia',
      country: country,
      categories: selectedCategories[country] || [],
      brands: selectedBrands[country] || [],
      products: selectedProducts[country] || [],
    };
    console.log(payload);
  
    try {
      const response = await fetch(`https://412d-2407-d000-1a-c9e3-118d-9d85-743b-e512.ngrok-free.app/featured/updatefeature?country=${country}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        setExpanded(false)

        Swal.fire({
          title: 'Success!',
          text: `Added data to completed features for ${country} successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        await fetchInitialDataForUpdate(); // Refresh data to update initialStatus
        // setEditMode((prev) => ({
        //   ...prev,
        //   [country]: !prev[country],
        // }));
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  return (
    <Box p={2}>
                 {loading ? (
        <LoadingSpinner size={48} /> // Show spinner while loading
      ) : (
        <Box>
      <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 25, color: 'rgb(138 156 193)' }}>
          <Public />
        </div>
        <h2 style={{ color: 'rgb(138 156 193)' }}>Asia</h2>

      </Box>
      <Typography variant="subtitle1" style={{ fontSize: 14, color: 'orange', fontWeight: 'bold' }}>
        Select Countries
      </Typography>

      <Select
        mode="multiple"
        style={{ width: '100%', marginBottom: '20px' }}
        placeholder="Select countries"
        value={selectedCountries}
        onChange={handleCountryChange}
      >
        {countriesData.map((country) => (
          <Option key={country.id} value={country.country_name}>
            {country.country_name}
          </Option>
        ))}
      </Select>

      {selectedCountries.map((country) => (
        <Accordion
          key={country}
          expanded={expanded === country}
          onChange={handleAccordionChange(country)}
          style={{ marginBottom: '10px', backgroundColor: '#e3f2fd', borderRadius: 10 }}
        > 
          <AccordionSummary display={"flex"} alignItems={"center"} expandIcon={<ExpandMoreIcon />}>
          
          
       <Box   display={"flex"} alignItems={"center"} gap={67}>
            <Box>
            <Typography variant="h6" color="primary" style={{ fontWeight: 'bold', fontSize: 20 }}>
            🏳️ {country}   </Typography>  
            {initialStatus[country] === 'complete' && (
            <Box display={"flex"} alignItems={"center"} marginLeft={1}>
            <CheckCircle style={{color: 'orangered'}}/><span style={{color: 'orangered', fontSize:12, fontWeight:'bold',fontStyle: 'italic' }}>Completed</span> 

            </Box>
            )} 
             {/* {initialStatus[country] === 'edit' && (
            <Box display={"flex"} alignItems={"center"} marginLeft={1}>
            <RotateLeft style={{color: 'grey'}}/>
            <span style={{color: 'grey', fontSize:12, fontWeight:'bold',fontStyle: 'italic' }}>
            This feature can be edited and updated... </span> 

            </Box>
            )}  */}
            </Box>

            <Box>
              {(isCountryComplete(country) || isCountryEditable(country)) &&
              <IconButton
              onClick={(e) => {
                e.stopPropagation();
                toggleEditMode(country);
              }}
            >
              {editMode[country] ? <Close color="error" /> : <Edit color="primary" />}
            </IconButton>
               }

            </Box>
       </Box>
         

           
          </AccordionSummary>
          <AccordionDetails>
            <Box>
            
              <Typography style={{ fontSize: 14, color: 'orange', fontWeight: 'bold' }}>Select Categories</Typography>
              <Select
                mode="multiple"
                style={{ width: '100%', marginBottom: '20px' }}
                placeholder="Select categories"
                value={selectedCategories[country] || []}
                onChange={(value) => handleCategoryChange(country, value)}
                // disabled={isCountryComplete(country)} 
                disabled={!editMode[country] && (isCountryComplete(country) || isCountryEditable(country))}

              >
                {categoriesData[country]?.map((category) => (
                  <Option key={category.category_id} value={category.category_id}>
                  {isCountryComplete(country) ? 
                  (
                    <Typography style={{color: 'black', fontSize: 14}}>
                    {category.category_name}
                      </Typography> 
                  ) :  
                  ( 
                  <> 
                  {category.category_name}
                  </>
                  )
                   }
                  
                  </Option>
                ))}
              </Select>

              {selectedCategories[country]?.length > 0 && (
                <>
                  <Typography style={{ fontSize: 14, color: 'orange', fontWeight: 'bold' }}>Select Brands</Typography>
                  <Select
                    mode="multiple"
                    style={{ width: '100%', marginBottom: '20px' }}
                    placeholder="Select brands"
                    value={selectedBrands[country] || []}
                    onChange={(value) => handleBrandChange(country, value)}
                    // disabled={isCountryComplete(country)}
                    disabled={!editMode[country] && (isCountryComplete(country) || isCountryEditable(country))}


                  >
                    {selectedCategories[country].map((categoryId) => {
                      const category = brandsData[country]?.find((cat) => cat.category_id === categoryId);
                      return category ? (
                        <OptGroup key={category.category_id} label={category.category_name}>
                          {category.brands.length > 0 ? (
                            category.brands.map((brand) => (
                              <Option key={brand.brand_id} value={brand.brand_id}>
                                 {isCountryComplete(country) ? 
                  (
                    <Typography style={{color: 'black', fontSize: 14}}>
                     {brand.brand_name}
                      </Typography> 
                  ) :  
                  ( 
                  <> 
                  {brand.brand_name}
                  </>
                  )
                   }
                               
                              </Option>
                            ))
                          ) : (
                            // <Option disabled>No data found for this category</Option>
                            <Option disabled>No data found for this category</Option>

                          )}
                        </OptGroup>
                      ) : null;
                    })}
                  </Select>
                </>
              )}

              {selectedBrands[country]?.length > 0 && (
                <>
                  <Typography style={{ fontSize: 14, color: 'orange', fontWeight: 'bold' }}>Select Products</Typography>
                  <Select
                    mode="multiple"
                    style={{ width: '100%', marginBottom: '20px' }}
                    placeholder="Select products"
                    value={selectedProducts[country] || []}
                    onChange={(value) => setSelectedProducts((prev) => ({ ...prev, [country]: value }))}
                    // disabled={isCountryComplete(country)}
                    disabled={!editMode[country] && (isCountryComplete(country) || isCountryEditable(country))}


                  >
                    {selectedBrands[country].map((brandId) => {
                      const brand = productsData[country]?.flatMap((cat) =>
                        cat.brands.filter((b) => b.brand_id === brandId)
                      )[0];
                      return brand ? (
                        <OptGroup key={brand.brand_id} label={brand.brand_name}>
                          {brand.products.length > 0 ? (
                            brand.products.map((product) => (
                              <Option key={product.product_id} value={product.product_id}>
                                
                                {isCountryComplete(country) ? 
                  (
                    <Typography style={{color: 'black', fontSize: 14}}>
                   {product.product_name}
                      </Typography> 
                  ) :  
                  ( 
                  <> 
                {product.product_name}
                  </>
                  )
                   }
                              </Option>
                            ))
                          ) : (
                            // <Option disabled>No data found for this brand</Option>
                            <Option disabled>No data found for this brand</Option>

                          )}
                        </OptGroup>
                      ) : null;
                    })}
                  </Select>
                </>
              )}

              <Box display="flex" justifyContent="flex-end" mt={2}>
                {/* <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '10px', color: 'white' }}
                  onClick={() => handleSave(country)}
                >
                  Save
                </Button> */}
              
              {initialStatus[country] === 'edit' && editMode[country] && (
                <Button variant="contained" color="primary"  style={{ marginRight: '10px', color: 'white' }}
                onClick={() => handleUpdate(country)} >
                  Update
                </Button>
              ) }
             {initialStatus[country] !== 'edit' && initialStatus[country] !== 'complete' &&(
                <Button variant="contained" color="primary" onClick={() => handleSave(country)} style={{ marginRight: '10px', color: 'white' }}>
                  Save
                </Button>
              ) }


{initialStatus[country] !== 'complete' && initialStatus[country] === 'edit' &&(
                <Button variant="contained" color="secondary"  style={{ marginRight: '10px', color: 'white' }}
                onClick={() => handleComplete(country)}>
                  Publish
                </Button>
)}

{initialStatus[country] === 'complete' && (
                <Button variant="contained" color="secondary"  style={{ marginRight: '10px', color: 'white' }}
                onClick={() => handleComplete(country)}>
                  Published
                </Button>
)}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      </Box>
    )
  }
    </Box>
  );
};

export default App;
