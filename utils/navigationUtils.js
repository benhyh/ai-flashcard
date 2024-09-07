import { useRouter } from "next/navigation";

export const useNavigationUtils = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    try {
      router.push(`/dashboard`);
    } catch (error) {
      console.error("Error redirecting to dashboard:", error);
    }
  };

  const handleDeckClick = (deckName) => {
    try {
      router.push(`/dashboard/deck/${deckName}`);
    } catch (error) {
      console.error("Error redirecting to deck:", error);
    }
  };

  return {
    handleHomeClick,
    handleDeckClick,
  };
};
