import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { CardsContext } from "context/CardsContext";

function CardDetailComponent() {
  const { cardDetail } = useContext(CardsContext);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  console.log(cardDetail);
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Card Details
        </MDTypography>
        <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new card
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3} flexDirection="column">
          <Grid item xs={12} md={7}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox display="flex" flexDirection="column">
                <MDTypography variant="h6" fontWeight="medium">
                  ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;
                  {cardDetail.tokenPan.substr(cardDetail.tokenPan.length - 4)}
                </MDTypography>
                <MDTypography variant="h6" fontWeight="medium">
                  Turn Card On / Off
                </MDTypography>
              </MDBox>
              <MDBox
                ml="auto"
                lineHeight={0}
                color={darkMode ? "white" : "dark"}
                flexDirection="column"
                display="flex"
              >
                <MDBox sx={{ paddingTop: "1rem" }} />
                <Switch color="warning" checked={checked} onChange={handleChange} />
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginLeft: "1rem" }}>
                  {checked ? "On" : "Off"}
                </MDTypography>
              </MDBox>
            </MDBox>
          </Grid>
          <MDBox pt={2} px={3} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
              Card Alerts
            </MDTypography>
          </MDBox>
          <Grid item xs={12} md={7}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              p={3}
              alignItems="center"
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox display="flex" flexDirection="column">
                <MDTypography variant="h5" fontWeight="medium">
                  Transactions Amount
                </MDTypography>
              </MDBox>
              <MDBox
                ml="auto"
                lineHeight={0}
                color={darkMode ? "white" : "dark"}
                flexDirection="column"
                display="flex"
              >
                <ArrowForwardIosIcon fontSize="large" />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              p={3}
              alignItems="center"
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox display="flex" flexDirection="column">
                <MDTypography variant="h5" fontWeight="medium">
                  Internet & Phone Transactions
                </MDTypography>
              </MDBox>
              <MDBox
                ml="auto"
                lineHeight={0}
                color={darkMode ? "white" : "dark"}
                flexDirection="column"
                display="flex"
              >
                <ArrowForwardIosIcon fontSize="large" />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default CardDetailComponent;