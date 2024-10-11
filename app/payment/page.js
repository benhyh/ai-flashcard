"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Box, Typography, CircularProgress } from "@mui/material";

const REDIRECT_DELAY = 3000; // 3 seconds delay

export default function PaymentSuccess() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (isLoaded) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            if (isSignedIn) {
              router.push("/dashboard");
            } else {
              router.push("/");
            }
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "radial-gradient(closest-corner, #4b6a2e, #242e21)",
        color: "white",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, fontFamily: "Fondamento" }}>
        Payment Successful
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, fontFamily: "Fondamento" }}>
        Redirecting you in {countdown} seconds...
      </Typography>
      <CircularProgress color="inherit" />
    </Box>
  );
}
