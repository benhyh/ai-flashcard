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
      }}
    >
      <Grid container spacing={3} maxWidth="1200px">
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
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <video
              id="features"
              controls
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src="/videos/Demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
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
            fontSize: 64,
            mb: 2,
            color: "#638c40",
          }}
        >
          {feature.icon}
        </Icon>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          className={fondamento.className}
        >
          {feature.title}
        </Typography>
        <Typography
          variant="body2"
          className={fondamento.className}
          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          {feature.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Features;
