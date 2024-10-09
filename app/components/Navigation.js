import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Container,
  IconButton,
  Menu,
  Link as MuiLink,
  List,
  Drawer,
} from "@mui/material";
import { useState } from "react";

export const Navigation = () => {
  const navigationItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/#contact" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        sx={{ bgcolor: "transparent", boxShadow: "none" }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component="img"
                src="https://static.wikia.nocookie.net/6a8a753d-275a-460b-bf7c-2772291b8913/scale-to-width/755"
                width={50}
                height={50}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Fondamento",
                }}
              >
                WokenAI
              </Typography>
            </Box>

            <IconButton
              sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              color="inherit"
            >
              <Menu />
            </IconButton>

            <Box
              component="nav"
              sx={{
                display: { xs: "none", lg: "flex" },
                ml: "auto",
                gap: 4,
              }}
            >
              {navigationItems.map((item) => (
                <MuiLink
                  key={item.name}
                  href={item.href}
                  sx={{
                    color: "white",
                    fontSize: "1.125rem",
                    textDecoration: "none",
                    fontFamily: "Fondamento",
                    "&:hover": { color: "#a3c585" },
                  }}
                >
                  {item.name}
                </MuiLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            bgcolor: "#1a2412",
            width: 250,
          },
        }}
      >
        <List>
          {navigationItems.map((item) => (
            <MuiLink
              key={item.name}
              href={item.href}
              sx={{
                color: "white",
                fontSize: "1.125rem",
                textDecoration: "none",
                fontFamily: "Fondamento",
                "&:hover": { color: "#a3c585" },
              }}
            >
              {item.name}
            </MuiLink>
          ))}
        </List>
      </Drawer>
    </>
  );
};
