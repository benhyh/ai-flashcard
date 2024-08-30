import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Drawer,
  Box,
  Paper,
  Grid,
} from "@mui/material";

const DashboardMain = ({ user }) => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, color: "white", fontFamily: "Fondamento" }}
    >
      <Toolbar />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Hi, ...
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Welcome back!
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          sx={{
            mr: 1,
            background: "black",
            color: "white",
            backgroundColor: "#4b6a2e",
            fontFamily: "Fondamento",
            "&:hover": {
              backgroundColor: "#374c28",
            },
          }}
        >
          Play
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "black",
            color: "white",
            borderColor: "white",
            fontFamily: "Fondamento",
            "&:hover": {
              borderColor: "#8FBC8F",
              color: "#8FBC8F",
            },
          }}
        >
          + Create
        </Button>
      </Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Latest Activity
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h4">12</Typography>
            <Typography variant="body2">Total</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4">2</Typography>
            <Typography variant="body2">Wrong</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4">10</Typography>
            <Typography variant="body2">Correct</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4">55%</Typography>
            <Typography variant="body2">Progress</Typography>
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }}>
          Play
        </Button>
      </Paper>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Folders
      </Typography>
      {/* Add your folder components here */}
    </Box>
  );
};

export default DashboardMain;
