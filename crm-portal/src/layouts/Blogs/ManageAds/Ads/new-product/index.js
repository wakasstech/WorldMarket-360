import { useState } from "react";
import { Grid, Card, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
import usePost from "hooks/usePost";
import  {useNavigate} from 'react-router-dom'
import CategoryInfo from "./components/CategoryInfo";
import Header from "./components/Header";
import { createCategory } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import { createad } from "globalStore/Slices/adsSlice";



const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

function getSteps() {
  return ["1. Product Info", "2. Media", "3. Social", "4. Pricing"];``
}

function getStepContent(stepIndex, formData, handleChange, handleImageChange, errors) {
  switch (stepIndex) {
    case 0:
      return <CategoryInfo formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} errors={errors} />;

    default:
      return null;
  }
}

function NewCategory() {

  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    ad_name: "",

    description: "",
    image: null


  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const { data: productCreationData, loading: productCreationLoading, error: productCreationError, postData: productCreationPostData } = usePost('/products/addProduct');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when input changes
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
 
  const handleImageChange = (fileList) => {
    setFormData((prev) => ({ ...prev, image: fileList.length > 0 ? fileList[0] : "null" }));

    // Clear specific error when image changes
    setErrors((prev) => ({ ...prev, image: '' }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.ad_name) newErrors.ad_name = "Category Name is required";
  
    if (!formData.image) newErrors.image = "Image is required";




    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  // if (!validateForm()) return; // Only submit if form is valid

  const myCategoryName = formData.ad_name;
  const myCategoryDes = formData.description;
  const myCategoryImage = formData.image

  console.log(myCategoryName, myCategoryDes, myCategoryImage);
  if(myCategoryName && (myCategoryImage === "null"))
    {
      setAlert({ open: true, message: "Image is required", severity: "error" });
      return;
    } console.log("here")
  const data = new FormData();
    
    // Append form data from state
    // for (let key in formData) {
    //   data.append(key, formData[key]);
    // }

    // Append custom key-value pairs
    data.append('title', myCategoryName);
    data.append('description', myCategoryDes);
// Assuming myCategoryImage is a File object, you can append it directly
if (myCategoryImage) {
  data.append('image', myCategoryImage?.originFileObj)
} else {
  console.error('myAdImage is not a valid File object');
}
setLoading(true); // Set loading state to true

    try {
      const action = await dispatch(createad(data));
      if (action.meta.requestStatus === 'fulfilled') {
      setAlert({ open: true, message: "Ad posted successfully!", severity: "success" });
      setFormData({
        ad_name: "",
        description: "",
        image: null
      });

      // Optional: Navigate to another page or refresh the list
      setTimeout(() => {
        window.location.reload();
        // navigate('/boycott/categories-list');
      }, 500);
    }  else if (action.meta.requestStatus === 'rejected') {
      const errorMessage = action.error.message || "Failed to post add. Please try again.";
      console.log(`Error: ${errorMessage}`);

      // Check if the error message includes "409" and show a specific message
      if (errorMessage.includes('409')) {
        setAlert({ open: true, message: "Add with this name already exists. Please choose a different name.", severity: "error" });
      } else {
        setAlert({ open: true, message: errorMessage, severity: "error" });
      }
    }
    
    } catch (error) {
      setAlert({ open: true, message: "Failed to post add. Please try again.", severity: "error" });
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
      <Header />
      <ArgonBox mt={3} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Card sx={{ overflow: "visible" }}>
                  <ArgonBox p={2}>
                    <ArgonBox>
                    {getStepContent(activeStep, formData, handleChange, handleImageChange, errors)}
                      {/* <ArgonBox mt={3} width="100%" display="flex" justifyContent="space-between">
                        <ArgonButton variant="gradient" color="secondary" 
                        onClick={handleSubmit}
                        // disabled={loading} // Disable button when loading
                        >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create'}

                        </ArgonButton>
                      </ArgonBox> */}
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

export default NewCategory;
