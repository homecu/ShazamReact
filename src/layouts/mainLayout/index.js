import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PropTypes from "prop-types";
// Data

// Dashboard components

function MainLayout({ children }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12}>
        {children}
      </Grid>
    </DashboardLayout>
  );
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayout;
