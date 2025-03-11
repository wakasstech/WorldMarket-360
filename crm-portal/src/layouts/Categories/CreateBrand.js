import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { Grid, Card, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
import usePost from "hooks/usePost";
import  {useNavigate} from 'react-router-dom'
import BrandInfo from "./new-product/components/BrandInfo";
import Header from "./new-product/components/Header";
import { createBrand } from "globalStore/Slices/categoriesSlice";
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";



const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

function getSteps() {
  return ["1. Product Info", "2. Media", "3. Social", "4. Pricing"];``
}

function getStepContent(stepIndex, formData, handleChange, errors) {
  switch (stepIndex) {
    case 0:
      return <BrandInfo formData={formData} handleChange={handleChange} errors={errors}/>;
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

function CreateBrand() {
  const dispatch = useDispatch();

  const { categories } = useSelector(state => state.categories);
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
  const { data: productCreationData, loading: productCreationLoading, error: productCreationError, postData: productCreationPostData } = usePost('/products/addProduct');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state

  const [countryOptions, setCountryOptions] = useState([]);

  const navigate = useNavigate();
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));

  //   // Clear specific error when input changes
  //   setErrors((prev) => ({ ...prev, [name]: "" }));
  // };
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
    setFormData((prev) => ({ ...prev, image: fileList.length > 0 ? fileList[0] : null }));

    // Clear specific error when image changes
    setErrors((prev) => ({ ...prev, image: '' }));
  };


  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);
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

  const handleSubmit = async () => {
    if (!validateForm()) return; // Only submit if form is valid
    
    // try {
    //   await productCreationPostData(formData);
    //   setAlert({ open: true, message: "Product created Successfully!", severity: "success" });
    //   setTimeout(() => {
    //     navigate('/product_managment/products/products-list');
    //   }, 500);
    // } catch (error) {
    //   setAlert({ open: true, message: "Failed to create product. Please try again.", severity: "error" });
    // }
    const myBrandName = formData?.brand_name;
    const myCategoryValue = formData.category;
  const myBrandDes = formData.description;
  const myBrandImage = formData.image;
  const myCountry = formData.country;
  const myContinent = formData.continent_name;


console.log(myCategoryValue,myBrandName )
  const data = new FormData();
    
    // Append form data from state
    // for (let key in formData) {
    //   data.append(key, formData[key]);
    // }

    // Append custom key-value pairs

    data.append('name', myBrandName);
    data.append('brand_description', myBrandDes);
    data.append('category_id', myCategoryValue);
    data.append('country_name', myCountry );

    data.append('country_continent', myContinent);


      // Assuming myCategoryImage is a File object, you can append it directly
      if (myBrandImage) {
        data.append('brand_image', myBrandImage?.originFileObj)
      } else {
        console.error('brand image is not a valid File object');
      }
      setLoading(true); // Set loading state to true

    try {
      const action = await dispatch(createBrand(data));
      if (action.meta.requestStatus === 'fulfilled') {
      setAlert({ open: true, message: "Product created successfully!", severity: "success" });
      setFormData({
        category_name: "",
        description: "",
        image: null
      });

      // Optional: Navigate to another page or refresh the list
      setTimeout(() => {
        navigate('/boycott/brands-list');
        // window.location.reload();
      }, 500);

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
      setAlert({ open: true, message: "Failed to create brand. Please try again.", severity: "error" });
    }   finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
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
  >
      <Header hide={true}/>
      <ArgonBox mt={3} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Card sx={{ overflow: "visible" }}>
                  <ArgonBox p={2}>
                    <ArgonBox>
                    <BrandInfo formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} errors={errors} countryOptions={countryOptions}/>
                      {/* {getStepContent(activeStep, formData, handleChange, errors)} */}
                      <ArgonBox mt={3} width="100%" display="flex" justifyContent="space-between">
                        {/* <ArgonButton variant="gradient" color="secondary" onClick={handleSubmit}
                          disabled={loading} >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Create'}

                        </ArgonButton> */}
                      </ArgonBox>
                    </ArgonBox>
                  </ArgonBox>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ArgonBox>
      {/* <Footer /> */}
      <ArgonSnackbar
        color={alert.severity}
        title="Message"
        content={alert.message}
        open={alert.open}
        close={() => setAlert({ ...alert, open: false })}
      />
    </DashboardLayout>
  );
}

export default CreateBrand;
