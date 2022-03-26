/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import CardList from "layouts/billing/components/CardList";
// Data

// Dashboard components

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12}>
        <CardList />
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;
