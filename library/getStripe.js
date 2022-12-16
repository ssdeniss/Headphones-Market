import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51MFIbUL0n0NpanI6UKv7moW1uicTDAaH7xuMsjaTpTIiGTSnigm7B36GdgAMuAl6ZZF8ZFBXM55AKhUoTdJL5lp700IkH8Lw7y"
    );
  }
  return stripePromise;
};

export default getStripe;
