import { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';

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
import EditProductInfo from "./components/EditProductInfo/EditProductInfo";
import { updateBrand } from "globalStore/Slices/categoriesSlice";
import { updateProduct } from "globalStore/Slices/productSlice";



const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";

function getSteps() {
  return ["1. Product Info", "2. Media", "3. Social", "4. Pricing"];``
}

function getStepContent(stepIndex, formData, handleChange,handleImageChange, errors, initialImage) {
  switch (stepIndex) {
    case 0:
      return <EditProductInfo formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} errors={errors}  initialImage={initialImage}/>;
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

function EditProductt({ product, onClose }) {

  console.log(product.id, 'in_response')
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

console.log(product, 'produccctttt')

useEffect(() => {
  if (product && categories.length > 0 && brands.length > 0) {

    // setFormData({
    //   brand_name: Number(product.brand_id) || "",
    //   product_name: product.product_name || "",

    //   // Append brand name and category name
    

    //   description: product.description || "",
    //   category: Number(product.category_id) || "",
    //   reason: product.reason || "",
    //   status: product.status || "",
    //   reference: product.reference || "",
    //   image: product.logo || ""
    // });
    setFormData({
      product_name: product.product_name || "",
      brand_name: Number(product.brand_id) || "",
      description: product.description || "",
     category: Number(product.category_id) || "",
      reason: product.reason || "",
      status: product.status || "",
      reference: product.reference || "",
      image: product.logo || null
    });
    console.log(Number(product.brand_id), 'brandidddddddddddddddddddddddd' )

  }
}, [product, categories, brands]);

const myImage = formData.image;


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
    // if (!validateForm()) return; // Only submit if form is valid
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
        const action = await dispatch(updateProduct({ productId: product?.id, updateData: data }));
        if (action.meta.requestStatus === 'fulfilled') {
        setAlert({ open: true, message: "Product updated successfully!", severity: "success" });
        setFormData({
          product_name: "",
          brand_name: "",
          description: "",
          category: "",
          reason: "",
          status: "",
          reference: "",
          image: null
        });
  
        // Optional: Navigate to another page or refresh the list
        setTimeout(() => {
         onClose()
        }, 500);
        window.location.reload()
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
   
    <>
                    <ArgonBox>
                      {getStepContent(activeStep, formData, handleChange,handleImageChange, errors, myImage )}
                      <ArgonBox mt={3} width="100%" display="flex" justifyContent="space-between">
                        <ArgonButton variant="gradient" color="secondary" onClick={handleSubmit}
                          disabled={loading} // Disable button when loading
                          >
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
EditProductt.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  };
export default EditProductt;
