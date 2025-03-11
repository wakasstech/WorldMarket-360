import { useEffect, useMemo, useState } from "react";
import { Grid, Card, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import ProductInfo from "layouts/ecommerce/products/new-product/components/ProductInfo";
import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
import usePost from "hooks/usePost";
import  {useNavigate} from 'react-router-dom'
import ProductImage from "layouts/ecommerce/products/edit-product/components/ProductImage";
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import { fetchBrands } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createProduct } from "globalStore/Slices/productSlice";



const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

function getSteps() {
  return ["1. Product Info", "2. Media", "3. Social", "4. Pricing"];``
}

function getStepContent(stepIndex, formData, handleChange,handleImageChange, errors) {
  switch (stepIndex) {
    case 0:
      return <ProductInfo formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} errors={errors} />;
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

function NewProduct() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { categories, brands } = useSelector(state => state.categories);

  useEffect(() => {
    if (!brands || brands.length === 0) {
      dispatch(fetchBrands());
    }
  }, [dispatch, brands]);
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  // const dataTableData = useMemo(() => createDataTableData(categories), [categories]);


  const [formData, setFormData] = useState({
    product_name: "",
    brand_name: "",
    description: "",
    category: "",
    reason: "",
    status: "",
    reference: "",
    image: null

  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const { data: productCreationData, loading: productCreationLoading, error: productCreationError, postData: productCreationPostData } = usePost('/products/addProduct');
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
    setFormData((prev) => ({ ...prev, image: fileList.length > 0 ? fileList[0]?.originFileObj : "null" }));

    // Clear specific error when image changes
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.product_name) newErrors.product_name = "Product Name is required";
    if (!formData.brand_name) newErrors.brand_name = "Please select the category for your brand first";
    if (!formData.category) newErrors.category = "Please select category";
    if (!formData.status) newErrors.status = "Please pick status";
    if (!formData.reason) newErrors.reason = "Please give reason";

    if (!formData.image) newErrors.image = "Image is required";

    // Add more validation rules as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // if (!validateForm()) return; // Only submit if form is valid

    // try {
    //   await productCreationPostData(formData);
    //   setAlert({ open: true, message: "Product created Successfully!", severity: "success" });
    //   setTimeout(() => {
    //     navigate('/product_managment/products/products-list');
    //   }, 500);
    // } catch (error) {
    //   setAlert({ open: true, message: "Failed to create product. Please try again.", severity: "error" });
    // }
    if (!validateForm()) return; // Only submit if form is valid
 // Find brand and category names from their respective IDs
 const selectedBrand = brands.find(brand => brand.id === formData.brand_name);
 const selectedCategory = categories.find(category => category.id === formData.category);


    const myProductName = formData.product_name;
    const myBrandName = formData.brand_name;
    const mydescription = formData.description;

    const myCategory = formData.category;
    const myReason = formData.reason;
    const myStatus = formData.status;

    const myReference = formData.reference;
    const myImage = formData.image;


    // if(myCategoryName && (myCategoryImage === "null"))
    //   {
    //     setAlert({ open: true, message: "Image is required", severity: "error" });
    //     return;
    //   } 
    const data = new FormData();
      
    
    data.append('brand_id', myBrandName);
    data.append('category_id', myCategory);
      data.append('description', mydescription);
      data.append('product_name', myProductName);
      data.append('reason', myReason);
      data.append('status', myStatus);
      data.append('reference', myReference);
      // Append brand name and category name
  data.append('brand_name', selectedBrand ? selectedBrand.name : '');
  data.append('category_name', selectedCategory ? selectedCategory.name : '');
  // Assuming myCategoryImage is a File object, you can append it directly
  if (myImage) {
    data.append('logo', myImage)
  } else {
    console.error('brand logo is not a valid File object');
  }
  setLoading(true); // Set loading state to true

      try {
        const action = await dispatch(createProduct(data));
        if (action.meta.requestStatus === 'fulfilled') {
        setAlert({ open: true, message: "Product created successfully!", severity: "success" });
        setFormData({
          category_name: "",
          description: "",
          image: null
        });
        // Optional: Navigate to another page or refresh the list
        setTimeout(() => {
          navigate('/product_managment/products/products-list');
        }, 500);
       
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
        setAlert({ open: true, message: "Failed to create product. Please try again.", severity: "error" });
      } finally {
        setLoading(false); // Set loading state to true

      }
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
      <ArgonBox mt={1} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Card sx={{ overflow: "visible" }}>
                  <ArgonBox p={2}>
                    <ArgonBox>
                      {getStepContent(activeStep, formData, handleChange,handleImageChange, errors)}
                      <ArgonBox mt={3} width="100%" display="flex" justifyContent="space-between">
                        {/* <ArgonButton variant="gradient" color="secondary" onClick={handleSubmit}
                         disabled={loading} // Disable button when loading
                         >
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

export default NewProduct;
