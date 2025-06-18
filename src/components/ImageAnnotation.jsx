import { useAdmin } from "@/context/AdminContext";
import { useTheme } from "@/theme/theme.provider";

const ImageAnnotation = ({ label, children }) => {
  let adminContext;
  try {
    adminContext = useAdmin();
  } catch (error) {
    console.warn('ImageAnnotation: AdminProvider not found, annotations disabled');
    return children;
  }

  const { isAdmin, showAnnotations } = adminContext;
  const { theme } = useTheme();
  
  if (!isAdmin || !showAnnotations) return children;
  
  const borderColor = theme === 'dark' ? 'border-yellow-400' : 'border-red-500';
  const bgColor = theme === 'dark' ? 'bg-yellow-500' : 'bg-red-500';
  
  return (
    <div className="relative group">
      {children}
      <div className={`absolute inset-0 border-2 ${borderColor} border-dashed rounded-lg z-10 pointer-events-none`}></div>
      <div className={`absolute top-0 left-0 ${bgColor} text-white text-xs px-2 py-1 rounded-br-lg z-20`}>
        {label}
      </div>
    </div>
  );
};

export default ImageAnnotation;
