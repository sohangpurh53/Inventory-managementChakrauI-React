// NotificationComponent.jsx
import React, { useState, useEffect } from 'react';
import './css/notification.css'

const NotificationComponent = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => setShow(false), 2000); // Set a timeout to auto-dismiss after 5 seconds
    }
  }, [message]);

  return (
    <div className={`notification ${show ? 'show' : 'hide'}`}>
      {message}
    </div>
  );
};

export default NotificationComponent;
