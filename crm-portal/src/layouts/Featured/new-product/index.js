import { useState } from "react";
import { Grid, Card, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ArgonSnackbar from "components/ArgonSnackbar"; // Assuming ArgonSnackbar is a snackbar component in your project
import usePost from "hooks/usePost";
import  {useNavigate} from 'react-router-dom'
import Header from "./components/Header";
import { createCategory } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import ArgonTypography from "components/ArgonTypography";
import Featured from "./components/MultiSelectionFeatured/MultiSelectionFeatured";
import TextArea from "antd/es/input/TextArea";



const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";





function NewCategory() {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    category_name: "",

  


  });

  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  const [loading, setLoading] = useState(false); // Add loading state


 

 
 

  
 

const handleSubmit = async () => {
  
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
                  <ArgonTypography variant="h4" style={{fontWeight: 'bold', textAlign: 'center', textDecoration: 'underline'}}>Feature items</ArgonTypography>

                    <ArgonBox>
                      {/* <ArgonBox mt={3} width="100%" display="flex" justifyContent="flex-end">
                        <ArgonButton variant="gradient" color="secondary" 
                        onClick={handleSubmit}
                        disabled={loading} // Disable button when loading
                        >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create'}

                        </ArgonButton>
                      </ArgonBox> */}
                      <Featured/>
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
