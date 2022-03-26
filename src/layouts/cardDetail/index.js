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
import CardDetailComponent from "layouts/billing/components/CardDetail";

// Data

// Dashboard components

function CardDetail() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12}>
        <CardDetailComponent />
      </Grid>
    </DashboardLayout>
  );
}

export default CardDetail;
