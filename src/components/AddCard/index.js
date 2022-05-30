/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { CardsContext } from "context/CardsContext";
import Loader from "components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

function CardDetailComponent() {
  const [formValues, setFormValues] = useState({
    houseNumber: "",
    zipCode: "",
  });
  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const {
    cardDetail,
    cardBlock,
    loading,
    changeStatusCard,
    loadCardDetailStatus,
    loadingToggle,
    searchCards,
  } = useContext(CardsContext);
  const [expanded, setExpanded] = useState(false);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [checked, setChecked] = useState(true);

  const handleChange = async (event) => {
    await changeStatusCard(event.target.checked);
  };
  const loadDetail = async () => {
    await loadCardDetailStatus(cardDetail.tokenPan);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("asd");
    searchCards(formValues);
  };

  const cards = [1];
  console.log(formValues);

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Add a Card
        </MDTypography>
        <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;FINDDDDDD card
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <Grid container justifyContent="center" display="flex">
          <Grid item xs={12} md={6}>
            <MDTypography variant="h6" fontWeight="medium">
              Enter your address info to search your cards
            </MDTypography>
            <form onSubmit={handleSubmit}>
              <MDBox display="flex" alignItems="center" mt={3} justifyContent="space-between">
                <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                  House number
                </Typography>
                <TextField
                  id="houseNumber"
                  name="houseNumber"
                  type="text"
                  inputProps={{ maxLength: 12 }}
                  value={formValues.tripName}
                  onChange={changeHandler}
                />
                <Typography variant="body1" sx={{ fontSize: "16px" }} mb={1}>
                  Zipcode
                </Typography>

                <TextField
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  inputProps={{ maxLength: 12 }}
                  value={formValues.zipCode}
                  onChange={changeHandler}
                />
                <MDButton variant="gradient" color="dark" sx={{ marginLeft: "20px" }} type="submit">
                  Search
                </MDButton>
              </MDBox>
            </form>
            {loading ? (
              <Grid item xs={12}>
                <Loader />
              </Grid>
            ) : (
              cards.map((res) => (
                <Grid item key={res.tokenPan}>
                  <MDBox
                    borderRadius="lg"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={3}
                    mt={2}
                    mb={4}
                    sx={{
                      border: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                      cursor: "pointer",
                    }}
                  >
                    <MDTypography variant="h6" fontWeight="medium">
                      ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp; 444444444
                    </MDTypography>
                    <MDBox
                      ml="auto"
                      lineHeight={0}
                      color={darkMode ? "white" : "dark"}
                      display="flex"
                    >
                      <AddCircleOutlineRoundedIcon fontSize="medium" />
                      <MDTypography variant="h6" fontWeight="medium">
                        Add Card
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default CardDetailComponent;
