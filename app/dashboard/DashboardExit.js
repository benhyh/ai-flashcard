import { Avatar, Box, Button, Typography } from "@mui/material";
import { SignOutButton, useAuth, useUser } from "@clerk/nextjs";

export const DashboardExit = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        p: 2,
        backgroundColor: "#4b6a2e",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {isSignedIn && user && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar sx={{ mr: 2, bgcolor: "#8c8c8c" }} src={user.profileImageUrl}>
            {user.firstName ? user.firstName[0] : "U"}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontFamily: "Fondamento" }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.7)", fontFamily: "Fondamento" }}
            >
              {user.emailAddresses[0].emailAddress}
            </Typography>
          </Box>
        </Box>
      )}
      <SignOutButton redirectUrl="/">
        <Button
          variant="contained"
          sx={{
            background: "black",
            color: "white",
            backgroundColor: "#4b6a2e",
            border: "1px solid white",
            fontFamily: "Fondamento",
            width: "210px",
            "&:hover": {
              backgroundColor: "#374c28",
            },
          }}
        >
          Log Out
        </Button>
      </SignOutButton>
    </Box>
  );
};
