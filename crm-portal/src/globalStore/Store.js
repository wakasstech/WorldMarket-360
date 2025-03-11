import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import videosReducer from "./Slices/videoSlice";
import categoriesReducer from "./Slices/categoriesSlice";
import coursesReducer from "./Slices/CoursesSlice";
import lecturesReducer from "./Slices/LecturesSlice";
import productsReducer from "./Slices/productSlice";
import adsReducer from "./Slices/adsSlice";


const Store = configureStore({
  reducer: {
    
    auth: authReducer,
    categories: categoriesReducer,
    ads: adsReducer,
    courses: coursesReducer,
    lectures: lecturesReducer,
    videos: videosReducer,
    products: productsReducer, // Add the products reducer

  
  },
});
export default Store;
