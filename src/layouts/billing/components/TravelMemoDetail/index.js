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
  const { cardDetail, loading, changeSaved, places, getDestinations, createTravelMemo } =
    useContext(CardsContext);
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const [placeName, setPlaceName] = useState([]);
  const theme = useTheme();
  const [formValues, setFormValues] = useState({
    tripName: "",
    memo: "",
  });

  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const formatData = () =>
    placeName.reduce((obj, item) => Object.assign(obj, { [item.code]: item.place }), {});

  const handleSubmit = (event) => {
    event.preventDefault();

    const startDatedd = startDate.getDate();
    const startDatemm = startDate.getMonth() + 1;
    const startDateyyyy = startDate.getFullYear();
    const endDatedd = startDate.getDate();
    const endDatemm = startDate.getMonth() + 1;
    const endDateyyyy = startDate.getFullYear();
    const startDateFormated = `${startDateyyyy}/${startDatemm}/${startDatedd}`;
    const endtDateFormated = `${endDateyyyy}/${endDatemm}/${endDatedd}`;

    createTravelMemo(
      formatData(),
      endtDateFormated,
      startDateFormated,
      formValues.memo,
      formValues.tripName
    );
  };

  function getStyles(name, personName, themeProp) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
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

  useEffect(() => {
    getDestinations();
  }, []);

  useEffect(() => {
    if (cardDetail.tokenPan === undefined) {
      navigate("/dashboard");
    }
  }, []);
  console.log(formValues);
  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Travel Memo
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
                <Box mb={4}>
                  <MDTypography variant="h3" fontWeight="medium" mb={2}>
                    Create Travel Memo
                  </MDTypography>
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
                  />

                  <Box mt={2}>
                    <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                      Start Date
                    </Typography>
                    <DatePicker
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
                      <InputLabel id="demo-multiple-chip-label" fullWidth>
                        Destinations
                      </InputLabel>
                      <Select
                        fullWidth
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
                              <Chip key={value.code} label={value.place} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {places.map((item) => (
                          <MenuItem
                            key={item.code}
                            value={item}
                            style={getStyles(item.place, placeName, theme)}
                          >
                            {item.place}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <TextField
                    id="outlined-multiline-static"
                    label="Memo"
                    multiline
                    rows={4}
                    defaultValue="Small note of the travel"
                    fullWidth
                    name="memo"
                    inputProps={{ maxLength: 200 }}
                    value={formValues.memo}
                    onChange={changeHandler}
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
