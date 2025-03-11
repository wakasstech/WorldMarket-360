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

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// EditProduct page components
import ProductImage from "layouts/ecommerce/products/edit-product/components/ProductImage";
import ProductInfo from "layouts/ecommerce/products/edit-product/components/ProductInfo";
import Socials from "layouts/ecommerce/products/edit-product/components/Socials";
import Pricing from "layouts/ecommerce/products/edit-product/components/Pricing";
import {useState , useEffect} from 'react'
import useFetch from "hooks/useFetch";
import usePut from "hooks/usePut";
import { useParams } from 'react-router-dom';
import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project


function EditProduct(props) {
  const [formData, setFormData] = useState({
    product_name: "",
    brand_name: "",
    description: "",
    category: "",
    reason: "",
    status: "",
    reference: ""
  });
  const { id } = useParams();
  console.log("iddddddddddddddddd" , id)

  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });


  const {data : productInfo , loading , productLoading , error : productInforError} = useFetch(`/products/getProductsById/?id=${id}`)
  const {data : updateData , loading : updateLoading , error : updateError , putData} = usePut(`/products/editProduct/?id=${id}`)
  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(()=>{
    if(productInfo){
      setFormData(productInfo)
    }
  } , [productInfo])


 const handleSave = async ()=>{
  try{
    const result =await  putData(formData);
    setAlert({ open: true, message: "Product Updated Successfully!", severity: "success" });
  }
  catch(err){
    setAlert({ open: true, message: "Error Occurred!", severity: "error" });
  }
 } 


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
        <ArgonBox mb={3} position="relative">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} lg={6}>
              <ArgonTypography variant="h4" color="white" fontWeight="medium">
                Make the changes below
              </ArgonTypography>
              <ArgonBox mt={1} mb={2}>
                <ArgonTypography variant="body2" color="white">
                  We&apos;re constantly trying to express ourselves and actualize our dreams. If you
                  have the opportunity to play.
                </ArgonTypography>
              </ArgonBox>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ArgonBox display="flex" justifyContent="flex-end">
                <ArgonButton variant="outlined" color="white" onClick = {handleSave}>
                  Save
                </ArgonButton>
              </ArgonBox>
            </Grid>
          </Grid>
        </ArgonBox>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} lg={4}>
            <ProductImage />
          </Grid> */}
          <Grid item xs={12} lg={8}>
            <ProductInfo handleChange={handleChange} formData={formData}/>
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <Socials />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Pricing />
          </Grid> */}
        </Grid>
      </ArgonBox>
      <Footer />
      <ArgonSnackbar
        color={alert.severity}
        title="Message"
        content={alert.message}
        open={alert?.open}
        close={() => setAlert({ ...alert, open: false })}
  />
    </DashboardLayout>
  );
}

export default EditProduct;
