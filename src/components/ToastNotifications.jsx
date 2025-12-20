// =============================================
// TOAST NOTIFICATIONS — D'GUST ERP
// Wrapper para React Toastify com padrões do sistema
// =============================================

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configuração global do Toast
export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      className="toast-container"
      toastClassName="toast-item"
      bodyClassName="toast-body"
      progressClassName="toast-progress"
    />
  );
}

// Funções helper com padrões do D'GUST ERP
export const showToast = {
  success: (message) => {
    toast.success(message, {
      icon: '✅',
      className: 'toast-success',
    });
  },

  error: (message) => {
    toast.error(message, {
      icon: '❌',
      className: 'toast-error',
    });
  },

  warning: (message) => {
    toast.warning(message, {
      icon: '⚠️',
      className: 'toast-warning',
    });
  },

  info: (message) => {
    toast.info(message, {
      icon: 'ℹ️',
      className: 'toast-info',
    });
  },

  loading: (message) => {
    return toast.loading(message, {
      className: 'toast-loading',
    });
  },

  update: (toastId, { message, type = 'success' }) => {
    toast.update(toastId, {
      render: message,
      type,
      isLoading: false,
      autoClose: 4000,
    });
  },
};

// Export compatível com sistema antigo
export function useToast() {
  return {
    addToast: (message, type = 'info') => {
      showToast[type](message);
    },
  };
}
