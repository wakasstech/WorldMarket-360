import { useState } from "react";
import { Formik, Form } from "formik";
import axios from "../../../../axios/axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import UserInfo from "layouts/pages/users/new-user/components/UserInfo";
import validations from "layouts/pages/users/new-user/schemas/validations";
import form from "layouts/pages/users/new-user/schemas/form";
import initialValues from "layouts/pages/users/new-user/schemas/initialValues";
import ArgonSnackbar from "components/ArgonSnackbar"; 
import ArgonTypography from 'components/ArgonTypography'


function getSteps() {
  return ["User Info", "Address", "Social", "Profile"];
}

function NewUser() {
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3} mb={20}>
      <ArgonTypography variant="h5" fontWeight="bold">
          Edit User Information
        </ArgonTypography>
        <ArgonTypography variant="button" fontWeight="regular" color="text">
          Mandatory informations
        </ArgonTypography>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>      
        <ArgonBox>
         <ArgonBox lineHeight={0}>
        <ArgonTypography variant="h5" fontWeight="bold">
          Edit User Information
        </ArgonTypography>
        <ArgonTypography variant="button" fontWeight="regular" color="text">
          Mandatory informations
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <input type='text' value="email" />
          </Grid>
        </Grid>
      </ArgonBox>
   
    </ArgonBox>   
          </Grid>
        </Grid>
      </ArgonBox>
      <ArgonSnackbar
      color={alert.severity}
      title="Message"
      content={alert.message}
      open={alert?.open}
      close={() => setAlert({ ...alert, open: false })}
  />
      <Footer />
    </DashboardLayout>
  );
}

export default NewUser;
