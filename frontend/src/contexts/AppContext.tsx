import {
  useState,
  createContext,
  useContext,
  type ReactNode
} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from 'react-query';
import { validateToken } from '../api/authClient';
import type { AppContext } from '../types/appContext';
import type { ToastMessage } from '../types/toastMessage';
import Toast from '../components/shared/Toast';

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;

const AppContext = createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const AppContextProvider = ({
  children
}: {
  children: ReactNode
}
) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery('validateToken', validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider value={{
      showToast: (toastMessage) => {
        setToast(toastMessage);
      },
      isLoggedIn: !isError,
      stripePromise
    }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context as AppContext;
};