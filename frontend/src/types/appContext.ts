import type { ToastMessage } from './toastMessage';
import type { Stripe } from '@stripe/stripe-js';

export type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>
};