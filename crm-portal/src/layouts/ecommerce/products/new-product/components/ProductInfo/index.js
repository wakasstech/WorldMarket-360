import { Grid } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonEditor from "components/ArgonEditor";
import ArgonSelect from "components/ArgonSelect";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import PropTypes from "prop-types";
import Media from "../Media";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../../../../../axios/axios";

function ProductInfo({ formData, handleChange, handleImageChange, errors }) {

  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const [brandOptions, setBrandOptions] = useState([]);
  
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  useEffect(() => {
    if (formData.category) {
      axios.get(`/categories/getBrandByCategory?category_id=${formData.category}`
        , {
          headers: {
            'ngrok-skip-browser-warning': '69420'
          }
        }
      )
        .then(response => {
          const fetchedBrands = response.data.map(brand => ({
            value: brand.id,
            label: brand.name,
          }));
          setBrandOptions(fetchedBrands);
        })
        .catch(error => {
          console.error("Error fetching brands:", error);
        });
    } else {
      setBrandOptions([]);
    }
  }, [formData.category]);

   
  return (
    <ArgonBox>
      <ArgonTypography variant="h5">Product Information</ArgonTypography>
      <ArgonBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {/* <FormField
              type="text"
              label="Product Name"
              placeholder="eg. Mac Book"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              error={errors.product_name}
              isValid={!errors.product_name && formData.product_name}
            /> */}
             <ArgonBox >
              <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <ArgonTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  Select Category
                </ArgonTypography>
              </ArgonBox>
              <ArgonSelect
                name="category"
                value={categoryOptions.find(option => option.value === formData.category)}
                onChange={(selected) => handleChange({ target: { name: "category", value: selected.value } })}
                options={categoryOptions}
                error={errors.category}
                isValid={!errors.category && formData.category}
                isSearchable={false}
              />
              {errors.category && (
                <ArgonTypography variant="caption" color="red" sx={{color: 'red'}}>
                  {errors.category}
                </ArgonTypography>
              )}
            </ArgonBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <FormField
              type="text"
              label="Brand Name"
              placeholder="eg. Apple"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleChange}
              error={errors.brand_name}
              isValid={!errors.brand_name && formData.brand_name}
            /> */}

          <ArgonBox >
              <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <ArgonTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  Select Brand
                </ArgonTypography>
              </ArgonBox>
              <ArgonSelect
                name="brand_name"
                value={brandOptions.find(option => option.value === formData.brand_name)}
                onChange={(selected) => handleChange({ target: { name: "brand_name", value: selected.value } })}
                options={brandOptions}
                error={errors.brand_name}
                isValid={!errors.brand_name && formData.brand_name}
                isSearchable={false}
              />
              {errors.brand_name && (
                <ArgonTypography variant="caption" color="red" sx={{color: 'red'}}>
                  {errors.brand_name}
                </ArgonTypography>
              )}
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>

      <ArgonBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Product Name"
              placeholder="eg. Mac Book"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              error={errors.product_name}
              isValid={!errors.product_name && formData.product_name}
            />
          
          </Grid>
          <Grid item xs={12} sm={6}>
          <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Pick Status
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
              isSearchable ={false} // Prevent users from typing their own values
            />
            {errors.status && (
                <ArgonTypography variant="caption" color="red" sx={{color: 'red'}}>
                  {errors.status}
                </ArgonTypography>
              )}
         
          </Grid>
        </Grid>
      </ArgonBox>

      <Media handleImageChange={handleImageChange}  error={errors.image}/>


      <ArgonBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <FormField
              type="text"
              label="Reason"
              placeholder={`Give a reason using the example below:\n\nPepsiCo bought SodaStream for $3.2bn and owns 50% of Sabra, both of which had taken advantage of the Israeli occupation of Palestine.`}
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              error={errors.reason}
              multiline
              rows={7} // Specify the number of rows for the textarea
              style={{ width: "100%", marginTop: "8px" }} // Adjust width and other styles as needed
            />
            {errors.reason === "Please give reasonPlease give reason" && (
              <ArgonTypography variant="caption" sx={{ color: "red" }}>
              Please give reason
              </ArgonTypography>
            )}
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
             rows={4} // Specify the number of rows for the textarea
             style={{ width: '100%', marginTop: '8px' }} // Adjust width and other styles as needed
           />
          </Grid>


        

          
       

          <Grid item xs={12}>
            <FormField
              type="text"
              label="Reference Link"
              placeholder="eg. google.com"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              // error={errors.reference}
              // isValid={!errors.reference && formData.reference}
            />
            
          </Grid>
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}

ProductInfo.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  handleImageChange: PropTypes.func.isRequired,

  errors: PropTypes.object,
};

export default ProductInfo;






// import { useState } from "react";
// import { Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";
// import ArgonSelect from "components/ArgonSelect";
// import FormField from "layouts/ecommerce/products/new-product/components/FormField";
// import PropTypes from "prop-types";

