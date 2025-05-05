import React from "react";
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import { HomeModernIcon, CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import Chart from "./Chart.jsx";
import Noti from "./AdminNotification.jsx";
import DashHeader from "./AdminHead.jsx";

const Dashboard = () => {
  return (
    <>
    <div><DashHeader></DashHeader></div>
    <Box sx={{ flex: 1, p: 4, position: "relative", height: "100vh", overflowY: "auto", backgroundColor: "#f9fafb" }}>
      <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
        <Card sx={{ width: 206, height: 180, borderRadius: 2, border: "1px solid #e5e7eb" }}>
          <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <HomeModernIcon className="h-5 w-5 text-gray-500" />
              <Typography variant="body2" color="text.secondary">Total Villas</Typography>
            </Stack>
            <Typography variant="h4" sx={{ mt: "auto", fontWeight: 700 }}>23K</Typography>
          </CardContent>
        </Card>

        <Card sx={{ width: 206, height: 180, borderRadius: 2, border: "1px solid #e5e7eb" }}>
          <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
              <Typography variant="body2" color="text.secondary">Monthly Villas</Typography>
            </Stack>
            <Typography variant="h4" sx={{ mt: "auto", fontWeight: 700 }}>527</Typography>
          </CardContent>
        </Card>

        <Card sx={{ width: 206, height: 180, borderRadius: 2, border: "1px solid #e5e7eb" }}>
          <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <UserGroupIcon className="h-5 w-5 text-gray-500" />
              <Typography variant="body2" color="text.secondary">Monthly Users</Typography>
            </Stack>
            <Typography variant="h4" sx={{ mt: "auto", fontWeight: 700 }}>494</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Box sx={{ mt: 4 }}>
        <Chart />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Noti />
      </Box>
    </Box>
    </>
  );
};

export default Dashboard;