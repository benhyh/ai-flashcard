import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Icon,
  Button,
  CardActions,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { blue } from "@mui/material/colors";
import { Fondamento } from "next/font/google";

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
        id="features-section"
      >
        Features
      </Typography>
      <Grid container spacing={4} width={0.98}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                minHeight: "300px",
                bgcolor: "white",
              }}
            >
              <CardContent>
                <Icon color="primary" sx={{ fontSize: 48, mb: 2 }}>
                  {feature.icon}
                </Icon>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: blue[700],
                    color: "white",
                    textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: blue[800],
                    },
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
