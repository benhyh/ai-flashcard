import { Toolbar, Typography, Button, Box, Paper, Grid } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const DashboardMain = ({ user }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, color: "white" }}>
      <Toolbar />
      <Typography variant="h3" sx={{ mb: 2, fontFamily: "Fondamento" }}>
        Hi, ...
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          sx={{
            padding: 1.5,
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
            padding: 1.5,
            ml: 2,
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
      <Paper
        sx={{
          p: 3,
          mb: 2,
          width: "30vw",
          height: "15vh",
          backgroundColor: "transparent",
          color: "white",
          border: "2px solid white",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1, fontFamily: "Fondamento" }}>
          Latest Activity
        </Typography>
        <Grid
          container
          gap={5}
          sx={{
            textAlign: "center",
            alignItems: "center",
            mt: 4,
            ml: 2,
          }}
        >
          <Grid item>
            <Typography variant="h5" sx={{ fontFamily: "Fondamento" }}>
              Java
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ fontFamily: "Fondamento" }}>
              12
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Fondamento" }}>
              Total
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ fontFamily: "Fondamento" }}>
              2
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Fondamento" }}>
              Wrong
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ fontFamily: "Fondamento" }}>
              10
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Fondamento" }}>
              Correct
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ fontFamily: "Fondamento" }}>
              55%
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Fondamento" }}>
              Progress
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ ml: 2 }}>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                padding: 1.5,
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
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h4" sx={{ mb: 2, fontFamily: "Fondamento" }}>
        Folders
      </Typography>
      {/* Add your folder components here */}
    </Box>
  );
};

export default DashboardMain;
