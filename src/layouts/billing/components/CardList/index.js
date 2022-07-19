import { useContext } from "react";
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

function PaymentMethod() {
  const navigate = useNavigate();

  const { cards, loading, error, setCardDetail } = useContext(CardsContext);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigateGo = (card) => {
    navigate("/dashboard/card-detail");
    setCardDetail(card);
  };

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Cards Dashboard
        </MDTypography>
        <MDButton variant="gradient" color="dark" onClick={() => navigate("/dashboard/add-card")}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new card
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <Grid container justifyContent="center" display="flex" alignItems="center">
          <Grid item xs={12}>
            {error && <p>Se ha producido un error al obtener tarjeta</p>}
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              <Loader />
            </Grid>
          ) : (
            cards.map((res) => (
              <Grid item xs={12} md={7} key={res.tokenPan}>
                <MDBox
                  borderRadius="lg"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={3}
                  mb={4}
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
          )}
        </Grid>
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;
