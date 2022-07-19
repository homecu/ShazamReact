/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { forwardRef, useContext, useEffect, useState } from "react";
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
import {
  Alert,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function TravelMemoDetail() {
  const navigate = useNavigate();
  const {
    cardDetail,
    loading,
    changeSaved,
    places,
    getDestinations,
    createTravelMemo,
    travelMemoSelected,
    removeTravelMemoById,
  } = useContext(CardsContext);
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const [memoId, setMemoId] = useState(null);
  const [placeName, setPlaceName] = useState([]);
  const theme = useTheme();
  const [formValues, setFormValues] = useState({
    tripName: "",
    memo: "",
  });
  const [formValuesErrors, setFormErrors] = useState({
    tripName: false,
    memo: false,
    startDate: false,
    endDate: false,
    destinations: false,
  });

  const [errorAlert, setErrorAlert] = useState(false);

  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const formatData = () =>
    placeName.reduce((obj, item) => Object.assign(obj, { [item.code]: item.name }), {});

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorAlert(false);
    const startDatedd = startDate.getDate();
    const startDatemm = startDate.getMonth() + 1;
    const startDateyyyy = startDate.getFullYear();
    const endDatedd = endDate.getDate();
    const endDatemm = endDate.getMonth() + 1;
    const endDateyyyy = endDate.getFullYear();
    const startDateFormated = `${startDateyyyy}-${startDatemm}-${startDatedd}`;
    const endtDateFormated = `${endDateyyyy}-${endDatemm}-${endDatedd}`;

    if (formValues.tripName.trim() === "") {
      setFormErrors({ ...formValuesErrors, tripName: true });
      setErrorAlert(true);
      return;
    }

    if (formValues.memo.trim() === "") {
      setFormErrors({ ...formValuesErrors, memo: true });
      setErrorAlert(true);
      return;
    }

    if (placeName.length === 0) {
      setFormErrors({ ...formValuesErrors, destinations: true });
      setErrorAlert(true);
      return;
    }
    setErrorAlert(false);

    createTravelMemo(
      formatData(),
      endtDateFormated,
      startDateFormated,
      formValues.memo,
      formValues.tripName,
      memoId
    );
  };

  function getStyles(name, place, themeProp) {
    return {
      fontWeight:
        place.indexOf(name) === -1
          ? themeProp.typography.fontWeightRegular
          : themeProp.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPlaceName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const onBlurTripName = () =>
    formValues.tripName.trim() === ""
      ? setFormErrors({ ...formValuesErrors, tripName: true })
      : setFormErrors({ ...formValuesErrors, tripName: false });

  const onBlurMemo = () =>
    formValues.memo.trim() === ""
      ? setFormErrors({ ...formValuesErrors, memo: true })
      : setFormErrors({ ...formValuesErrors, memo: false });

  const onBlurDestinations = () =>
    placeName.length === 0
      ? setFormErrors({ ...formValuesErrors, destinations: true })
      : setFormErrors({ ...formValuesErrors, destinations: false });

  useEffect(() => {
    getDestinations();
  }, []);

  useEffect(() => {
    if (cardDetail.tokenPan === undefined) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (changeSaved) {
      setTimeout(() => {
        navigate("/dashboard/card-detail/travel-memos");
      }, 2500);
    }
  }, [changeSaved]);
  useEffect(() => {
    if (travelMemoSelected) {
      const datePartsStartDate = travelMemoSelected.startDate.split("-");
      const datePartsEndDate = travelMemoSelected.endDate.split("-");
      setFormValues({
        ...formValues,
        tripName: travelMemoSelected.tripName,
        memo: travelMemoSelected.memo,
      });
      setPlaceName(travelMemoSelected.destinations);
      setMemoId(travelMemoSelected.memoId);
      setStartDate(
        new Date(`${datePartsStartDate[1]}/${datePartsStartDate[2]}/${datePartsStartDate[0]}`)
      );
      setEndDate(new Date(`${datePartsEndDate[1]}/${datePartsEndDate[2]}/${datePartsEndDate[0]}`));
    }
  }, [travelMemoSelected]);

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Travel Memo
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
                    Travel Memo saved successfully!
                  </Alert>
                )}
                {errorAlert && (
                  <Alert severity="error" sx={{ marginBottom: "30px" }}>
                    Please fill all fields
                  </Alert>
                )}
                <Box mb={4}>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                  >
                    <MDTypography variant="h3" fontWeight="medium" mb={2}>
                      {travelMemoSelected ? "Edit Travel Memo" : "Create Travel Memo"}
                    </MDTypography>

                    {travelMemoSelected && (
                      <Box
                        sx={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
                        onClick={() => removeTravelMemoById(memoId)}
                      >
                        <DeleteOutlineIcon sx={{ marginTop: 0.2 }} />
                        <MDTypography variant="h6" fontWeight="medium" mb={2}>
                          Remove Travel Memo
                        </MDTypography>
                      </Box>
                    )}
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                    Trip Name
                  </Typography>
                  <TextField
                    fullWidth
                    id="tripName"
                    name="tripName"
                    type="text"
                    value={formValues.tripName}
                    onChange={changeHandler}
                    inputProps={{ maxLength: 12 }}
                    error={formValuesErrors.tripName}
                    onBlur={onBlurTripName}
                    helperText={formValuesErrors.tripName ? "Error!" : " "}
                  />

                  <Box mt={2}>
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                      Start Date
                    </Typography>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      customInput={<ExampleCustomInput />}
                    />
                  </Box>
                  <Box mt={2}>
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                      End Date
                    </Typography>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      customInput={<ExampleCustomInput />}
                    />
                  </Box>
                </Box>

                <Box>
                  <div>
                    <FormControl sx={{ m: 1, mb: 4, marginLeft: 0 }} fullWidth>
                      <InputLabel id="demo-multiple-chip-label">Destinations</InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        sx={{ padding: 1 }}
                        value={placeName}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="chip" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                            {selected.map((value) => (
                              <Chip key={value.code} label={value.name} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                        error={formValuesErrors.destinations}
                        onBlur={onBlurDestinations}
                      >
                        {places.map((item) => (
                          <MenuItem
                            key={item.code}
                            value={item}
                            style={getStyles(item.name, placeName, theme)}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValuesErrors.destinations && (
                        <Typography color="red" variant="caption" ml={2}>
                          Error!
                        </Typography>
                      )}
                    </FormControl>
                  </div>
                  <TextField
                    id="outlined-multiline-static"
                    label="Memo"
                    multiline
                    rows={4}
                    fullWidth
                    name="memo"
                    inputProps={{ maxLength: 200 }}
                    value={formValues.memo}
                    onChange={changeHandler}
                    error={formValuesErrors.memo}
                    onBlur={onBlurMemo}
                    helperText={formValuesErrors.memo ? "Error!" : " "}
                  />

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

export default TravelMemoDetail;

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <MDButton variant="gradient" color="light" onClick={onClick} ref={ref}>
    {value}
  </MDButton>
));
