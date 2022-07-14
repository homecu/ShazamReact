import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

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

import { TextField, Typography } from "@mui/material";

function CardDetailComponent() {
  const [formValues, setFormValues] = useState({
    houseNumber: "",
    zipCode: "",
  });
  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const { loading, searchCards, cardsSearched, addUserCard } = useContext(CardsContext);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleSubmit = (event) => {
    event.preventDefault();
    searchCards(formValues);
  };

  const addCardMethod = (tokenPan) => addUserCard(tokenPan);

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="flex-start" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Add a Card
        </MDTypography>
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
              cardsSearched.map((res) => (
                <Grid item key={res}>
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
                      ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp; {res.slice(-6)}
                    </MDTypography>
                    <MDBox
                      ml="auto"
                      lineHeight={0}
                      color={darkMode ? "white" : "dark"}
                      display="flex"
                    >
                      <AddCircleOutlineRoundedIcon fontSize="medium" />
                      <MDTypography
                        variant="h6"
                        fontWeight="medium"
                        onClick={() => addCardMethod(res)}
                      >
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
