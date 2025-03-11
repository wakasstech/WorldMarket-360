import React, { useState, useEffect } from "react";
import { Select, Space, Tag, Button, message, Input } from "antd";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PropTypes from "prop-types";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import { CircularProgress, TextField } from "@mui/material";
import ArgonTypography from "components/ArgonTypography";
import axios from "../../../../../axios/axios"
import Swal from "sweetalert2";
import { EditOutlined, HighlightOff } from "@mui/icons-material";

const fetchCountries = async () => {
  const response = await fetch("https://boy.ranaafaqali.com/api/area/getAll-country");
  return await response.json();
};

const fetchCategories = async () => {
  const response = await fetch("https://boy.ranaafaqali.com/api/categories/CategoryAll");
  return await response.json();
};

const fetchBrands = async () => {
  const response = await fetch("https://boy.ranaafaqali.com/api/brands/BrandAll");
  return await response.json();
};

const fetchProducts = async () => {
  const response = await fetch("https://boy.ranaafaqali.com/api/products/getAllProducts");
  return await response.json();
};
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

function EditAndViewFeatured({featureId}) {
  const dispatch = useDispatch();



  const [loading, setLoading] = useState(true); // Loader starts as true
  const [submitLoading, setSubmitLoading] = useState(false); // Loader starts as true

  const [isEditing, setIsEditing] = useState(false);


  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCategories, setSelectedCategories] =  useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [countryOptions, setCountryOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [featureFieldValue, setFeatureFieldValue] = useState('');


  useEffect(() => {
    const fetchFeaturedItem = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(`/featured/getById?id=${featureId}`); // Replace with your actual API endpoint
        const result = response.data; // Set the response data to state
        const featureTitle = result.feature_title;
        const countries = JSON.parse(result.countries || '[]');

        const categories = JSON.parse(result.categories || '[]');
        const brands = JSON.parse(result.brands || '[]');
         const products = JSON.parse(result.products || '[]');
         
         setIsEditing(!isEditing);
         setFeatureFieldValue(featureTitle);

         setSelectedCountries(countries.map(country => country.value));
         setSelectedCategories(categories.map(category => category.value));
         setSelectedBrands(brands.map(brand => brand.value));
         setSelectedProducts(products.map(product => product.value));



      } catch (err) {
        console.error('Error fetching featured items:', err);
        
      } finally {
        setLoading(false); // Reset loading state after API call
      }
    };

    fetchFeaturedItem(); // Call the function to fetch data
  }, [featureId]); 



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before the requests
        setLoading(true);

        // Fetch all data concurrently
        const [countries, categories, brands, products] = await Promise.all([
          fetchCountries(),
          fetchCategories(),
          fetchBrands(),
          fetchProducts(),
        ]);
       
        
        // After all data is fetched, set the options
        setCountryOptions(formatCountries(countries));
        setCategoryOptions(formatCategories(categories));
        setBrandOptions(formatBrands(brands));
        setProductOptions(formatProducts(products));
      } catch (error) {
        message.error("Error fetching data");
        console.error("Error:", error);
      } finally {
        // Hide loader after all API calls are done
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setFeatureFieldValue(event.target.value);
  };

  const formatCountries = (countries) => {
    const flatCountries = Object.values(countries).flat();
    return flatCountries.map((country) => ({
      label: country?.country_name,
      value: country?.id,
      flag: country?.country_flag,
    }));
  };

  const formatCategories = (categories) =>
    categories.map((cat) => ({
      label: cat?.name,
      value: cat?.id,
      flag: cat?.category_image,
    }));

  const formatBrands = (brandsData) =>
    brandsData.brands.map((brand) => ({
      label: brand?.name,
      value: brand?.id,
      flag: brand?.brand_image,
    }));

  const formatProducts = (productsData) =>
    productsData.result.map((product) => ({
      label: product?.product_name,
      value: product?.id,
      flag: product?.logo,
    }));

    const handleSubmit =async () => {
    //   const selectedCountryIDs = selectedCountries.map(country => country.value);
      console.log("Selected Country IDs:", selectedCountries);
 


      const selectedCountryObjects = selectedCountries.map((country) => {
        // Use the 'value' property to find the matching option in countryOptions
        const foundCountry = countryOptions.find(option => option.value === country.value);
        
        // Log a warning if no matching country is found
        if (!foundCountry) {
          console.warn(`Country not found for value: ${country.value}`);
        }
        
        return foundCountry; // Return the found country or undefined if not found
      });
    
      const selectedCategoryObjects = selectedCategories.map(categoryValue =>
        categoryOptions.find(option => option.value === categoryValue)
      );
    
      const selectedBrandObjects = selectedBrands.map(brandValue =>
        brandOptions.find(option => option.value === brandValue)
      );
    
      const selectedProductObjects = selectedProducts.map(productValue =>
        productOptions.find(option => option.value === productValue)
      );
    
      const payload = {
        feature_title : featureFieldValue,
        countries: selectedCountryObjects,
        categories: selectedCategoryObjects,
        brands: selectedBrandObjects,
        products: selectedProductObjects,
      };
    
      console.log("Payload:", payload);
      setSubmitLoading(true)
      try {
        const response = await axios.put(`/featured/updatefeature?id=${featureId}`, payload);
                 setIsEditing(!isEditing);

        // Handle successful response
        // navigate('/success-page'); // Replace with your success route
        Swal.fire({
          title: 'Success!',
          text: 'Features item updated successfully!',
          icon: 'success',
        })
          
      
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle error response
      } finally {
        // Reset loading state after API call
        setSubmitLoading(false);
      }


    
    };
    

  const tagRender = (props, source) => {
    const { label, value, onClose } = props;
    let flag;

    // Determine the correct flag based on the source
    if (source === "countries") {
      const countryOption = countryOptions.find((option) => option.value === value);
      flag = countryOption?.flag;
    }

    return (
      <Tag
        closable={true}
        onClose={onClose}
        style={{
          display: "flex",
          alignItems: "center",
          margin: "5px", // Adds space between tags
          padding: "4px 8px", // Optional: add padding for better visual appearance
        }}
      >
        {flag && <img src={flag} alt={label} style={{  width: 24, marginRight: 8 }} />}
        {label}
      </Tag>
    );
  };
