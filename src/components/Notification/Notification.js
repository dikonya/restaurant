import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import './Notification.css';  

const Notification = ({ notifications, onClose }) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notifications, onClose]);

  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <Alert key={index} variant="secondary" className="notification-alert">
          {notification.message}
        </Alert>
      ))}
    </div>
  );
};

export default Notification;
