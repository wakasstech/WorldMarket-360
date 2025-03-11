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

import { useState } from "react";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Table from "examples/Tables/Table";

// Reports page components
import Reviews from "layouts/pages/users/reports/components/Reviews";
import Profile from "../../../../assets/images/profile.png"
import ActionCell from "./components/ActionCell";

// Data

function Reports() {
  const tableData = {
    columns: [
      { name: "name", align: "left" },
      { name: "email", align: "center" },
      { name: "id", align: "center" },
      // { name: "action", align: "center" },
    ],
  
    rows: [
      {
        name: [Profile , "John Micheal"],
        email: "uk5458622@gmail.com",
        id: "43431",
        action : <ActionCell />
      },
      {
        name: [Profile,"Laurent Perrier"],
        email: "laurent@user.com",
        id: "10392",
        action : <ActionCell />

      },
      {
        name: [Profile , "Michael Levi"],
        email: "michael@user.com",
        id: "34002",
        action : <ActionCell />

      },
    ],
  };
  
  const {columns , rows} = tableData
  // ComplexStatisticsCard dropdown menu state
  const [usersActiveMenu, setUsersActiveMenu] = useState(null);
  const [clickEventsMenu, setClickEventsMenu] = useState(null);
  const [purchasesMenu, setPurchasesMenu] = useState(null);
  const [likesMenu, setLikesMenu] = useState(null);
  const [editModalOpen ,setEditModalOpen] = useState(false)

  // ComplexStatisticsCard dropdown menu handlers
  const openUsersActiveMenu = (event) => setUsersActiveMenu(event.currentTarget);
  const closeUsersActiveMenu = () => setUsersActiveMenu(null);
  const openClickEventsMenu = (event) => setClickEventsMenu(event.currentTarget);
  const closeClickEventsMenu = () => setClickEventsMenu(null);
  const openPurchasesMenu = (event) => setPurchasesMenu(event.currentTarget);
  const closePurchasesMenu = () => setPurchasesMenu(null);
  const openLikesMenu = (event) => setLikesMenu(event.currentTarget);
  const closeLikesMenu = () => setLikesMenu(null);
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={close}>Action</MenuItem>
      <MenuItem onClick={close}>Another action</MenuItem>
      <MenuItem onClick={close}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        {/* <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/reports1.jpg"
                    icon="account_circle"
                    count={{ number: 1600, label: "users active" }}
                    percentage="+55%"
                    dropdown={{
                      action: openUsersActiveMenu,
                      menu: renderMenu(usersActiveMenu, closeUsersActiveMenu),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/reports2.jpg"
                    icon="touch_app"
                    count={{ number: 357, label: "click events" }}
                    percentage="+124%"
                    dropdown={{
                      action: openClickEventsMenu,
                      menu: renderMenu(clickEventsMenu, closeClickEventsMenu),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/reports3.jpg"
                    icon="shopping_cart"
                    count={{ number: 2300, label: "purchases" }}
                    percentage="+55%"
                    dropdown={{
                      action: openPurchasesMenu,
                      menu: renderMenu(purchasesMenu, closePurchasesMenu),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/reports4.jpg"
                    icon="thumb_up"
                    count={{ number: 940, label: "likes" }}
                    percentage="+90%"
                    dropdown={{
                      action: openLikesMenu,
                      menu: renderMenu(likesMenu, closeLikesMenu),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Reviews />
            </Grid>
          </Grid>
        </ArgonBox> */}
        <ArgonBox style={{marginTop: '20%'}}>
        <Table columns={columns} rows={rows} />
        </ArgonBox>
      </ArgonBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Reports;
