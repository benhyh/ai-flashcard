"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Typography, Toolbar, ThemeProvider, createTheme } from "@mui/material";

export const Navigation = () => {
  return (
    <AppBar position="static" sx={{bgcolor: "black"}}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }} sx={{fontFamily: "Fondamento"}}>
          WokenAI
        </Typography>

        <SignedOut>
          <Button color="inherit" href="/sign-in">
            Login
          </Button>
          <Button color="inherit" href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
