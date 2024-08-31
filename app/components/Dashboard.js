import React from "react";
import { AppBar, Toolbar, Drawer, Box } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import DashboardSide from "./DashboardSide";
import DashboardExit from "./DashboardExit";
import DashboardMain from "./DashboardMain";
import { DashboardBar } from "./DashboardBar";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "black",
        }}
      >
        <DashboardBar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,  
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <DashboardSide />
        <DashboardExit />
      </Drawer>
      <DashboardMain user={user} />
    </Box>
  );
};

export default Dashboard;
