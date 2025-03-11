import { Grid, TextareaAutosize } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

import PropTypes from "prop-types";
import FormField from "../FormField";
import ArgonSelect from "components/ArgonSelect";

function EditBrandInfo({ formData, handleChange, errors }) {
  return (
    <ArgonBox>
      <ArgonTypography variant="h5">Edit Brand Information</ArgonTypography>
      <ArgonBox mt={3}>
        <Grid container spacing={3}>
        
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Brand Name"
              placeholder="eg. Apple"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleChange}
              error={errors.brand_name}
              isValid={!errors.brand_name && formData.brand_name}
            />
          </Grid>
            
        </Grid>
      </ArgonBox>
      <ArgonBox mt={2}>
        <Grid container spacing={3}>
          
          <Grid item xs={12} sm={6}>
            <ArgonBox mb={3}>
              <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <ArgonTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  Category
                </ArgonTypography>
              </ArgonBox>
              <ArgonSelect
                name="category"
                value={{ value: formData.category, label: formData.category }}
                onChange={(selected) => handleChange({ target: { name: "category", value: selected.value } })}
                options={[
                  { value: "clothing", label: "Clothing" },
                  { value: "food", label: "Food Items" },
                  { value: "electronics", label: "Electronics" },
                  { value: "furniture", label: "Furniture" },
                  { value: "others", label: "Others" },
                  { value: "real estate", label: "Real Estate" },
                ]}
                error={errors.category}
                isValid={!errors.category && formData.category}
                isSearchable ={false} // Prevent users from typing their own values
              />
              {errors.category && (
                <ArgonTypography variant="caption" color="red" sx={{color: 'red'}}>
                  {errors.category}
                </ArgonTypography>
              )}
            </ArgonBox>
            {/* <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormField
                  type="text"
                  label="Reason"
                  placeholder="eg. Supporting Israel in Gaza war with Funds"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  error={errors.reason}
                  isValid={!errors.reason && formData.reason}
                />
              </Grid>
            </Grid> */}
          </Grid>

          <Grid item xs={12} sm={12}>
         
           
           <FormField
             type="text"
             label="description"
             placeholder="Enter a description of the category"
             name="description"
             value={formData.description}
             onChange={handleChange}
             error={errors.description}
             multiline
             rows={5} // Specify the number of rows for the textarea
             style={{ width: '100%', marginTop: '8px' }} // Adjust width and other styles as needed
           />
         
          </Grid>

          {/* <Grid item xs={12}>
            <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Status
              </ArgonTypography>
            </ArgonBox>
            <ArgonSelect
              name="status"
              value={{ value: formData.status, label: formData.status }}
              onChange={(selected) => handleChange({ target: { name: "status", value: selected.value } })}
              options={[
                { value: "in_boycott", label: "in_boycott" },
                { value: "questionable", label: "questionable" }
              ]}
              error={errors.status}
              isValid={!errors.status && formData.status}
              isClearable={false} // Prevent users from typing their own values
            />
            {errors.status && (
                <ArgonTypography variant="caption" color="red" sx={{color: 'red'}}>
                  {errors.status}
                </ArgonTypography>
              )}
          </Grid>

          <Grid item xs={12}>
            <FormField
              type="text"
              label="Reference Link"
              placeholder="eg. google.com"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              error={errors.reference}
              isValid={!errors.reference && formData.reference}
            />
          </Grid> */}
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}

EditBrandInfo.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
};

export default EditBrandInfo;





