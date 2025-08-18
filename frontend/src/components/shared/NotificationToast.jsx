import React, { useContext, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { DataContext } from "../../context/DataContext";

function NotificationToast() {
  const { notification, clearNotification } = useContext(DataContext);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-success" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-warning" />;
      case 'error':
        return <XCircle size={20} className="text-danger" />;
      default:
        return <Info size={20} className="text-info" />;
    }
  };

  const getVariant = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      default:
        return 'info';
    }
  };

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
          >
            <Toast
              show={!!notification}
              onClose={clearNotification}
              className={`border-0 shadow-lg`}
              style={{
                backgroundColor: 'white',
                borderLeft: `4px solid ${
                  notification.type === 'success' ? '#10b981' :
                  notification.type === 'warning' ? '#f59e0b' :
                  notification.type === 'error' ? '#ef4444' : '#3b82f6'
                }`
              }}
            >
              <Toast.Header className="border-0">
                <div className="me-2">{getIcon(notification.type)}</div>
                <strong className="me-auto">
                  {notification.type === 'success' ? 'Success' :
                   notification.type === 'warning' ? 'Warning' :
                   notification.type === 'error' ? 'Error' : 'Info'}
                </strong>
                <small>now</small>
              </Toast.Header>
              <Toast.Body>{notification.message}</Toast.Body>
            </Toast>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContainer>
  );
}

export default NotificationToast;
