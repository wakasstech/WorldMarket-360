import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Grid, Card, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
import usePost from "hooks/usePost";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryInfo from "./components/CategoryInfo";
import Header from "./components/Header";
import ArgonTypography from "components/ArgonTypography";
import FormField from "./components/FormField";
import EditMedia from "./components/Media/EditMedia";
import { updateCategory } from "globalStore/Slices/categoriesSlice";
import { createCategory } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import { updateAd } from "globalStore/Slices/adsSlice";

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";



function EditCategory({ adData, onClose }) {
  // const location = useLocation();
  // const { adData } = location.state;
const dispatch  = useDispatch();
  const [formData, setFormData] = useState({
    ad_name: "",
    description: "",
    image: null,
  });
  
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when input changes
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleImageChange = (fileList) => {
    setFormData((prev) => ({ ...prev, image: fileList.length > 0 ? fileList[0]?.originFileObj : "null" }));

    // Clear specific error when image changes
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  useEffect(() => {
    if (adData) {
      console.log(adData, 'edit ad data');
      setFormData({
        ad_name: adData.title || "",
        description: adData.description || "",
        image: adData.image || ""
      });
    }
  }, [adData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.ad_name) newErrors.ad_name = "Category Name is required";
    if (!formData.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Only submit if form is valid

  const myCategoryName = formData.ad_name;
  const myCategoryDes = formData.description;
  const myCategoryImage = formData.image;
  const categoryId =  adData?.id;
  if(myCategoryName && (myCategoryImage === "null"))
    {
      setAlert({ open: true, message: "Image is required", severity: "error" });
      return;
    } 
    
    console.log("here")
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
  data.append('image', myCategoryImage)
} else {
  console.error('myAdImage is not a valid File object');
}
setLoading(true); // Set loading state to true

try {

  const action =  await dispatch(updateAd({ adId: categoryId, updateData: data }));
  if (action.meta.requestStatus === 'fulfilled') {
  setAlert({ open: true, message: "Ad posted successfully!", severity: "success" });
  setFormData({
    ad_name: "",
    description: "",
    image: null
  });

  // Optional: Navigate to another page or refresh the list
  setTimeout(() => {
    onClose(); // Close the modal after update

  }, 500);
  window.location.reload();
}  else if (action.meta.requestStatus === 'rejected') {
  const errorMessage = action.error.message || "Failed to post ad. Please try again.";
  console.log(`Error: ${errorMessage}`);

  // Check if the error message includes "409" and show a specific message
  if (errorMessage.includes('409')) {
    setAlert({ open: true, message: "Ad with this name already exists. Please choose a different name.", severity: "error" });
  } else {
    setAlert({ open: true, message: errorMessage, severity: "error" });
  }
}

} catch (error) {
  setAlert({ open: true, message: "Failed to update adData. Please try again.", severity: "error" });
}   finally {
  setLoading(false); // Set loading state to false
}


  };


  return (
  
     <>
                       <ArgonBox>
                        <ArgonTypography variant="h5">Edit Ad Information</ArgonTypography>
                        <ArgonBox mt={3}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                              <FormField
                                type="text"
                                label="Category Name"
                                placeholder="eg. Food"
                                name="ad_name"
                                value={formData.ad_name}
                                onChange={handleChange}
                                error={errors.ad_name}
                                isValid={!errors.ad_name && formData.ad_name}
                              />
                            </Grid>
                          </Grid>
                        </ArgonBox>
                        <ArgonBox mt={2}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                              <FormField
                                type="text"
                                label="description"
                                placeholder="Enter a description of the adData"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                error={errors.description}
                                multiline
                                rows={5} // Specify the number of rows for the textarea
                                style={{ width: "100%", marginTop: "8px" }} // Adjust width and other styles as needed
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <EditMedia handleImageChange={handleImageChange} initialImage={formData?.image}/>
                              {/* {errors.image && (
                                <ArgonTypography variant="caption" color="error">
                                  {errors.image}
                                </ArgonTypography>
                              )} */}
                            </Grid>
                          </Grid>
                        </ArgonBox>
                      </ArgonBox>
                      <ArgonBox mt={3} width="100%" display="flex" justifyContent="space-between">
                        <ArgonButton variant="gradient" color="secondary" onClick={handleSubmit}
                          disabled={loading} >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Update'}

                        </ArgonButton>
                        </ArgonBox>
                  
      <ArgonSnackbar
        color={alert.severity}
        title="Message"
        content={alert.message}
        open={alert.open}
        close={() => setAlert({ ...alert, open: false })}
      />
   </>
  )
}
// Define the expected prop types
EditCategory.propTypes = {
  adData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default EditCategory;
