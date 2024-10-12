import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Icon,
  Paper,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Fondamento } from "next/font/google";

const fondamento = Fondamento({
  weight: "400",
  subsets: ["latin"],
});

export const Features = () => {
  const features = [
    {
      icon: <AutoStoriesIcon fontSize="large" />,
      title: "AI-Generated Content",
      description:
        "Automatically create flashcards from your study materials using OpenAI GPT-4.",
    },
    {
      icon: <PsychologyIcon fontSize="large" />,
      title: "Smart Learning",
      description:
        "Adaptive learning algorithms tailor your study sessions for maximum retention.",
    },
    {
      icon: <ScheduleIcon fontSize="large" />,
      title: "Spaced Repetition",
      description:
        "Optimize your study schedule with scientifically-proven spaced repetition techniques.",
    },
    {
      icon: <TrendingUpIcon fontSize="large" />,
      title: "Progress Tracking",
      description:
        "Monitor your learning progress with detailed analytics and insights, helping identify areas for focus.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "90%", md: "100%" },
        margin: "0 auto",
      }}
      id="features"
    >
      <Typography
        sx={{
          display: "flex",
          textAlign: "center",
          mb: { xs: 4, md: 8 },
          color: "#e0e0e0",
          fontFamily: "Fondamento",
          fontSize: { xs: "2rem", md: "6rem" },
        }}
      >
        See your power in action
      </Typography>
      <Grid container spacing={3} maxWidth="1600px">
        <Grid item container xs={12} md={3} spacing={3}>
          {features.slice(0, 2).map((feature, index) => (
            <Grid item xs={12} key={index}>
              <FeatureCard feature={feature} />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              height: { xs: "40vh", sm: "50vh", md: "60vh" },
              display: "flex",
              height: "60dvh",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <video
              controls
              muted
              loop
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src="/videos/Demo.mp4" type="video/mp4" />
            </video>
          </Paper>
        </Grid>
        <Grid item container xs={12} md={3} spacing={3}>
          {features.slice(2).map((feature, index) => (
            <Grid item xs={12} key={index + 2}>
              <FeatureCard feature={feature} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
const FeatureCard = ({ feature }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "rgba(75, 106, 46, 0.8)",
        color: "#ffffff",
        borderRadius: 4,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent>
        <Icon
          sx={{
            fontSize: { xs: 48, sm: 56, md: 64 },
            mb: 3,
            color: "#638c40",
          }}
        >
          {feature.icon}
        </Icon>
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          className={fondamento.className}
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
            fontFamily: "Fondamento",
          }}
        >
          {feature.title}
        </Typography>
        <Typography
          variant="subtitle1"
          className={fondamento.className}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            fontFamily: "Fondamento",
          }}
        >
          {feature.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Features;
