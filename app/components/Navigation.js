import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Woken AI 🏯
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
};
