import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../axios/axios"; // Update the path as per your project structure

// Thunks for async actions
// Updated Thunk in productSlice.js
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ limit = 10, page = 1, search = "" }) => {
  const response = await axios.get(`/products/getAllProducts`, {
    params: { page, limit, search }
  });

  return {
    products: response.data.result, // Assuming API returns products array
    totalItems: response.data.totalItems, // Total number of products (for pagination)
    totalPages: response.data.totalPages  // Total number of pages (for pagination)
  };
});


export const createProduct = createAsyncThunk('products/createProduct', async (productData) => {
  const response = await axios.post('/products/addProduct', productData);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ productId, updateData }) => {
  // const response = await axios.put(`/products/editProduct?id=${productId}`, updateData);
  const response = await axios.put(`products/updateProductLogo?id=${productId}`, updateData);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axios.delete(`/products/delete/${productId}`);
  return productId;
});

const initialState = {
  products: [],
  totalItems: 0, // Store total items here
  totalPages: 0, // Store total pages here
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Define any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.result;
      state.totalItems = action.payload.totalItems; // Set totalItems from payload
      state.totalPages = action.payload.totalPages; // Set totalPages from payload
      state.loading = false;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = { ...state.products[index], ...action.payload };
        }
        state.loading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
        state.loading = false;
      });
  },
});

// Export the reducer
export default productsSlice.reducer;
