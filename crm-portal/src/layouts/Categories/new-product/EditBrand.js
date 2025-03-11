import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Grid, Card, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
import usePost from "hooks/usePost";
import  {useLocation, useNavigate} from 'react-router-dom'
import Header from "./components/Header";
import EditBrandInfo from "./components/BrandInfo/EditBrandInfo";
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateBrand } from "globalStore/Slices/categoriesSlice";
import FaqCollapse from "layouts/pages/pricing-page/components/FaqCollapse";
import axios from "../../../axios/axios";



const bgImage = "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function getSteps() {
  return ["1. Product Info", "2. Media", "3. Social", "4. Pricing"];``
}

function getStepContent(stepIndex, formData, handleChange, errors) {
  switch (stepIndex) {
    case 0:
      return <EditBrandInfo formData={formData} handleChange={handleChange} errors={errors}/>;
    // case 1:
    //   return <Media />;
    // case 2:
    //   return <Socials />;
    // case 3:
    //   return <Pricing />;
    default:
      return null;
  }
}

function EditBrand({ brand, onClose }) {
  // const location = useLocation();


  console.log(brand, 'branddddinfoo')
  // const { brand } = location.state;
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // category_name: "",
    brand_name: "",
    description: "",
    category: "",
    image: null,
      country: "",
    continent_name: ""
    // reason: "",
    // status: "",
    // reference: ""
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [loading, setLoading] = useState(false); // Add loading state
  const [countryOptions, setCountryOptions] = useState([]);

  const { data: productCreationData, loading: productCreationLoading, error: productCreationError, postData: productCreationPostData } = usePost('/products/addProduct');
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const navigate = useNavigate();
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'country') {
      // Find the selected country from the options
      const selectedCountry = countryOptions.find(option => option.value === value);
      // Update formData with both country and continent_name
      setFormData((prev) => ({
        ...prev,
        country: value,
        continent_name: selectedCountry ? selectedCountry.continent : ''
      }));
    } else {
      // Update formData for other fields
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  
    // Clear specific error when input changes
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };
  const handleImageChange = (fileList) => {
    setFormData((prev) => ({ ...prev, image: fileList.length > 0 ? fileList[0]?.originFileObj : null }));

    // Clear specific error when image changes
    setErrors((prev) => ({ ...prev, image: '' }));
  };
  const validateForm = () => {
    const newErrors = {};
    // if (!formData.category_name) newErrors.category_name = "Category Name is required";

    if (!formData.brand_name) newErrors.brand_name = "Brand Name is required";
    if (!formData.category) newErrors.category = "Please choose category";
    if (!formData.image) newErrors.image = "Image is required";

        // if (!formData.description) newErrors.description = "Product Name is required";

    // if (!formData.status) newErrors.status = "Please select status";

    // Add more validation rules as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return; // Only submit if form is valid
    
    const myBrandName = formData.brand_name;
  const myCategory = formData.category;
  const myBrandImage = formData.image;
const myBrandDesc = formData.description;
const brandId =  brand?.id;

const myCountry = formData?.country;
const myCountryContinent = formData?.continent_name;
const data = new FormData();
data.append('name', myBrandName);
data.append('brand_description', myBrandDesc);
data.append('category_id', myCategory);
data.append('country_name', myCountry );

data.append('country_continent', myCountryContinent);

  // Assuming myCategoryImage is a File object, you can append it directly
  if (myBrandImage) {
    data.append('brand_image', myBrandImage)
  } else {
    console.error('brand image is not a valid File object');
  }
  setLoading(true); // Set loading state to true

try {
  const action =  await dispatch(updateBrand({ brandId: brandId, updateData: data }));
  if (action.meta.requestStatus === 'fulfilled') {
  setAlert({ open: true, message: "Product created successfully!", severity: "success" });
  setFormData({
    category_name: "",
    description: "",
    image: null
  });

  // Optional: Navigate to another page or refresh the list
  setTimeout(() => {
    onClose(); // Close the modal after update

  }, 500);
  window.location.reload();
}  else if (action.meta.requestStatus === 'rejected') {
  const errorMessage = action.error.message || "Failed to create product. Please try again.";
  console.log(`Error: ${errorMessage}`);

  // Check if the error message includes "409" and show a specific message
  if (errorMessage.includes('409')) {
    setAlert({ open: true, message: "Brand with this name already exists. Please choose a different name.", severity: "error" });
  } else {
    setAlert({ open: true, message: errorMessage, severity: "error" });
  }
}

} catch (error) {
  setAlert({ open: true, message: "Failed to update brand. Please try again.", severity: "error" });
} finally {
  setLoading(FaqCollapse); // Set loading state to true

}
  };

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    axios.get('/area/getAll-country', {
      headers: {
        'ngrok-skip-browser-warning': '69420'
      }
  })
      .then(response => {
        const data = response.data.map(item => ({
          value: item.country_name,
          label: item.country_name,
          continent: item.country_continent
        }));
        setCountryOptions(data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  useEffect(() => {
    if (brand) {
      console.log(brand, 'nizaqat brandddd for edittttt');
      setFormData({
        brand_name: brand.name || "",
        description: brand.brand_description || "",
        image: brand.brand_image || "",
        category: brand.category_id || "",
        continent_name: brand.country_continent || "",
        country: brand.country_name || "",
      });
    }
  }, [brand]);
  return (
  <>
      
                    <ArgonBox>
                    <EditBrandInfo formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} errors={errors} initialImage={formData?.image} countryOptions={countryOptions}/>
                      {/* {getStepContent(activeStep, formData, handleChange, errors)} */}
                      <ArgonBox mt={3} width="100%" display="flex" justifyContent="space-between">
                        <ArgonButton variant="gradient" color="secondary" onClick={handleSubmit}
                         disabled={loading} >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
                        </ArgonButton>
                      </ArgonBox>
                    </ArgonBox>
                
      <ArgonSnackbar
        color={alert.severity}
        title="Message"
        content={alert.message}
        open={alert.open}
        close={() => setAlert({ ...alert, open: false })}
      />
  </>
  );
}
EditBrand.propTypes = {
  brand: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default EditBrand;
