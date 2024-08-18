import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { AppBar, Button, Typography, Toolbar, Box } from "@mui/material";

export const Navigation = () => {
  return (
    <AppBar position="static" sx={{bgcolor: "black"}}>
      <Toolbar>
        <Box component="img" sx={{width: '2rem', mr: '1rem', mb: '6px'}} src="https://static.wikia.nocookie.net/6a8a753d-275a-460b-bf7c-2772291b8913/scale-to-width/755" />

        <Typography variant="h6" style={{ flexGrow: 1 }} sx={{flexDirection: "row", fontFamily: "Fondamento"}}>
          WokenAI
        </Typography>

        <SignedOut>
          <SignInButton>
            <Button color="inherit" sx={{fontFamily: "Fondamento"}}>Login</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
