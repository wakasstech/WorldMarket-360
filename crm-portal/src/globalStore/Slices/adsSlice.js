// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from "../../utils/axios";

// export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
//   const response = await axios.get('/category/get-all-category');
//   return response.data;
// });

// const initialState = {
//     ads: null,
//     loading: false,
//     error: null,
//   };

// const adsSlice = createSlice({
//   name: 'ads',
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
//       .addCase(fetchAds.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAds.fulfilled, (state, action) => {
        
//         state.ads = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchAds.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const {
   
//     startLoading,
//     stopLoading,
//   } = adsSlice.actions;

// export default adsSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../api/axios';
import axios from "../../axios/axios";

export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
  const response = await axios.get('/Ads/getAllAds', {
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  });  return response.data;
});
// export const fetchBrands = createAsyncThunk('ads/fetchBrands', async () => {
//   const response = await axios.get('/brands/brandAll', {
//     headers: {
//       'ngrok-skip-browser-warning': '69420'
//     }
//   });  return response.data;
// });

export const createad = createAsyncThunk('ads/createad', async (adData) => {
  const response = await axios.post('/Ads/createAds', adData);
  return response.data;
});

// export const createBrand = createAsyncThunk('ads/createBrand', async (brandData) => {
//   const response = await axios.post(`/brands/createBrand`, brandData);
//   return response.data;
// });

export const updateAd = createAsyncThunk('ads/updateAd', async ({ adId, updateData }) => {
 console.log("hello")
  const response = await axios.put(`/Ads/updateAds?id=${adId}`, updateData);
  console.log(response)
  return response.data;
});

// export const updateBrand = createAsyncThunk('brands/updateBrand', async ({ brandId, updateData }) => {
//    const response = await axios.put(`/brands/updateBrand?id=${brandId}`, updateData);
//    console.log(response)
//    return response.data;
//  });

const initialState = {
  ads: [],
  brands: [],
  loading: false,
  error: null,
  newlyCreatedCategoryId: null,
};

const adsSlice = createSlice({
  name: 'ads',
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
      .addCase(fetchAds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.ads = action.payload;
        state.loading = false;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error)
      })

      // .addCase(fetchBrands.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchBrands.fulfilled, (state, action) => {
      //   state.brands = action.payload;
      //   state.loading = false;
      // })
      // .addCase(fetchBrands.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      //   console.log(action.error)
      // })


      .addCase(createad.fulfilled, (state, action) => {
        state.ads.push({ ...action.payload }); // Ensure subCategories is initialized as an array
        // state.newlyCreatedCategoryId = action.payload._id;
        state.loading = false;
      })
      // .addCase(createBrand.fulfilled, (state, action) => {
      //   // const category = state.ads.find(cat => cat._id === action.payload.category_id);
      //   // if (category) {
      //   //   if (!category.subCategories) {
      //   //     category.subCategories = [];
      //   //   }
      //   //   category.subCategories.push(action.payload);
      //   // }
      //   state.brands.push({ ...action.payload });
      //   state.loading = false;
      // })
      .addCase(updateAd.fulfilled, (state, action) => {

        // console.log("State ads before update:", state.ads);
        console.log("Action payload:", action.payload._id);


        const index = state.ads.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          // Update only the category name and description
          state.ads[index] = {
            ...state.ads[index],
            title: action.payload.title,
            description: action.payload.description,
            image: action.payload.image
          };
        }

        console.log("State ads after update:", state.ads);


        state.loading = false;
      })

      // .addCase(updateBrand.fulfilled, (state, action) => {
      //   const index = state.brands.findIndex(cat => cat.id === action.payload.id);
      //   if (index !== -1) {
      //     // Update only the category name and description
      //     state.brands[index] = {
      //       ...state.brands[index],
      //       name: action.payload.name,
      //       brand_description: action.payload.brand_description,
      //       brand_image: action.payload.brand_image,
      //       category_id: action.payload.category_id
      //     };
      //   }
      //   state.loading = false;
      // });
  },
});

export const { startLoading, stopLoading, clearNewlyCreatedCategoryId } = adsSlice.actions;

export default adsSlice.reducer;
