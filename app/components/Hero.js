"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Link as MuiLink,
  Drawer,
  List,
  ListItem,
  Paper,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { Navigation } from "./Navigation";

// Styled components to match the original design
const StyledContainer = styled(Box)(() => ({
  minHeight: "100vh",
  color: "white",
  overflow: "hidden",
}));

const FlashcardPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2c3e1e",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: theme.shadows[24],
  maxWidth: "32rem",
  margin: "0 auto",
  transform: "scale(1)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export const Hero = () => {
  return (
    <StyledContainer>
      <Navigation />
      <Container sx={{ py: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 8,
            alignItems: "center",
          }}
        >
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", lg: "4.5rem" },
                fontWeight: "bold",
                lineHeight: "tight",
              }}
            >
              Forge your legend with AI-powered knowledge
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", lg: "1.5rem" },
                color: "#a3c585",
                fontFamily: "Fondamento",
              }}
            >
              Harness the power of AI to create dynamic flashcards that adapt to
              your learning style, unlocking the mysteries of any subject with
              unprecedented efficiency.
            </Typography>
            <SignInButton mode="modal">
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Fondamento",
                  bgcolor: "#4b6a2e",
                  color: "white",
                  borderRadius: "9999px",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  "&:hover": {
                    bgcolor: "#5c8239",
                    boxShadow: "0 0 20px rgba(163, 197, 133, 0.2)",
                  },
                }}
                endIcon={<ChevronRight />}
              >
                Begin Your Journey
              </Button>
            </SignInButton>
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "#4b6a2e",
                opacity: 0.2,
                filter: "blur(24px)",
                borderRadius: "9999px",
              }}
            />
            <FlashcardPaper>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    color: "#a3c585",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    fontFamily: "Fondamento",
                    letterSpacing: "2rem",
                  }}
                >
                  EMPOWERED
                </Typography>
                <Box
                  component="img"
                  src="https://static.wikia.nocookie.net/6a8a753d-275a-460b-bf7c-2772291b8913/scale-to-width/755"
                  width={40}
                  height={40}
                />
              </Box>
              <Paper
                sx={{
                  bgcolor: "#1a2412",
                  p: 3,
                  mb: 3,
                }}
              >
                <Typography
                  sx={{ color: "#a3c585", mb: 1, fontFamily: "Fondamento" }}
                >
                  Question:
                </Typography>
                <Typography sx={{ fontSize: "1.25rem", color: "white" }}>
                  What is an algorithm?
                </Typography>
              </Paper>
              <Paper sx={{ bgcolor: "#1a2412", p: 3 }}>
                <Typography
                  sx={{ color: "#a3c585", mb: 1, fontFamily: "Fondamento" }}
                >
                  Answer:
                </Typography>
                <Typography sx={{ fontSize: "1.25rem", color: "white" }}>
                  A set of specific steps for solving a category of problems.
                </Typography>
              </Paper>
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{ color: "#a3c585", mb: 1, fontFamily: "Fondamento" }}
                >
                  AI Confidence:{" "}
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    98%
                  </Box>
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={98}
                  sx={{
                    height: 12,
                    borderRadius: 9999,
                    bgcolor: "#1a2412",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#a3c585",
                      borderRadius: 9999,
                    },
                  }}
                />
              </Box>
            </FlashcardPaper>
          </Box>
        </Box>
      </Container>
    </StyledContainer>
  );
};
