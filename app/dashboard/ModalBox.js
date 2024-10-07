import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalBox = ({ onSubmit, handleClose, onChange, value }) => {
  const handleCreate = () => {
    if (value.trim() === "") {
      toast.error("Deck name cannot be empty!", {
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
      onChange("");
      return;
    }

    if (value.trim().length > 10) {
      toast.error("Deck name must be less than 10 characters!", {
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
      onChange("");
      return;
    }

    onSubmit(value);
    onChange("");
    handleClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        backgroundColor="#4b6a2e"
        color="white"
        border="1px solid"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" color="white" fontFamily="Fondamento">
          Create new deck
        </Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField
            variant="outlined"
            fullWidth
            value={value}
            placeholder="Enter name..."
            autoComplete="off"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Change outline color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Lighter shade of orange
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Change outline color when focused
                },
              },
              "& .MuiInputBase-input": {
                color: "white", // Change text color
                fontFamily: "Fondamento",
              },
            }}
          />
          <Button
            variant="outlined"
            onClick={handleCreate}
            sx={{
              borderColor: "white",
              color: "white",
              backgroundColor: "#4b6a2e",
              fontWeight: "bold",
              fontFamily: "Fondamento",
              "&:hover": {
                backgroundColor: "#4b6a2e",
                borderColor: "white",
              },
            }}
          >
            Create
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ModalBox;
