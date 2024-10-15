"use client"
import { useState, useEffect, createContext, useMemo } from 'react';
import Toast from '../components/Toast/Toast';

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (toast) {
      setTimer(
        setTimeout(() => {
          setToast(null);
        }, 5000)
      );
    }
    return () => clearTimeout(timer);
  }, [toast]);

  const toastContext = useMemo(
    () => ({
      toast: (message, type) => {
        setToast({ message, type });
      },
    }),
    [setToast]
  );

  return (
    <ToastContext.Provider value={toastContext}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;