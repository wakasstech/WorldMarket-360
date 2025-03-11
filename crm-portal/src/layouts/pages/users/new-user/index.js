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


function getSteps() {
  return ["User Info", "Address", "Social", "Profile"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    // case 1:
    //   return <Address formData={formData} />;
    // case 2:
    //   return <Socials formData={formData} />;
    // case 3:
    //   return <Profile formData={formData} />;
    default:
      return null;
  }
}

function NewUser() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  // const isLastStep = activeStep === steps.length - 1;
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });


  // const handleBack = () => setActiveStep(activeStep - 1);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post("/users/createUser", values);
      console.log("User created successfully:", response.data);

      console.log(response.status)
      if(response.status == 201){
        setAlert({ open: true, message: "User Created Successfully!", severity: "success" });
      }
      actions.setSubmitting(false);
      actions.resetForm();
      setActiveStep(0);
    } catch (error) {
      console.error("Error creating user:", error);
      setAlert({ open: true, message: "User may already exists with this email!", severity: "error" });
      actions.setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            {/* <Card
              sx={{
                display: "grid",
                alignItems: "center",
                position: "relative",
                height: "6rem",
                borderRadius: "lg",
                mb: 3,
              }}
            >
              <Stepper activeStep={activeStep} sx={{ margin: 0 }} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Card> */}
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <ArgonBox p={2}>
                      <ArgonBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                        })}
                        <ArgonBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          <ArgonButton variant="gradient" color="dark" type='submit' disabled={isSubmitting}>
                            Create User
                          </ArgonButton>
                        </ArgonBox>
                      </ArgonBox>
                    </ArgonBox>
                  </Card>
                </Form>
              )}
            </Formik>
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
