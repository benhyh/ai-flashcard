import { SignInButton } from "@clerk/nextjs";
import { Navigation } from "./Navigation";
import { Box, Container, Typography, Button, Stack } from "@mui/material";

export const Hero = () => {
  return (
    <>
      <Navigation />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            fontFamily={"Fondamento"}
            component="h1"
            variant="h2"
            align="center"
            color="text.secondary"
            gutterBottom
            sx={{
              whiteSpace: "nowrap",
              fontSize: {
                xs: "2rem",
                md: "4rem",
              },
            }}
          >
            Welcome to{" "}
            <Box
              component="span"
              sx={{
                color: "white",
                display: "inline",
              }}
            >
              WokenAI
            </Box>
          </Typography>
          <Typography
            fontFamily={"Fondamento"}
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: {
                xs: "1.2rem",
                md: "1.5rem",
              },
            }}
          >
            Unravel Etherea&apos;s secrets and forge your legend with AI-powered
            knowledge
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <SignInButton>
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Fondamento",
                  backgroundColor: "#4b6a2e",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#374c28",
                  },
                  borderRadius: "20px",
                  padding: "10px 20px",
                }}
              >
                Begin Your Journey
              </Button>
            </SignInButton>
            <Button
              variant="outlined"
              sx={{
                fontFamily: "Fondamento",
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "#8FBC8F",
                  color: "#8FBC8F",
                },
                borderRadius: "20px",
                padding: "10px 20px",
              }}
            >
              Return To Etherea
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Hero;
