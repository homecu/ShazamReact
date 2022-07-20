/* eslint-disable no-nested-ternary */
import { useContext, useEffect, useState } from "react";
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
import { Box, MenuItem, Select } from "@mui/material";

function TravelMemo() {
  const navigate = useNavigate();

  const { loading, error, setTravelMemoSelected, cardDetail, getCardTravelMemos, travelMemos } =
    useContext(CardsContext);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigateGo = (travelMemoSelected) => {
    setTravelMemoSelected(travelMemoSelected);
    navigate("/dashboard/card-detail/travel-memos/travel-memo");
  };
  useEffect(() => {
    getCardTravelMemos();
  }, []);
  useEffect(() => {
    if (cardDetail.tokenPan === undefined) {
      navigate("/dashboard");
    }
  }, []);

  const [filteredList, setFilteredList] = useState(travelMemos);

  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filterByStatus = (filteredData) => {
    if (!selectedStatus || selectedStatus === "All") {
      return filteredData;
    }

    return filteredData.filter((res) => res.status.split(" ").indexOf(selectedStatus) !== -1);
  };

  useEffect(() => {
    const filteredData = filterByStatus(travelMemos);
    setFilteredList(filteredData);
  }, [selectedStatus]);

  useEffect(() => {
    setFilteredList(travelMemos);
  }, [travelMemos]);

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
            {error && <p>Error obtaining card info</p>}
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              <Loader />
            </Grid>
          ) : travelMemos?.length > 0 ? (
            <Grid item xs={12} md={7}>
              <Select
                labelId="status-input"
                id="status-input"
                value={selectedStatus}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Declined">Declined</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>

              {filteredList.map((res) => (
                <Box key={res.createdTimestamp}>
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
                    mb={4}
                  >
                    <MDBox display="flex" justifyContent="space-between" flexDirection="column">
                      <MDTypography variant="h6" fontWeight="medium">
                        {res.tripName}
                      </MDTypography>

                      <MDTypography variant="h6" fontWeight="medium">
                        {res.startDate} / {res.endDate}
                      </MDTypography>

                      <MDTypography variant="h6" fontWeight="medium">
                        {res.memo}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      ml="auto"
                      lineHeight={0}
                      color={darkMode ? "white" : "dark"}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <MDTypography variant="h6" fontWeight="medium">
                        {res.status}
                      </MDTypography>
                      <Tooltip title="Edit Card" placement="top">
                        <Icon sx={{ cursor: "pointer" }} fontSize="small">
                          edit
                        </Icon>
                      </Tooltip>
                    </MDBox>
                  </MDBox>
                </Box>
              ))}
            </Grid>
          ) : (
            <>No Travel Memos found</>
          )}
        </Grid>
      </MDBox>
    </Card>
  );
}

export default TravelMemo;
