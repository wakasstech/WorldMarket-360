import { useState } from "react";
import { Grid, Card,  CircularProgress } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
import BlogEditor from "../Components/BlogEditor/BlogEditor";






const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";



function NewCategory() {


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
      {/* <Header /> */}
      <ArgonBox mt={3} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={12}>
           
                <Card sx={{ overflow: "visible" }}>
                    <ArgonBox>
                      <ArgonBox mt={3} width="100%" display="flex" justifyContent="space-between">
                      <BlogEditor />
                      </ArgonBox>
                   
                  </ArgonBox>
                </Card>
             
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
