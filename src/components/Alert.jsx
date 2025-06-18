import { useState, useEffect } from "react";
import { X } from "lucide-react";

const Alert = ({ type = "info", message, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  if (!visible) return null;
  
  const alertColors = {
    info: "bg-blue-100 border-blue-400 text-blue-700",
    success: "bg-green-100 border-green-400 text-green-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    error: "bg-red-100 border-red-400 text-red-700"
  };
  
  return (
    <div className={`fixed top-4 right-4 z-50 border-l-4 p-4 rounded-md shadow-lg ${alertColors[type]}`}>
      <div className="flex items-start">
        <div className="flex-1">
          {message}
        </div>
        <button 
          onClick={() => setVisible(false)}
          className="ml-4 text-current hover:opacity-75"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
