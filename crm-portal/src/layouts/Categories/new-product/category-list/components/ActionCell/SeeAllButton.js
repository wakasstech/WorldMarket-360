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
import { Button } from "@mui/material";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import {  useNavigate } from "react-router-dom";

function SeeAllButton() {
    const navigate = useNavigate();
  return (
    <ArgonBox display="flex" alignItems="center">
      <Button onClick={() => 
        navigate("/boycott/brands-list")
        }>See All</Button>
    </ArgonBox>
  );
}

export default SeeAllButton;
