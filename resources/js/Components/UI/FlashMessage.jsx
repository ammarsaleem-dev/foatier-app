import { useEffect, useState } from "react";

/**
 * Represnet a message shows as notification.
 * @param {string} type - The message type like success, error etc..
 * @param {string} message - The notification message shows to the user.
 */
export default function FlashMessage({ type = "", message = "" }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true); // Reset visible when message changes
      const timeout = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  if (!visible || !message) return null;

  const baseStyle =
    "fixed bottom-15 right-8 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 z-50";
  const typeStyles = {
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    info: "bg-blue-100 text-blue-800 border border-blue-300",
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type] || typeStyles.info}`}>
      <span>{message}</span>
    </div>
  );
}
