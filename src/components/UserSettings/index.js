import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
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

function UserSettings() {
  const navigate = useNavigate();
  const { loading, user, changeSaved, updateUserSettings } = useContext(CardsContext);
  console.log(user);
  useEffect(() => {
    // if (cardDetail.tokenPan === undefined) {
    //  navigate("/dashboard");
    // }
  }, []);

  const [formValues, setFormValues] = useState({
    primaryEmailAddress: "",
    confirmPrimaryEmailAddress: "",
    secondaryEmailAddress: "",
    confirmSecondaryEmailAddress: "",
    phone: "",
    confirmPhone: "",
  });

  const [formValuesErrors, setFormErrors] = useState({
    primaryEmailAddress: false,
    confirmPrimaryEmailAddress: false,
    secondaryEmailAddress: false,
    confirmSecondaryEmailAddress: false,
    phone: false,
    confirmPhone: false,
  });

  const [errorAlert, setErrorAlert] = useState(false);

  const onBlurPrimaryEmailAddress = () =>
    formValues.primaryEmailAddress.trim() === ""
      ? setFormErrors({ ...formValuesErrors, primaryEmailAddress: true })
      : setFormErrors({ ...formValuesErrors, primaryEmailAddress: false });

  const onBlurConfirmPrimaryEmailAddress = () =>
    formValues.confirmPrimaryEmailAddress.trim() === ""
      ? setFormErrors({ ...formValuesErrors, confirmPrimaryEmailAddress: true })
      : setFormErrors({ ...formValuesErrors, confirmPrimaryEmailAddress: false });

  const onBlurSecondaryEmailAddress = () =>
    formValues.secondaryEmailAddress.trim() !== "" &&
    formValues.confirmSecondaryEmailAddress.trim() !== formValues.secondaryEmailAddress.trim() &&
    formValues.confirmSecondaryEmailAddress.trim() !== ""
      ? setFormErrors({ ...formValuesErrors, secondaryEmailAddress: true })
      : setFormErrors({ ...formValuesErrors, secondaryEmailAddress: false });

  const onBlurConfirmSecondaryEmailAddress = () =>
    formValues.confirmSecondaryEmailAddress.trim() !== "" &&
    formValues.confirmSecondaryEmailAddress.trim() !== formValues.secondaryEmailAddress.trim()
      ? setFormErrors({ ...formValuesErrors, confirmSecondaryEmailAddress: true })
      : setFormErrors({ ...formValuesErrors, confirmSecondaryEmailAddress: false });

  const onBlurPhone = () =>
    formValues.phone.trim() === ""
      ? setFormErrors({ ...formValuesErrors, phone: true })
      : setFormErrors({ ...formValuesErrors, phone: false });

  const onBlurConfirmPhone = () =>
    formValues.phone.trim() === ""
      ? setFormErrors({ ...formValuesErrors, confirmPhone: true })
      : setFormErrors({ ...formValuesErrors, confirmPhone: false });

  const handleChangeValue = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const [disableSystemAlertsCheckbox, setDisableSystemAlertsCheckbox] = useState(true);

  const handleChangeCheckbox = (e) => {
    setDisableSystemAlertsCheckbox({
      ...disableSystemAlertsCheckbox,
      [e.target.name]: e.target.checked,
    });
  };
  /*   const handleInputChange = (e) => {
    setMaxAmount(e.target.value);
  }; */
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorAlert(false);
    console.log(formValues);
    //  setAlertSettings(screen, checkboxes.primary, checkboxes.secondary, checkboxes.phone, maxAmount);

    if (formValues.primaryEmailAddress.trim() === "") {
      setFormErrors({ ...formValuesErrors, primaryEmailAddress: true });
      setErrorAlert(true);
      return;
    }

    if (formValues.confirmPrimaryEmailAddress.trim() === "") {
      setFormErrors({ ...formValuesErrors, confirmPrimaryEmailAddress: true });
      setErrorAlert(true);
      return;
    }

    if (formValues.secondaryEmailAddress.trim() === "") {
      setFormErrors({ ...formValuesErrors, secondaryEmailAddress: true });
      setErrorAlert(true);
      return;
    }

    if (formValues.confirmSecondaryEmailAddress.trim() === "") {
      setFormErrors({ ...formValuesErrors, confirmSecondaryEmailAddress: true });
      setErrorAlert(true);
      return;
    }

    if (formValues.phone.trim() === "") {
      setFormErrors({ ...formValuesErrors, phone: true });
      setErrorAlert(true);
      return;
    }

    if (formValues.confirmPhone.trim() === "") {
      setFormErrors({ ...formValuesErrors, confirmPhone: true });
      setErrorAlert(true);
    }
    updateUserSettings({
      primaryEmailAddress: formValues.primaryEmailAddress,
      secondaryEmailAddress: formValues.secondaryEmailAddress,
      phoneNumber: formValues.phone,
      disableSystemAlerts: disableSystemAlertsCheckbox,
    });
  };
  return (
    <Card id="delete-account">
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
                    Travel Memo saved successfully!
                  </Alert>
                )}
                {errorAlert && (
                  <Alert severity="error" sx={{ marginBottom: "30px" }}>
                    Please fill all fields
                  </Alert>
                )}
                <Box mb={6}>
                  <MDTypography variant="h3" fontWeight="medium" mb={1} mt={2}>
                    User Settings
                  </MDTypography>
                  <MDTypography variant="h5" fontWeight="medium">
                    Suspected Fraud Alerts
                  </MDTypography>
                  <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                    Send alerts for transactions suspected of fraud
                  </Typography>

                  <Typography variant="body1" sx={{ fontSize: "16px" }} fontWeight="bold" mb={1}>
                    Notifications
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                    Primary Email ({user.primaryAddress})
                  </Typography>

                  <TextField
                    fullWidth
                    id="primaryEmailAddress"
                    name="primaryEmailAddress"
                    placeholder="New Email"
                    type="text"
                    value={formValues.primaryEmailAddress}
                    onChange={handleChangeValue}
                    sx={{ mb: 2 }}
                    onBlur={onBlurPrimaryEmailAddress}
                    error={formValuesErrors.primaryEmailAddress}
                    inputProps={{ maxLength: 25 }}
                    helperText={formValuesErrors.primaryEmailAddress ? "Error!" : " "}
                  />
                  <TextField
                    fullWidth
                    id="confirmPrimaryEmailAddress"
                    name="confirmPrimaryEmailAddress"
                    placeholder="Confirm Email"
                    value={formValues.confirmPrimaryEmailAddress}
                    onChange={handleChangeValue}
                    sx={{ mb: 2 }}
                    onBlur={onBlurConfirmPrimaryEmailAddress}
                    error={formValuesErrors.confirmPrimaryEmailAddress}
                    inputProps={{ maxLength: 25 }}
                    helperText={formValuesErrors.confirmPrimaryEmailAddress ? "Error!" : " "}
                  />
                  <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                    Secondary Email ({user.secondaryAddress})
                  </Typography>

                  <TextField
                    fullWidth
                    id="secondaryEmailAddress"
                    name="secondaryEmailAddress"
                    placeholder="New Email"
                    value={formValues.secondaryEmailAddress}
                    onChange={handleChangeValue}
                    sx={{ mb: 2 }}
                    onBlur={onBlurSecondaryEmailAddress}
                    error={formValuesErrors.secondaryEmailAddress}
                    inputProps={{ maxLength: 25 }}
                    helperText={formValuesErrors.secondaryEmailAddress ? "Error!" : " "}
                  />
                  <TextField
                    fullWidth
                    id="confirmSecondaryEmailAddress"
                    name="confirmSecondaryEmailAddress"
                    placeholder="Confirm Email"
                    value={formValues.confirmSecondaryEmailAddress}
                    onChange={handleChangeValue}
                    sx={{ mb: 2 }}
                    onBlur={onBlurConfirmSecondaryEmailAddress}
                    error={formValuesErrors.confirmSecondaryEmailAddress}
                    inputProps={{ maxLength: 25 }}
                    helperText={formValuesErrors.confirmSecondaryEmailAddress ? "Error!" : " "}
                  />
                  <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                    Phone ({user.phone})
                  </Typography>

                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    placeholder="New Phone"
                    value={formValues.phone}
                    onChange={handleChangeValue}
                    sx={{ mb: 2 }}
                    type="number"
                    onBlur={onBlurPhone}
                    error={formValuesErrors.phone}
                    helperText={formValuesErrors.phone ? "Error!" : " "}
                  />
                  <TextField
                    fullWidth
                    id="confirmPhone"
                    name="confirmPhone"
                    placeholder="Confirm Phone"
                    type="number"
                    value={formValues.confirmPhone}
                    onChange={handleChangeValue}
                    onBlur={onBlurConfirmPhone}
                    error={formValuesErrors.confirmPhone}
                    helperText={formValuesErrors.confirmPhone ? "Error!" : " "}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={0}>
                      Enable notifications when account changes are made
                    </Typography>
                    <Box>
                      <Switch
                        color="warning"
                        name="primary"
                        checked={disableSystemAlertsCheckbox}
                        onChange={handleChangeCheckbox}
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

export default UserSettings;
