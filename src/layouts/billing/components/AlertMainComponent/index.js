import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images

// Material Dashboard 2 React context
import { CardsContext } from "context/CardsContext";
import Loader from "components/Loader/Loader";
import { Alert, Box, Switch, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function AlertMainComponent({ screen, title, headingTwo, headingThree }) {
  const navigate = useNavigate();
  const {
    cardDetail,
    loading,
    user,
    getAlertSettings,
    setAlertSettings,
    changeSaved,
    alertSettingsValues,
  } = useContext(CardsContext);

  useEffect(() => {
    if (cardDetail.tokenPan === undefined) {
      navigate("/dashboard");
    }
  }, []);

  const [maxAmount, setMaxAmount] = useState(null);
  const [checkboxes, setCheckboxes] = useState({
    primary: true,
    secondary: true,
    phone: true,
  });

  useEffect(() => {
    if (cardDetail.tokenPan) {
      getAlertSettings(screen);
    }
  }, []);
  useEffect(() => {
    setCheckboxes({
      ...checkboxes,
      primary: alertSettingsValues.primaryEmail,
      secondary: alertSettingsValues.secondaryEmail,
      phone: alertSettingsValues.sms,
    });
    setMaxAmount(alertSettingsValues.highDollarThreshold);
  }, [alertSettingsValues]);

  const handleChangeCheckboxes = (e) => {
    setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
  };
  const handleInputChange = (e) => {
    setMaxAmount(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setAlertSettings(screen, checkboxes.primary, checkboxes.secondary, checkboxes.phone, maxAmount);
  };
  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          {title}
        </MDTypography>
        <MDButton variant="gradient" color="dark" onClick={() => navigate("/dashboard/add-card")}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new card
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        {loading ? (
          <Grid item xs={12}>
            <Loader />
          </Grid>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container justifyContent="center" display="flex" alignItems="center">
              <Grid item xs={12} md={6}>
                {changeSaved && (
                  <Alert severity="success" sx={{ marginBottom: "30px" }}>
                    Changes saved successfully!
                  </Alert>
                )}
                <Box mb={screen !== "HIGH_DOLLAR_THRESHOLD" ? 6 : 4}>
                  <MDTypography variant="h3" fontWeight="medium" mb={2}>
                    Card Alerts
                  </MDTypography>
                  <MDTypography variant="h5" fontWeight="medium" mb={2}>
                    {headingTwo}
                  </MDTypography>
                  <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                    {headingThree}
                  </Typography>
                  {screen === "HIGH_DOLLAR_THRESHOLD" && (
                    <TextField
                      fullWidth
                      id="maxAmount"
                      name="maxAmount"
                      type="number"
                      value={maxAmount}
                      onChange={handleInputChange}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value, 10))
                          .toString()
                          .slice(0, 16);
                      }}
                    />
                  )}
                </Box>
                <Box>
                  <MDTypography variant="h5" fontWeight="medium" mb={2}>
                    Notify the following
                  </MDTypography>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={0}>
                      Primary Email ({user.primaryAddress})
                    </Typography>
                    <Box>
                      <Switch
                        color="warning"
                        name="primary"
                        checked={checkboxes.primary}
                        onChange={handleChangeCheckboxes}
                      />
                      <MDTypography variant="h6" fontWeight="medium" sx={{ marginLeft: "1rem" }}>
                        On
                      </MDTypography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={0}>
                      Secondary Email ({user.secondaryAddress})
                    </Typography>
                    <Box>
                      <Switch
                        color="warning"
                        name="secondary"
                        checked={checkboxes.secondary}
                        onChange={handleChangeCheckboxes}
                      />
                      <MDTypography variant="h6" fontWeight="medium" sx={{ marginLeft: "1rem" }}>
                        On
                      </MDTypography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={0}>
                      Phone ({user.phone})
                    </Typography>
                    <Box>
                      <Switch
                        color="warning"
                        name="phone"
                        checked={checkboxes.phone}
                        onChange={handleChangeCheckboxes}
                      />
                      <MDTypography variant="h6" fontWeight="medium" sx={{ marginLeft: "1rem" }}>
                        On
                      </MDTypography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
                    <MDButton
                      variant="gradient"
                      color="light"
                      onClick={() => navigate("/dashboard/card-detail")}
                    >
                      Cancel
                    </MDButton>
                    <MDButton
                      variant="gradient"
                      color="dark"
                      sx={{ marginLeft: "20px" }}
                      type="submit"
                      disabled={
                        (screen === "HIGH_DOLLAR_THRESHOLD" && maxAmount === 0) ||
                        (screen === "HIGH_DOLLAR_THRESHOLD" && maxAmount === "") ||
                        (screen === "HIGH_DOLLAR_THRESHOLD" && !maxAmount)
                      }
                    >
                      Save
                    </MDButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </MDBox>
    </Card>
  );
}

AlertMainComponent.propTypes = {
  screen: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  headingTwo: PropTypes.string.isRequired,
  headingThree: PropTypes.string.isRequired,
};

export default AlertMainComponent;
