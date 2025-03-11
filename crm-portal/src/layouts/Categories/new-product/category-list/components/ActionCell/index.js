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
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from 'prop-types';

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { useNavigate } from "react-router-dom";
import EditCategoryModal from "./EditCategoryModal ";
import { useState } from "react";

function ActionCell({category}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ArgonBox display="flex" alignItems="center">
      {/* <ArgonTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Preview product" placement="top">
          <Icon>visibility</Icon>
        </Tooltip>
      </ArgonTypography> */}
      <ArgonBox >
        <ArgonTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: "pointer", lineHeight: 0 }}
        >
          <Tooltip title="Edit Category" placement="top" onClick={handleOpen}>
            <Icon>edit</Icon>
            
          </Tooltip>
        </ArgonTypography>
      </ArgonBox>
      {/* <ArgonTypography mx={0.5} variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Delete product" placement="left">
          <Icon>delete</Icon>
        </Tooltip>
      </ArgonTypography> */}

      <EditCategoryModal open={open} onClose={handleClose} category={category} />
    </ArgonBox>
  );
};



ActionCell.propTypes = {
  category: PropTypes.object.isRequired,

};


export default ActionCell;
