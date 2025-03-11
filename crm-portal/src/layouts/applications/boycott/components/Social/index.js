import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import SocialItem from "../SocialItem/index";
import ArgonButton from "components/ArgonButton";
import { Link } from "react-router-dom";

function Social({ brandData }) {

  console.log(brandData, 'brand data')
  return (
    <Card sx={{ height: "100%" }}>
      <ArgonBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <ArgonTypography variant="h6">Brands</ArgonTypography>
        <Tooltip title="See the number of products per brand" placement="bottom">
          {/* <ArgonTypography variant="body2" color="textSecondary">
            See the number of products per brand
          </ArgonTypography> */}
          <span style={{ color: 'lightgray', fontSize: '0.875rem' }}>
          See the number of products per brand
        </span>
        </Tooltip>
      </ArgonBox>
      <ArgonBox p={2}>
        {brandData?.map((brand, index) => (
          <SocialItem
            key={index}
            image={brand.image}
            title={brand.name}
            percentage={brand.count}
          />
        ))}
      </ArgonBox>
      <ArgonBox display="flex" justifyContent="flex-end" mt={2}  gap={2} px={2}>
      <Link to="/boycott/brands-list">
        <ArgonButton  
        
          variant="outlined"
          color="dark"
         
        >
          See All Brands
        </ArgonButton>
        </Link>
        <Link to="/product_managment/products/products-list">
        <ArgonButton  
        
          variant="outlined"
          color="dark"
         
        >
          See All Products
        </ArgonButton>
        </Link>
      </ArgonBox>
    </Card>
  );
}

Social.propTypes = {
  brandData: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      
    })
  ).isRequired,
};

export default Social;
