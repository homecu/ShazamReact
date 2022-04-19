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

function TransactionAmountComponent() {
  const navigate = useNavigate();
  const { cardDetail, loading, user, getAlertSettings, setAlertSettings, changeSaved } =
    useContext(CardsContext);

  useEffect(() => {
    if (cardDetail.tokenPan === undefined) {
      console.log("ACAAAAAAAAAAAAAAAA");
      navigate("/dashboard");
    }
  }, []);
  useEffect(() => {
    if (cardDetail.tokenPan) {
      getAlertSettings("HIGH_DOLLAR_THRESHHOLD");
    }
  }, []);
  const defaultValues = {
    maxAmount: null,
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [checkboxes, setCheckboxes] = useState({
    primary: true,
    secondary: true,
    phone: true,
  });

  const handleChangeCheckboxes = (e) => {
    setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    setAlertSettings(
      "HIGH_DOLLAR_THRESHHOLD",
      checkboxes.primary,
      checkboxes.secondary,
      checkboxes.phone,
      formValues.maxAmount
    );
  };

  console.log(formValues.maxAmount);
  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Card Details Transaction Amount
        </MDTypography>
        <MDButton variant="gradient" color="dark">
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
                <Box mb={3}>
                  <MDTypography variant="h3" fontWeight="medium" mb={2}>
                    Card Alerts
                  </MDTypography>
                  <MDTypography variant="h5" fontWeight="medium" mb={2}>
                    Based on transaction amount
                  </MDTypography>
                  <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                    Send the alerts for transactions that exceed this amount
                  </Typography>
                  <TextField
                    fullWidth
                    id="maxAmount"
                    name="maxAmount"
                    type="number"
                    value={formValues.maxAmount}
                    onChange={handleInputChange}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value, 10))
                        .toString()
                        .slice(0, 16);
                    }}
                  />
                </Box>
                <Box>
                  <MDTypography variant="h5" fontWeight="medium" mb={2}>
                    Notify the following
                  </MDTypography>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
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
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
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
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
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
                        formValues.maxAmount === 0 ||
                        formValues.maxAmount === "" ||
                        !formValues.maxAmount
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

export default TransactionAmountComponent;
