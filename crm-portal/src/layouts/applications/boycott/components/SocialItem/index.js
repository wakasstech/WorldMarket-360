import React from "react";
import PropTypes from "prop-types";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonProgress from "components/ArgonProgress";
import typography from "assets/theme/base/typography";

function SocialItem({ image, title, percentage }) {
  const { size } = typography;

  return (
    <ArgonBox width="100%" py={1} mb={1}>
      <ArgonBox display="flex" justifyContent="space-between" mb={1}>
        <ArgonBox display="flex" alignItems="center" lineHeight={0}>
          <ArgonBox mr={1} fontSize={size.lg}>
            <img src={image} alt={title} width="30" />
          </ArgonBox>
          <ArgonTypography variant="button" fontWeight="medium" color="text">
            {title}
          </ArgonTypography>
        </ArgonBox>
        <ArgonTypography variant="button" fontWeight="medium" color="text">
          {percentage} Products
        </ArgonTypography>
      </ArgonBox>
      <ArgonProgress value={percentage} color="dark" />
    </ArgonBox>
  );
}

SocialItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default SocialItem;
