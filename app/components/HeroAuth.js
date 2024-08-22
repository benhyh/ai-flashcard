import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Navigation } from "./Navigation";
import { Box, Container, Typography, Button, Stack } from "@mui/material";

export const HeroAuth = () => {
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
        </Container>
      </Box>
    </>
  );
};

export default HeroAuth;
