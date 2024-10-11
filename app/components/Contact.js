import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import ContactForm from "./ContactForm";

export const Contact = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        id="contact"
      >
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            mt: 24,
          }}
        >
          <Grid container spacing={12} justifyContent="space-between">
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontFamily: "Fondamento",
                }}
              >
                Contact us
                <Typography
                  sx={{
                    color: "#a3c585",
                    fontFamily: "Fondamento",
                    mt: 3,
                    fontSize: "1.2rem",
                  }}
                >
                  Need to get in touch with us? Either fill out the form with
                  your inquiry or find the department email you&apos;d like to
                  contact below.
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ContactForm />
            </Grid>
          </Grid>
        </Container>
        <Box
          component="footer"
          sx={{
            bgcolor: "#4b6a2e",
            py: 2,
            mt: { xs: 9 },
          }}
        >
          <Typography
            variant="body2"
            align="center"
            color="white"
            sx={{ fontSize: "1.2rem", fontFamily: "Fondamento" }}
          >
            © 2024 Woken AI. Made with 💚
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
