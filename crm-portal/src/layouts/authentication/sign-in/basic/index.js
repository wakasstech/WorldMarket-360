import { useState } from "react";
import axios from "../../../../axios/axios";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import {CircularProgress} from '@mui/material'
import ArgonSnackbar from "components/ArgonSnackbar"; 
import { useNavigate } from "react-router-dom";


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";


function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", apiError: "" });
  const [loading , setLoading] = useState(false)
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const navigate = useNavigate()

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "", apiError: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      setLoading(true)
      const response = await axios.post("/users/login", { email, password });
      if (response.status === 200) {
        console.log("Login successful");
      
        localStorage.setItem('jwt' , response.data.token);

        localStorage.setItem('credential' , 'boyCott_$_321');
        setAlert({ open: true, message: "Successfully Logged in. Redirecting you to Dashboard!", severity: "success" });
        setLoading(false)
        setTimeout(()=>{
          navigate('/')
        } , 2000)
      }
      
    } catch (error) {
      setErrors({ ...errors, apiError: "Invalid email or password" });
      setAlert({ open: true, message: "Could not Sign In!", severity: "error" });
      setLoading(false)
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <ArgonBox p={3} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium" sx={{ my: 2 }}>
            Sign in
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox px={6} pb={3} textAlign="center">
          <ArgonBox component="form" role="form" onSubmit={handleSubmit}>
            <ArgonBox mb={2}>
              <ArgonInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
              />
              {errors.email && (
                <ArgonTypography variant="caption" color="error">
                  {errors.email}
                </ArgonTypography>
              )}
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
              />
              {errors.password && (
                <ArgonTypography variant="caption" color="error">
                  {errors.password}
                </ArgonTypography>
              )}
            </ArgonBox>
            {errors.apiError && (
              <ArgonTypography variant="caption" color="error">
                {errors.apiError}
              </ArgonTypography>
            )}
            <ArgonBox mt={4} mb={1}>
              <ArgonButton color="info" fullWidth type="submit" style={{display:'flex' , gap:'10px'}}>
                {loading && (
                    <CircularProgress size={22} />
                )}  
                {
                  loading ? (
                    'Signing In'
                  ):(
                    'Sign In'
                  )
                }
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
      <ArgonSnackbar
      color={alert.severity}
      title="Message"
      content={alert.message}
      open={alert?.open}
      close={() => setAlert({ ...alert, open: false })}
  />
    </BasicLayout>
  );
}

export default Basic;
