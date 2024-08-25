import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Navigation } from "./Navigation";
import { Box, Container, Typography, Button, Stack } from "@mui/material";

export const Hero = () => {
  const { isSignedIn, signOut } = useAuth();

  const handleSignOut = () => {
    signOut().then(() => {
      window.location.href = "/";
    });
  };

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
          {isSignedIn ? (
            <>
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
                What&apos;s the{" "}
                <Box
                  component="span"
                  sx={{
                    color: "white",
                    display: "inline",
                  }}
                >
                  move?
                </Box>
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
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
                  href="/dashboard"
                >
                  Go to Dashboard
                </Button>
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
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </Stack>
            </>
          ) : (
            <>
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
                Unravel Etherea&apos;s secrets and forge your legend with
                AI-powered knowledge
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <SignInButton mode="modal">
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
                    Return To Etherea
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
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
                    Begin Your Journey
                  </Button>
                </SignUpButton>
              </Stack>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Hero;
