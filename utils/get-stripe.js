import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      `pk_test_51Po9lRRsD0EDsyMipZ7TP7HpG9HxgYiZI0QUcZCS6wuCHUZFhoxVMTO9v1ab3bgI8Q2SwRIW1782siQeUBq5i8HX009GNVwgC2`
    );
  }
  return stripePromise;
};

export default getStripe;
