
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ActionCell() {
  const navigate = useNavigate()

  return (
    <ArgonBox display="flex" alignItems="center">
      {/* <ArgonTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Preview product" placement="top">
          <Icon>visibility</Icon>
        </Tooltip>
      </ArgonTypography> */}
      <ArgonBox mx={2}>
        <ArgonTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: "pointer", lineHeight: 0 }}
          // onClick = {()=>navigate(`/product_managment/products/edit-product/${id}`)}
        >
          <Tooltip title="Edit product" placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </ArgonTypography>
      </ArgonBox>
      <ArgonTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Delete product" placement="left">
          <Icon >delete</Icon>
        </Tooltip>
      </ArgonTypography>
    </ArgonBox>
  );
}

ActionCell.propTypes = {
  handleDelete : PropTypes.func,
  id : PropTypes.int
  };
  

export default ActionCell;
