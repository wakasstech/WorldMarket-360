import { Grid } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonEditor from "components/ArgonEditor";
import ArgonSelect from "components/ArgonSelect";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import PropTypes from "prop-types";


function ProductInfo({ formData, handleChange }) {
  return (
    <ArgonBox>
      <ArgonTypography variant="h5">Product Information</ArgonTypography>
      <ArgonBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Product Name"
              placeholder="eg.Mac Book"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Brand Name"
              placeholder="eg.Apple"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </ArgonBox>
      <ArgonBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <ArgonTypography component="label" variant="caption" fontWeight="bold">
                Description&nbsp;&nbsp;
                <ArgonTypography variant="caption" fontWeight="regular" color="text">
                  (optional)
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
            <ArgonEditor
              name="description"
              value={formData.description}
              handleChange = {handleChange}
            />
          </Grid>
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
                  { value: "Food", label: "Food Items" },
                  { value: "electronics", label: "Electronics" },
                  { value: "furniture", label: "Furniture" },
                  { value: "others", label: "Others" },
                  { value: "real estate", label: "Real Estate" },
                ]}
              />
            </ArgonBox>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormField
                  type="text"
                  label="Reason"
                  placeholder="eg. Supporting Israel in Gaza war with Funds"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
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
                { value: "approved", label: "Approved" },
                { value: "disapproved", label: "Dis Approved" }
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <FormField
              type="text"
              label="Reference Link"
              placeholder="eg.google.com"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </ArgonBox>

      
    </ArgonBox>
  );
}

ProductInfo.propTypes = {
formData : PropTypes.object,
handleChange : PropTypes.func,
};


export default ProductInfo;
