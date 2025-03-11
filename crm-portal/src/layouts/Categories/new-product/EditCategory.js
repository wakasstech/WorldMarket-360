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

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";



function EditCategory({ category, onClose }) {
  // const location = useLocation();
  // const { category } = location.state;
const dispatch  = useDispatch();
  const [formData, setFormData] = useState({
    category_name: "",
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
    if (category) {
      console.log(category);
      setFormData({
        category_name: category.name || "",
        description: category.category_description || "",
        image: category.category_image || ""
      });
    }
  }, [category]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category_name) newErrors.category_name = "Category Name is required";
    if (!formData.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
   
    if (!validateForm()) return; // Only submit if form is valid

  const myCategoryName = formData.category_name;
  const myCategoryDes = formData.description;
  const myCategoryImage = formData.image;
  const categoryId =  category?.id;
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
    data.append('name', myCategoryName);
    data.append('category_description', myCategoryDes);
// Assuming myCategoryImage is a File object, you can append it directly
if (myCategoryImage) {
  data.append('category_image', myCategoryImage)
} else {
  console.error('myCategoryImage is not a valid File object');
}
setLoading(true); // Set loading state to true

try {

  const action =  await dispatch(updateCategory({ categoryId: categoryId, updateData: data }));
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
    setAlert({ open: true, message: "Category with this name already exists. Please choose a different name.", severity: "error" });
  } else {
    setAlert({ open: true, message: errorMessage, severity: "error" });
  }
}

} catch (error) {
  setAlert({ open: true, message: "Failed to update category. Please try again.", severity: "error" });
}   finally {
  setLoading(false); // Set loading state to false
}


  };


  return (
  
     <>
                       <ArgonBox>
                        <ArgonTypography variant="h5">Edit Category Information</ArgonTypography>
                        <ArgonBox mt={3}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                              <FormField
                                type="text"
                                label="Category Name"
                                placeholder="eg. Food"
                                name="category_name"
                                value={formData.category_name}
                                onChange={handleChange}
                                error={errors.category_name}
                                isValid={!errors.category_name && formData.category_name}
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
                                placeholder="Enter a description of the category"
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
                              {errors.image && (
                                <ArgonTypography variant="caption" color="error">
                                  {errors.image}
                                </ArgonTypography>
                              )}
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
  category: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default EditCategory;
