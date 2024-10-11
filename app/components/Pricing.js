import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import getStripe from "@/utils/get-stripe";
import React from "react";
import { Gavel } from "lucide-react";
export const Pricing = () => {
  const handleSubmit = async (id) => {
    const checkoutSession = await fetch("/api/stripe", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
      body: JSON.stringify({
        productId: id,
      }),
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const plans = [
    {
      id: 0,
      title: "Power 1",
      price: "$0.99",
      features: [
        "100 AI-Powered Cards",
        "One Character Slot",
        "1 Random Talent",
        "Basic Analytics",
        "Email Support",
      ],
    },
    {
      id: 1,
      title: "Power 10",
      price: "$9.99",
      features: [
        "1000 AI-Powered Cards",
        "2 Character Slots",
        "3 Random Talents",
        "Advanced Analytics",
        "Priority Email Support",
      ],
    },
    {
      id: 2,
      title: "Power 20",
      price: "$19.99",
      features: [
        "Unlimited AI-Powered Cards",
        "5 Character Slots",
        "5 Random Talents",
        "Premium Analytics",
        "24/7 Support",
      ],
    },
  ];

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#4b6a2e",
      },
      background: {
        default: "#242e21",
        paper: "#242e21",
      },
      text: {
        primary: "#e0e0e0",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: "1rem", sm: "2rem" },
        }}
        id="pricing"
      >
        <Typography
          variant="h1"
          sx={{
            mt: { xs: "8rem", md: 0 },
            mb: "2rem",
            color: "#e0e0e0",
            fontFamily: "Fondamento",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "5rem" },
          }}
        >
          Choose your plan
          <Typography
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              color: "#e0e0e0",
              fontFamily: "Fondamento",
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
            }}
          >
            Unlock endless possibilities.
          </Typography>
        </Typography>
        <Grid
          container
          spacing={{ xs: 4, md: 6, lg: 8 }}
          sx={{ maxWidth: "90rem", width: "100%" }}
        >
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #4b6a2e",
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      mb: 1,
                      ml: { xs: 1, sm: 2 },
                      color: "#4b6a2e",
                      fontWeight: "bold",
                      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                    }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 2,
                      ml: { xs: 1, sm: 2 },
                      fontWeight: "bold",
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                    }}
                  >
                    {plan.price}
                  </Typography>
                  <List>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem
                        key={featureIndex}
                        sx={{ py: { xs: 0.5, md: 1 } }}
                      >
                        <ListItemIcon
                          sx={{ minWidth: "auto", mr: 1, color: "#4b6a2e" }}
                        >
                          <Gavel size={16} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{ xs: "0.9rem", sm: "1rem" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <CardActions sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleSubmit(plan.id)}
                      sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                        bgcolor: "#4b6a2e",
                        fontFamily: "Fondamento",
                        "&:hover": {
                          bgcolor: "#3a5423",
                        },
                      }}
                    >
                      Choose Pack
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
