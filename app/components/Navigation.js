import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Typography, Toolbar } from "@mui/material";

export const Navigation = () => {
  return (
    <AppBar position="static" sx={{bgcolor: "black"}}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }} sx={{fontFamily: "Fondamento"}}>
          WokenAI
        </Typography>

        <SignedOut>
          <SignInButton>
            <Button color="inherit">Login</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
