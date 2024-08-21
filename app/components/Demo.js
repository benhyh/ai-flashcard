import { Box, Typography, CardMedia } from "@mui/material";

export const Demo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        id="demo-section"
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        fontFamily={"Fondamento"}
        color={"white"}
      >
        Demo Video
      </Typography>
      <CardMedia
        component="iframe"
        title="DEMO"
        src="https://www.youtube.com/watch?v=H58vbez_m4E"
        sx={{ maxWidth: 1 / 2, aspectRatio: "inherit" }}
      />
    </Box>
  );
};

export default Demo;