// function ProductInfo({ formData, handleChange }) {
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

// ProductInfo.propTypes = {
//   formData: PropTypes.object.isRequired,
//   handleChange: PropTypes.func.isRequired,
// };

// export default ProductInfo;

//Update

// import { Grid } from "@mui/material";
// import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";
// import ArgonEditor from "components/ArgonEditor";
// import ArgonSelect from "components/ArgonSelect";
// import FormField from "layouts/ecommerce/products/new-product/components/FormField";
// import PropTypes from "prop-types";

// function ProductInfo({ formData, handleChange, errors }) {
//   return (
//     <ArgonBox>
//       <ArgonTypography variant="h5">Product Information</ArgonTypography>
//       <ArgonBox mt={3}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <FormField
//               type="text"
//               label="Product Name"
//               placeholder="eg. Mac Book"
//               name="product_name"
//               value={formData.product_name}
//               onChange={handleChange}
//               error={errors.product_name}
//               isValid={!errors.product_name && formData.product_name}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <FormField
//               type="text"
//               label="Brand Name"
//               placeholder="eg. Apple"
//               name="brand_name"
//               value={formData.brand_name}
//               onChange={handleChange}
//               error={errors.brand_name}
//               isValid={!errors.brand_name && formData.brand_name}
//             />
//           </Grid>
//         </Grid>
//       </ArgonBox>
//       <ArgonBox mt={2}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
//               <ArgonTypography component="label" variant="caption" fontWeight="bold">
//                 Description&nbsp;&nbsp;
//                 <ArgonTypography variant="caption" fontWeight="regular" color="text">
//                   (optional)
//                 </ArgonTypography>
//               </ArgonTypography>
//             </ArgonBox>
//             <ArgonEditor
//               name="description"
//               value={formData.description}
//               handleChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <ArgonBox mb={3}>
//               <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
//                 <ArgonTypography
//                   component="label"
//                   variant="caption"
//                   fontWeight="bold"
//                   textTransform="capitalize"
//                 >
//                   Category
//                 </ArgonTypography>
//               </ArgonBox>
//               <ArgonSelect
//                 name="category"
//                 value={{ value: formData.category, label: formData.category }}
//                 onChange={(selected) => handleChange({ target: { name: "category", value: selected.value } })}
//                 options={[
//                   { value: "clothing", label: "Clothing" },
//                   { value: "food", label: "Food Items" },
//                   { value: "electronics", label: "Electronics" },
//                   { value: "furniture", label: "Furniture" },
//                   { value: "others", label: "Others" },
//                   { value: "real estate", label: "Real Estate" },
//                 ]}
//                 error={errors.category}
//                 isValid={!errors.category && formData.category}
//                 isSearchable ={false} // Prevent users from typing their own values
//               />
//               {errors.category && (
//                 <ArgonTypography variant="caption" color="red" sx={{color: 'red'}}>
//                   {errors.category}
//                 </ArgonTypography>
//               )}
//             </ArgonBox>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <FormField
//                   type="text"
//                   label="Reason"
//                   placeholder="eg. Supporting Israel in Gaza war with Funds"
//                   name="reason"
//                   value={formData.reason}
//                   onChange={handleChange}
//                   error={errors.reason}
//                   isValid={!errors.reason && formData.reason}
//                 />
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item xs={12}>
//             <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
//               <ArgonTypography
//                 component="label"
//                 variant="caption"
//                 fontWeight="bold"
//                 textTransform="capitalize"
//               >
//                 Status
//               </ArgonTypography>
//             </ArgonBox>
//             <ArgonSelect
//               name="status"
//               value={{ value: formData.status, label: formData.status }}
//               onChange={(selected) => handleChange({ target: { name: "status", value: selected.value } })}
//               options={[
//                 { value: "in_boycott", label: "in_boycott" },
//                 { value: "questionable", label: "questionable" }
//               ]}
//               error={errors.status}
//               isValid={!errors.status && formData.status}
//               isClearable={false} // Prevent users from typing their own values
//             />
//             {errors.status && (
//                 <ArgonTypography variant="caption" color="red" sx={{color: 'red'}}>
//                   {errors.status}
//                 </ArgonTypography>
//               )}
//           </Grid>

//           <Grid item xs={12}>
//             <FormField
//               type="text"
//               label="Reference Link"
//               placeholder="eg. google.com"
//               name="reference"
//               value={formData.reference}
//               onChange={handleChange}
//               error={errors.reference}
//               isValid={!errors.reference && formData.reference}
//             />
//           </Grid>
//         </Grid>
//       </ArgonBox>
//     </ArgonBox>
//   );
// }

// ProductInfo.propTypes = {
//   formData: PropTypes.object,
//   handleChange: PropTypes.func,
//   errors: PropTypes.object,
// };

// export default ProductInfo;