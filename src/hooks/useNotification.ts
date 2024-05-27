import { useState } from "react";

const useNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  return {
    showNotification,
    setShowNotification,
    notificationText,
    setNotificationText,
  };
};

export default useNotification;
