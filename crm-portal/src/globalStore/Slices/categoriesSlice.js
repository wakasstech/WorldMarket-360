// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from "../../utils/axios";

// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
//   const response = await axios.get('/category/get-all-category');
//   return response.data;
// });

// const initialState = {
//     categories: null,
//     loading: false,
//     error: null,
//   };

// const categoriesSlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {
//     startLoading: (state) => {
//         state.loading = true;
//       },
//       stopLoading: (state) => {
//         state.loading = false;
//       },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
        
//         state.categories = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const {
   
//     startLoading,
//     stopLoading,
//   } = categoriesSlice.actions;

// export default categoriesSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../api/axios';
import axios from "../../axios/axios";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('/categories/CategoryAll', {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  });  return response.data;
});
export const fetchBrands = createAsyncThunk('categories/fetchBrands', async () => {
  const response = await axios.get('/brands/brandAll', {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  });  return response.data.brands;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (categoryData) => {
  const response = await axios.post('/categories/createCategory', categoryData);
  return response.data;
});

export const createBrand = createAsyncThunk('categories/createBrand', async (brandData) => {
  const response = await axios.post(`/brands/createBrand`, brandData);
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ categoryId, updateData }) => {
 console.log("hello")
  const response = await axios.put(`/categories/updatecategory?id=${categoryId}`, updateData);
  console.log(response)
  return response.data;
});

export const updateBrand = createAsyncThunk('brands/updateBrand', async ({ brandId, updateData }) => {
   const response = await axios.put(`/brands/updateBrand?id=${brandId}`, updateData);
   console.log(response)
   return response.data;
 });

const initialState = {
  categories: [],
  brands: [],
  loading: false,
  error: null,
  newlyCreatedCategoryId: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    clearNewlyCreatedCategoryId: (state) => {
      state.newlyCreatedCategoryId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error)
      })

      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loading = false;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error)
      })


      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push({ ...action.payload }); // Ensure subCategories is initialized as an array
        // state.newlyCreatedCategoryId = action.payload._id;
        state.loading = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        // const category = state.categories.find(cat => cat._id === action.payload.category_id);
        // if (category) {
        //   if (!category.subCategories) {
        //     category.subCategories = [];
        //   }
        //   category.subCategories.push(action.payload);
        // }
        state.brands.push({ ...action.payload });
        state.loading = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {

        // console.log("State categories before update:", state.categories);
        console.log("Action payload:", action.payload._id);


        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          // Update only the category name and description
          state.categories[index] = {
            ...state.categories[index],
            name: action.payload.name,
            category_description: action.payload.category_description,
            category_image: action.payload.category_image
          };
        }

        console.log("State categories after update:", state.categories);


        state.loading = false;
      })

      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          // Update only the category name and description
          state.brands[index] = {
            ...state.brands[index],
            name: action.payload.name,
            brand_description: action.payload.brand_description,
            brand_image: action.payload.brand_image,
            category_id: action.payload.category_id
          };
        }
        state.loading = false;
      });
  },
});

export const { startLoading, stopLoading, clearNewlyCreatedCategoryId } = categoriesSlice.actions;

export default categoriesSlice.reducer;
