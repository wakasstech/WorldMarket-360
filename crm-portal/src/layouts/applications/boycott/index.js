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


  //nmaz //



import { useCallback, useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import ArgonBadgeDot from "components/ArgonBadgeDot";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import ComplexReportsDoughnutChart from "./components/ComplexReportsDoughnutChart";

// Analytics application components
import Social from "./components/Social/index";
import Pages from "layouts/applications/analytics/components/Pages";

// Data
import defaultLineChartData from "layouts/applications/analytics/data/defaultLineChartData";
import { fetchCategories } from "globalStore/Slices/categoriesSlice";
import { fetchBrands } from "globalStore/Slices/categoriesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import complexReportsDoughnutChartData from "./data/complexReportsDoughnutChartData";
import CustomDesign from "./components/CustomDesign/CustomDesign";
import { Padding } from "@mui/icons-material";
import OutlinedCounterCard from "examples/Cards/CounterCards/OutlinedCounterCard";
import { fetchAds } from "globalStore/Slices/adsSlice";
import axios from "../../../axios/axios";


const transformData = (categories, brands) => {
  const categoryBrandCount = {};

  // Return 0 if categories or brands are empty
  if (categories.length === 0 || brands.length === 0) {
    return {
      labels: [],
      data: [0], // or data: [] if you want an empty array instead of [0]
    };
  }

  // Initialize the count for each category
  categories.forEach(category => {
    categoryBrandCount[category.name] = 0;
  });

  // Count the brands in each category
  brands.forEach(brand => {
    const categoryId = brand?.category_id;
    const categoryName = categories.find(category => category.id === categoryId)?.name;
    if (categoryName) {
      categoryBrandCount[categoryName]++;
    }
  });

  // Prepare the data for the chart
  return {
    labels: Object.keys(categoryBrandCount),
    data: Object.values(categoryBrandCount),
  };
};




function Analytics() {
  const [menu, setMenu] = useState(null);
  const dispatch = useDispatch();
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const [products, setProducts] = useState([]);
  const { brands, categories } = useSelector((state) => state.categories);
  const { ads, loading } = useSelector(state => state.ads);
  const [blogsLength, setBlogsLength] = useState(0);
  const [adsLength, setAdsLength] = useState(0);

  console.log(ads, 'adsssssssss')

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`/products/getAllProducts`);
      setProducts(response.data.result);
     
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
   fetchProducts();
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchAds());
  }, [dispatch]);

  useEffect(() => {
    axios.get('/blog/getAllBlog')
      .then(response => {
        setBlogsLength(response.data.totalItems); // Assuming `totalItems` is the count of blogs
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);
  useEffect(() => {
    if (ads) {
      setAdsLength(ads.length);
    }
  }, [ads]);


   // Calculate totals
   const totalCategories = categories?.length > 0 ? categories.length : 0;
const totalBrands = brands?.length > 0 ? brands.length : 0;
const totalProducts = products?.length > 0 ? products.length : 0;
const totalBoycott = products?.length > 0 ? products.filter(product => product.status === "in_boycott").length : 0;

const transformedData = (categories?.length > 0 && brands?.length > 0) 
  ? transformData(categories, brands) 
  : { labels: [], data: [0] };

const brandData = brands?.length > 0 ? brands.map((brand) => {
  const productCount = products?.length > 0 ? products.filter(product => product.brand_name === brand.name).length : 0;
  return {
    image: brand.brand_image,
    name: brand.name,
    count: productCount,
  };
}) : [];

   
  // console.log(brandData, 'brandDataAnalytics')
  const renderMenu = (
    <Menu
      anchorEl={menu}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Yesterday</MenuItem>
      <MenuItem onClick={closeMenu}>Last 7 days</MenuItem>
      <MenuItem onClick={closeMenu}>Last 30 days</MenuItem>
    </Menu>
  );

  const bgImage = "https://insight.kellogg.northwestern.edu/content/uploads/_1200x630_fit_center-center_82_none/Full_1222_Boycotts_Buycotts.jpg?mtime=1671551771";


  return (
    // <DashboardLayout>
    <DashboardLayout
    sx={{
      backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
        `${linearGradient(
          rgba(gradients.info.main, 0.6),
          rgba(gradients.info.state, 0.6)
        )}, url(${bgImage})`,
      backgroundPositionY: "50%",
    }}
  >
      <DashboardNavbar />
      <ArgonBox py={3} sx={{padding: '0px 0px 60px 0px'}}>
        {/* <ArgonBox display="flex" justifyContent="flex-end" mb={3} ml={2}>
          <ArgonBox mr={3}>
            <ArgonButton variant="outlined" color="white">
              Export&nbsp;&nbsp;
              <Icon>folder</Icon>
            </ArgonButton>
          </ArgonBox>
          <ArgonButton variant="gradient" color="dark" onClick={openMenu}>
            Today&nbsp;
            <Icon>expand_more</Icon>
          </ArgonButton>
          {renderMenu}
        </ArgonBox> */}
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <MiniStatisticsCard
                title={{ text: "Categories", fontWeight: "medium" }}
            count={totalCategories.toString()}
            // percentage={{ color: "success", text: "+55%" }}
            icon={{ color: "dark", component: "category" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MiniStatisticsCard
                 title={{ text: "Brands", fontWeight: "medium" }}
                 count={totalBrands.toString()}
                //  percentage={{ color: "success", text: "+3%" }}
                 icon={{ color: "dark", component: "branding_watermark" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MiniStatisticsCard
                title={{ text: "Products", fontWeight: "medium" }}
                count={totalProducts.toString()}
                // percentage={{ color: "success", text: "-2%" }}
                icon={{ color: "dark", component: "shopping_bag" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MiniStatisticsCard
                 title={{ text: "Boycott", fontWeight: "medium" }}
                 count={totalBoycott.toString()}
                //  percentage={{ color: "success", text: "+5%" }}
                 icon={{ color: "dark", component: "thumb_down" }}
              />
            </Grid>
          </Grid>
        </ArgonBox>


        <ArgonBox p={2} sx={{ mt: { xs: 10, md: 10, lg: 15 } }}>
  <Grid container spacing={3} justifyContent="center">
    <Grid item xs={6} lg={3}>
      <OutlinedCounterCard count={blogsLength} title="Blogs" />
    </Grid>
    <Grid item xs={6} lg={3}>
      <OutlinedCounterCard count={adsLength} title="Ads" />
    </Grid>
  </Grid>
</ArgonBox>



        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} lg={7}>
              <DefaultLineChart
                title="Traffic channels"
                description={
                  <ArgonBox display="flex" ml={-1}>
                    <ArgonBadgeDot color="info" size="sm" badgeContent="Organic search" />
                    <ArgonBadgeDot color="dark" size="sm" badgeContent="Referral" />
                    <ArgonBadgeDot color="primary" size="sm" badgeContent="Social media" />
                  </ArgonBox>
                }
                chart={defaultLineChartData}
              />
            </Grid>  */}
            <Grid item xs={12} lg={12}>
              <ComplexReportsDoughnutChart
                title="Categories"
                chart={complexReportsDoughnutChartData(transformedData.labels, transformedData.data)}
                tooltip="Boycott Application Traffic"
                action={{
                  type: "internal",
                  route: "/boycott/categories-list",
                  color: "secondary",
                  label: "See All Categories",
                }}
              />
            </Grid>
          </Grid>
          {/* <CustomDesign/> */}
        </ArgonBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Social brandData={brandData}  />
          </Grid>
          {/* <Grid item xs={12} lg={6}>
            <Pages />
          </Grid> */}
        </Grid>
      </ArgonBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Analytics;
