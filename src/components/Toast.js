import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const show = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);
  return <ToastContext.Provider value={show}>{children}{toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);

// Standalone Toast that wraps the app
let _showToast = null;
export const setToastFn = (fn) => { _showToast = fn; };
export const showToast = (msg, type) => _showToast && _showToast(msg, type);

export default function Toast() {
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    setToastFn((message, type = 'success') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3200);
    });
  }, []);
  if (!toast) return null;
  return <div className={`toast toast-${toast.type}`}>{toast.message}</div>;
}
