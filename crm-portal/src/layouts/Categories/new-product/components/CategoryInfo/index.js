import React from "react";
import { Grid } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import PropTypes from "prop-types";
import FormField from "../FormField";
import Media from "../Media";
import ArgonSelect from "components/ArgonSelect";

function CategoryInfo({ formData, handleChange, handleImageChange, errors }) {
  return (
    <ArgonBox>
      <ArgonTypography variant="h5">Category Information</ArgonTypography>
      <ArgonBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type="text"
              label="Category Name"
              placeholder="e.g. Food"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              error={errors.category_name}
            />

{/* <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
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
                name="category_name"
                value={{ value: formData.category_name, label: formData.category_name }}
                onChange={(selected) => handleChange({ target: { name: "category_name", value: selected.value } })}
                options={[
                  { value: "Household & Cleaning Products", label: "Household & Cleaning Products" },
                  { value: "Food & Beverages", label: "Food & Beverages" },
                  { value: "Beauty & Personal Care", label: "Beauty & Personal Care" },
                  { value: "Health & Wellness", label: "Health & Wellness" },
                  { value: "Fashion & Apparel", label: "Fashion & Apparel" },
                  { value: "Financial Services", label: "Financial Services" },
                  { value: "Technology & Electronics", label: "Technology & Electronics" },

                  { value: "Retail", label: "Retail" },

                  { value: "Miscellaneous", label: "Miscellaneous" },

                  { value: "Entertainment", label: "Entertainment" },
                  { value: "Perfumes", label: "Perfumes" },
                  { value: "Automotive", label: "Automotive" },
                  { value: "Travel and Booking", label: "Travel and Booking" },
                  { value: "Pet Care", label: "Pet Care" },



                ]}
                error={errors.category_name}
                isValid={!errors.category_name && formData.category_name}
                
              /> */}




          </Grid>
          <Grid item xs={12}>
            <FormField
              type="text"
              label="Description"
              placeholder="Enter a description of the category"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              multiline
              rows={5}
              style={{ width: "100%", marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Media handleImageChange={handleImageChange}  error={errors.image}/>
            {/* {errors.image && (
              <ArgonTypography variant="caption" color="error">
                {errors.image}
              </ArgonTypography>
            )} */}
          </Grid>
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}

CategoryInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CategoryInfo;






// import { useState } from "react";
// import { Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";
// import ArgonSelect from "components/ArgonSelect";
// import FormField from "layouts/ecommerce/products/new-product/components/FormField";
// import PropTypes from "prop-types";

// function CategoryInfo({ formData, handleChange }) {
//   const [categories, setCategories] = useState([
//     { value: "clothing", label: "Clothing" },
//     { value: "food", label: "Food Items" },
//     { value: "electronics", label: "Electronics" },
//     { value: "furniture", label: "Furniture" },
//     { value: "others", label: "Others" },
//     { value: "real estate", label: "Real Estate" },
//   ]);
//   const [open, setOpen] = useState(false);
//   const [newCategory, setNewCategory] = useState({ name: "", description: "" });

//   const handleSelectChange = (selected) => {
//     if (selected.value === "add-new") {
//       setOpen(true);
//     } else {
//       handleChange({ target: { name: "category", value: selected.value } });
//     }
//   };

//   const handleAddCategory = () => {
//     const newCat = { value: newCategory.name.toLowerCase(), label: newCategory.name };
//     setCategories([...categories, newCat]);
//     handleChange({ target: { name: "category", value: newCat.value } });
//     setNewCategory({ name: "", description: "" });
//     setOpen(false);
//   };

//   const handleClose = () => setOpen(false);

//   return (
//     <ArgonBox>
//       <ArgonTypography variant="h5">Product Information</ArgonTypography>
//       <Grid item xs={12} sm={6}>
//         <ArgonBox mb={3}>
//           <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
//             <ArgonTypography
//               component="label"
//               variant="caption"
//               fontWeight="bold"
//               textTransform="capitalize"
//             >
//               Category
//             </ArgonTypography>
//           </ArgonBox>
//           <ArgonSelect
//             name="category"
//             value={{ value: formData.category, label: formData.category }}
//             onChange={handleSelectChange}
//             options={[
//               ...categories,
//               { value: "add-new", label: "Add New+" },
//             ]}
//           />
//         </ArgonBox>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <FormField
//               type="text"
//               label="Reason"
//               placeholder="e.g. Supporting Israel in Gaza war with Funds"
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//             />
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Add Category Modal */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Category</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Category Name"
//             fullWidth
//             value={newCategory.name}
//             onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//           />
//           <TextField
//             margin="dense"
//             label="Description"
//             fullWidth
//             value={newCategory.description}
//             onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">Cancel</Button>
//           <Button onClick={handleAddCategory} color="primary">Save</Button>
//         </DialogActions>
//       </Dialog>
//     </ArgonBox>
//   );
// }

// CategoryInfo.propTypes = {
//   formData: PropTypes.object.isRequired,
//   handleChange: PropTypes.func.isRequired,
// };

// export default CategoryInfo;

