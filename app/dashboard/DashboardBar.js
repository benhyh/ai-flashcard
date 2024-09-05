import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Box,
  InputBase,
  Modal,
} from "@mui/material";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import ModalBox from "./ModalBox";

export const DashboardBar = ({
  open,
  handleClose,
  setDeck,
  addDeck,
  handleOpen,
  folder,
}) => {
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
        <div
          style={{
            position: "relative",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            marginRight: "16px",
          }}
        >
          <SearchIcon
            sx={{
              position: "absolute",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "0 16px",
            }}
          />
          <InputBase
            placeholder="Search…"
            sx={{
              color: "inherit",
              padding: "8px 8px 8px 48px",
              width: "100%",
              fontFamily: "Fondamento",
            }}
          />
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            fontFamily: "Fondamento",
            backgroundColor: "#4b6a2e",
            "&:hover": {
              backgroundColor: "#374c28",
            },
          }}
          onClick={() => {
            handleOpen();
          }}
        >
          Create
        </Button>
        <Modal open={open} onClose={handleClose}>
          <ModalBox
            handleClose={handleClose}
            setDeck={setDeck}
            addDeck={addDeck}
            folder={folder}
          />
        </Modal>
      </Toolbar>
    </AppBar>
  );
};
