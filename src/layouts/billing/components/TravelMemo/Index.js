/* eslint-disable no-nested-ternary */
import { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { CardsContext } from "context/CardsContext";
import Loader from "components/Loader/Loader";
import { Box } from "@mui/material";

function TravelMemo() {
  const navigate = useNavigate();

  const { loading, error, setCardDetail, getCardTravelMemos, travelMemos } =
    useContext(CardsContext);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigateGo = (card) => {
    console.log("hola");
    navigate("/dashboard/card-detail");
    setCardDetail(card);
    console.log(card);
  };
  useEffect(() => {
    getCardTravelMemos();
  }, []);

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Manage Travel Memos
        </MDTypography>
        <MDButton
          variant="gradient"
          color="dark"
          onClick={() => navigate("/dashboard/card-detail/travel-memos/travel-memo")}
        >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new Travel Memo
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <Grid container justifyContent="center" display="flex" alignItems="center">
          <Box mb={4}>
            <MDTypography variant="h3" fontWeight="medium" mb={2}>
              Manage Travel Memos
            </MDTypography>
          </Box>
          <Grid item xs={12}>
            {error && <p>Se ha producido un error al obtener tarjeta</p>}
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              <Loader />
            </Grid>
          ) : travelMemos?.length > 0 ? (
            travelMemos.map((res) => (
              <Grid item xs={12} md={6} key={res.tokenPan}>
                <MDBox
                  borderRadius="lg"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={3}
                  sx={{
                    border: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                    cursor: "pointer",
                  }}
                  onClick={() => navigateGo(res)}
                >
                  <MDTypography variant="h6" fontWeight="medium">
                    ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;
                    {res.tokenPan.substr(res.tokenPan.length - 4)}
                  </MDTypography>
                  <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                    <Tooltip title="Edit Card" placement="top">
                      <Icon sx={{ cursor: "pointer" }} fontSize="small">
                        edit
                      </Icon>
                    </Tooltip>
                  </MDBox>
                </MDBox>
              </Grid>
            ))
          ) : (
            <>No Travel Memos found</>
          )}
        </Grid>
      </MDBox>
    </Card>
  );
}

export default TravelMemo;
