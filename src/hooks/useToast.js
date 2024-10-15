import { useContext } from 'react';
import { ToastContext } from '../context/ToastProvider';

const useToast = () => {
  const toastContext = useContext(ToastContext);
  const toast = toastContext?.toast;
  if (!toast) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return toast;
};

export default useToast;