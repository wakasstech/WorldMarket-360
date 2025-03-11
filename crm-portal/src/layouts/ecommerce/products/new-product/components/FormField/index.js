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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";

function FormField({ label, error, isValid, ...rest }) {
  return (
    <>
      <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <ArgonTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </ArgonTypography>
      </ArgonBox>
      <ArgonInput
        {...rest}
        style={{
          borderColor: error ? 'red' : isValid ? 'transparent' : undefined,
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
        
      />
      {error && (
        <ArgonTypography variant="caption" color="red" sx={{color: 'red'}}>
          {error}
        </ArgonTypography>
      )}
    </>
  );
}

// Typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  isValid: PropTypes.bool,
};

export default FormField;

