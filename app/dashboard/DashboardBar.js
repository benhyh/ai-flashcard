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
      </Toolbar>
    </AppBar>
  );
};
