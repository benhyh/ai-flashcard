"use client";

import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("first name", firstName);
    formData.append("last name", lastName);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("access_key", "87c956d1-bcee-482c-8669-b714fbf34d96");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        e.target.reset();
        toast.success("Your message has been sent!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            fontFamily: "Fondamento",
            background: "#4b6a2e",
            color: "white",
          },
          progressStyle: {
            background: "#8fbc8f",
          },
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error  submitting form:", error);
      toast.error("Error submitting the form. Please try again!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          fontFamily: "Fondamento",
          background: "#4b6a2e",
          color: "white",
        },
        progressStyle: {
          background: "#8fbc8f",
        },
      });
    }
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#5c8239",
      },
      background: {
        default: "#242e21",
        paper: "#1a2412",
      },
      text: {
        primary: "#e0e0e0",
        secondary: "#a3c585",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "::selection": {
            backgroundColor: "#5c8239",
            color: "#ffffff",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#2c3e1e",
              "& fieldset": {
                borderColor: "#4b6a2e",
              },
              "&:hover fieldset": {
                borderColor: "#5c8239",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5c8239",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#a3c585",
            },
            "& .MuiInputBase-input": {
              color: "#e0e0e0",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#4b6a2e",
            "&:hover": {
              backgroundColor: "#5c8239",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Box
        sx={{
          backgroundColor: "#1a2412",
          p: 4,
          borderRadius: 2,
          boxShadow: 6,
        }}
      >
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="first-name"
                label="First name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="off"
                inputProps={{
                  autoComplete: "off",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="last-name"
                label="Last name"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
                inputProps={{
                  autoComplete: "off",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                inputProps={{
                  autoComplete: "off",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} sm={6}>
              <TextField
                fullWidth
                id="message"
                label="What can we help you with?"
                multiline
                rows={6}
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1, fontSize: "1.1rem", fontFamily: "Fondamento" }}
            style={{ textTransform: "none" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default ContactForm;
