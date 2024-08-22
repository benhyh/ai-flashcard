import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { blue, green, purple } from "@mui/material/colors";
import getStripe from "@/utils/get-stripe";
import SwordIcon from "@mui/icons-material/Gavel";
import React from "react";

export const Pricing = () => {
  const handleSubmit = async (subscriptionDetails) => {
    const checkoutSession = await fetch("/api/stripe", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
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
      title: "Power 1",
      price: "$0.99",
      period: "/month",
      features: [
        "100 AI-Powered Talent Cards",
        "One Character Slot",
        "1 Random Talent",
      ],
      color: blue[700],
    },
    {
      title: "Power 10",
      price: "$9.99",
      period: "/month",
      features: [
        "1000 AI-Powered Talent Cards",
        "2 Character Slots",
        "3 Random Talents",
      ],
      color: green[800],
    },
    {
      title: "Power 20",
      price: "$19.99",
      period: "/month",
      features: [
        "Unlimited AI-Powered Talent Cards",
        "5 Character Slots",
        "5 Random Talents",
      ],
      color: purple[700],
    },
  ];

  return (
    <Box
      sx={{
        my: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        fontFamily={"Fondamento"}
        color={"white"}
        id="pricing-section"
      >
        Pricing
      </Typography>
      <Grid container spacing={4} maxWidth="lg">
        {plans.map((pack, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                bgcolor: "#16213e",
                color: "#e0e0e0",
                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  fontFamily={"Fondamento"}
                  color={pack.color}
                >
                  {pack.title}
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  gutterBottom
                  fontFamily={"Fondamento"}
                >
                  {pack.price}
                  <Typography variant="subtitle1" component="span">
                    {" "}
                    {pack.currency}
                  </Typography>
                </Typography>
                <List>
                  {pack.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} dense>
                      <ListItemIcon>
                        <SwordIcon sx={{ color: pack.color }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        sx={{
                          color: "#e0e0e0",
                          "& .MuiListItemText-primary": {
                            fontFamily: "Fondamento",
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: pack.color,
                    color: "white",
                    textTransform: "uppercase",
                    fontFamily: "Fondamento",
                    "&:hover": {
                      backgroundColor: pack.color,
                      opacity: 0.9,
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Choose Pack
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
