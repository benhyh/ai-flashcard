import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const ModalBox = ({ setDeck, handleClose, addDeck, deck }) => {
  const handleCreateDeck = () => {
    addDeck(deck);
    setDeck("");
    handleClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateDeck();
    }
  };

  return (
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
          value={deck}
          placeholder="Enter deck name..."
          onChange={(e) => setDeck(e.target.value)}
          onKeyPress={handleKeyPress}
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
          onClick={handleCreateDeck}
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
  );
};

export default ModalBox;
