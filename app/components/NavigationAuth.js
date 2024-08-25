import { AppBar, Button, Typography, Toolbar, Box, Stack } from "@mui/material";
import { green } from "@mui/material/colors";

export const NavigationAuth = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "black" }}>
      <Toolbar>
        <Box
          component="img"
          sx={{ width: "2rem", mr: "1rem", mb: "6px" }}
          src="https://static.wikia.nocookie.net/6a8a753d-275a-460b-bf7c-2772291b8913/scale-to-width/755"
        />

        <Typography
          variant="h6"
          style={{ flexGrow: 1 }}
          sx={{ flexDirection: "row", fontFamily: "Fondamento" }}
        >
          WokenAI
        </Typography>

        <Stack direction="row" spacing={3}>
          <Button
            color="inherit"
            sx={{
              fontFamily: "Fondamento",
              "&:hover": {
                color: green[800],
              },
            }}
            href="/"
          >
            Go Back
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
