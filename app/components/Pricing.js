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
import { blue, green, purple } from "@mui/material/colors";
import getStripe from "@/utils/get-stripe";
import SwordIcon from "@mui/icons-material/Gavel";
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
      price: "$0.00",
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
          p: 4,
        }}
        id="pricing"
      >
        <Typography
          variant="h1"
          sx={{ mb: 8, color: "#e0e0e0", fontFamily: "Fondamento" }}
        >
          Choose your plan
          <Typography
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              mt: 2,
              color: "#e0e0e0",
              fontFamily: "Fondamento",
              fontSize: "2rem",
            }}
          >
            Unlock endless possibilities.
          </Typography>
        </Typography>
        <Grid container spacing={8} sx={{ maxWidth: "1500px", width: "100%" }}>
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "50dvh",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #4b6a2e",
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ mb: 1, ml: 2, color: "#4b6a2e", fontWeight: "bold" }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ mb: 2, ml: 2, fontWeight: "bold" }}
                  >
                    {plan.price}
                  </Typography>
                  <List>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ py: 1.3 }}>
                        <ListItemIcon
                          sx={{ minWidth: "auto", mr: 1, color: "#4b6a2e" }}
                        >
                          <Gavel size={16} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleSubmit(plan.id)}
                    sx={{
                      fontSize: "1.1rem",
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
