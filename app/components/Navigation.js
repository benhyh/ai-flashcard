import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Container,
  IconButton,
  Link as MuiLink,
  List,
  Drawer,
} from "@mui/material";
import { MenuIcon } from "lucide-react";
import { useCallback, useState } from "react";

export const Navigation = () => {
  const navigationItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/#contact" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNavigation = useCallback((e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    window.history.pushState({}, "", href);

    const targetId = href.split("#")[1];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const NavLink = ({ href, children, ...props }) => (
    <a
      href={href}
      onClick={(e) => handleNavigation(e, href)}
      style={{
        color: "white",
        fontSize: "1.125rem",
        textDecoration: "none",
        fontFamily: "Fondamento",
        padding: "1rem",
      }}
      {...props}
    >
      {children}
    </a>
  );

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
                sx={{
                  width: { xs: 30, sm: 40, md: 50 },
                  height: { xs: 30, sm: 40, md: 50 },
                }}
              />
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Fondamento",
                  fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
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
              <MenuIcon />
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
            width: "50%",
          },
        }}
      >
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {navigationItems.map((item) => (
            <NavLink
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
            </NavLink>
          ))}
        </List>
      </Drawer>
    </>
  );
};
