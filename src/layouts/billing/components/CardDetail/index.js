import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

function CardDetailComponent() {
  const navigate = useNavigate();
  const { cardDetail, cardBlock, loading, changeStatusCard, loadCardDetailStatus, loadingToggle } =
    useContext(CardsContext);
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

  useEffect(() => {
    setChecked(!cardBlock);
  }, [cardBlock]);
  useEffect(() => {
    if (cardDetail.tokenPan === undefined) {
      navigate("/dashboard");
    }
  }, []);
  useEffect(() => {
    if (cardDetail.tokenPan) {
      loadDetail();
    }
  }, []);

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Card Details
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
          <Grid container justifyContent="center" display="flex" alignItems="center">
            <Grid item xs={12} md={7}>
              <MDBox
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                mb={3}
                p={3}
                sx={{
                  border: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                }}
              >
                <MDBox display="flex" flexDirection="column">
                  <MDTypography variant="h6" fontWeight="medium">
                    ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;
                    {cardDetail.tokenPan?.substr(cardDetail.tokenPan.length - 4)}
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
                  {loadingToggle ? (
                    <Loader />
                  ) : (
                    <>
                      <Switch color="warning" checked={checked} onChange={handleChange} />
                      <MDTypography variant="h6" fontWeight="medium" sx={{ marginLeft: "1rem" }}>
                        {checked ? "On" : "Off"}
                      </MDTypography>
                    </>
                  )}
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={7}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChangeAccordion("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon fontSize="medium" />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>Card Alerts</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <MDBox
                    borderRadius="lg"
                    display="flex"
                    justifyContent="space-between"
                    p={3}
                    mb={3}
                    alignItems="center"
                    sx={{
                      border: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/dashboard/card-detail/transaction-amount")}
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

                  <MDBox
                    borderRadius="lg"
                    display="flex"
                    justifyContent="space-between"
                    p={3}
                    mb={3}
                    alignItems="center"
                    sx={{
                      border: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,

                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/dashboard/card-detail/internet-transactions")}
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

                  <MDBox
                    borderRadius="lg"
                    display="flex"
                    justifyContent="space-between"
                    p={3}
                    mb={3}
                    alignItems="center"
                    sx={{
                      border: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/dashboard/card-detail/international-transactions")}
                  >
                    <MDBox display="flex" flexDirection="column">
                      <MDTypography variant="h5" fontWeight="medium">
                        International Transactions
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

                  <MDBox
                    borderRadius="lg"
                    display="flex"
                    justifyContent="space-between"
                    p={3}
                    alignItems="center"
                    sx={{
                      border: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/dashboard/card-detail/suspected-alerts")}
                  >
                    <MDBox display="flex" flexDirection="column">
                      <MDTypography variant="h5" fontWeight="medium">
                        Suspected Fraud Alerts
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
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChangeAccordion("panel2")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      fontSize="medium"
                      sx={{
                        transform: "rotate(270deg)",
                      }}
                    />
                  }
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  onClick={() => navigate("/dashboard/card-detail/travel-memos")}
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>Manage Travel Memos</Typography>
                </AccordionSummary>
              </Accordion>
            </Grid>
          </Grid>
        )}
      </MDBox>
    </Card>
  );
}

export default CardDetailComponent;
