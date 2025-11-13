import { createContext, useContext, type ReactNode, useState } from 'react';
import { useQuery } from 'react-query';
import { validateToken } from '../api/api-client';
import type { AppContext } from '../types/appContext';
import type { ToastMessage } from '../types/toastMessage';
import Toast from '../components/shared/Toast';

const AppContext = createContext<AppContext | undefined>(undefined);

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
      isLoggedIn: !isError
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