// Function to toggle edit mode
const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle the editing state
  };
  return (
    <ArgonBox sx={{ marginTop: 3 }}>
      {loading ? (
        <LoadingSpinner size={48} /> // Show spinner while loading
      ) : (
        <Space direction="vertical" style={{ width: "100%", gap: "16px" }}>
          {/* Countries Multi Select */}
          {/* <Select
            mode="multiple"
            placeholder="Select countries"
            style={{ width: '100%' }}
            options={countryOptions}
            value={selectedCountries}
            onChange={setSelectedCountries}
    tagRender={(props) => tagRender(props, 'countries')}  // Pass source as 'countries'
          /> */}

          <ArgonBox display="flex" alignItems="center">



          {/* <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
          Enter feature title
            </ArgonTypography> */}
    <Input placeholder="" value={featureFieldValue} onChange={handleChange} style={{border: 0, fontSize: 30, color: '#3A4767', fontWeight: 600}}/>
    
    {isEditing ? 
    
    <EditOutlined
        onClick={handleEditToggle} // Toggle edit mode on click
        style={{ cursor: "pointer", marginLeft: "10px", fontSize: "20px" }}
      /> :
       
      <HighlightOff
      onClick={handleEditToggle} // Toggle edit mode on click
      style={{ cursor: "pointer", marginLeft: "10px", fontSize: "20px" }}
    />
    }
          
          </ArgonBox>

          <ArgonBox>
            <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
              Select countries <span style={{ fontSize: 12, fontStyle: 'italic' }}>
              (Click on the input to choose several options from the dropdown menu)
              </span>
            </ArgonTypography>

            <Select
              mode="multiple"
              placeholder="Select countries"
              showSearch
              style={{ width: '100%',  }} // Note: Horizontal padding won't work on the Select input, use CSS for vertical padding
              //   options={countryOptions}
              value={selectedCountries}
              onChange={setSelectedCountries}
              tagRender={(props) => tagRender(props, "countries")} // Pass source as 'countries'
              optionLabelProp="label" // This displays the label (and you can also show flag)
              labelInValue // Ensures you get both value and label when selected
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              disabled={isEditing} // Disable input if not in edit mode

            >
              {countryOptions.map((option) => (
                <Select.Option key={option.value} value={option.value} label={option.label}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={option.flag}
                      alt={option.label}
                      style={{ width: 20, height: 16, marginRight: 8 }}
                    />
                    {option.label}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </ArgonBox>

          <ArgonBox>
            <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
              Select categories <span style={{ fontSize: 12, fontStyle: 'italic' }}>
              (Click on the input to choose several options from the dropdown menu)
              </span>
            </ArgonTypography>

            {/* Categories Multi Select */}
            <Select
              showSearch
              mode="multiple"
              placeholder="Select categories"
              style={{ width: "100%"}}
              // options={categoryOptions}
              value={selectedCategories}
              onChange={setSelectedCategories}
              tagRender={(props) => tagRender(props, "categories")} // Pass source as 'categories'
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              disabled={isEditing} // Disable input if not in edit mode

            >
              {categoryOptions.map((option) => (
                <Select.Option key={option.value} value={option.value} label={option.label}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={option.flag}
                      alt={option.label}
                      style={{ width: 24, height: 19, marginRight: 8 }}
                    />
                    {option.label}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </ArgonBox>

          <ArgonBox>
            <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
              Select brands <span style={{ fontSize: 12, fontStyle: 'italic' }}>
              (Click on the input to choose several options from the dropdown menu)
              </span>
            </ArgonTypography>

            {/* Brands Multi Select */}
            <Select
              showSearch
              mode="multiple"
              placeholder="Select brands"
              style={{ width: "100%" }}
              // options={brandOptions}
              value={selectedBrands}
              onChange={setSelectedBrands}
              tagRender={(props) => tagRender(props, "brands")} // Pass source as 'brands'
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              disabled={isEditing} // Disable input if not in edit mode

            >
              {brandOptions.map((option) => (
                <Select.Option key={option.value} value={option.value} label={option.label}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={option.flag}
                      alt={option.label}
                      style={{ width: 24, height: 19, marginRight: 8 }}
                    />
                    {option.label}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </ArgonBox>

          <ArgonBox>
            <ArgonTypography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 1 }}>
              Select products <span style={{ fontSize: 12, fontStyle: 'italic' }}>
              (Click on the input to choose several options from the dropdown menu)
              </span>
            </ArgonTypography>

            {/* Products Multi Select */}
            <Select
              showSearch
              mode="multiple"
              placeholder="Select products"
              style={{ width: "100%" }}
              // options={productOptions}
              value={selectedProducts}
              onChange={setSelectedProducts}
              tagRender={(props) => tagRender(props, "products")} // Pass source as 'products'
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              disabled={isEditing} // Disable input if not in edit mode

            >
              {productOptions.map((option) => (
                <Select.Option key={option.value} value={option.value} label={option.label}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={option.flag}
                      alt={option.label}
                      style={{ width: 24, height: 19, marginRight: 8 }}
                    />
                    {option.label}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </ArgonBox>
        </Space>
      )}

 
      {!isEditing && (
        <ArgonBox mt={3} width="100%" display="flex" justifyContent="flex-end">
        <ArgonButton
          variant="gradient"
          color="secondary"
          onClick={handleSubmit}
          disabled={ submitLoading} // Disable button when loading
        >
          {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Save"}
        </ArgonButton>
      </ArgonBox>
      )}
      
    </ArgonBox>
  );
}

EditAndViewFeatured.propTypes = {
  featureId: PropTypes.number,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClose: PropTypes.func.isRequired,
  flag: PropTypes.string,
};

export default EditAndViewFeatured;
