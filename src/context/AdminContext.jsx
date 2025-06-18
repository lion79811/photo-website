import { createContext, useContext, useState, useCallback } from "react";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('isAdmin') === 'true';
    } catch (error) {
      console.error('Error loading admin status:', error);
      return false;
    }
  });
  
  const [showAnnotations, setShowAnnotations] = useState(() => {
    try {
      return localStorage.getItem('showAnnotations') === 'true';
    } catch (error) {
      console.error('Error loading annotations status:', error);
      return false;
    }
  });

  const toggleAdmin = useCallback(() => {
    setIsAdmin(prev => {
      const newValue = !prev;
      try {
        localStorage.setItem('isAdmin', String(newValue));
      } catch (error) {
        console.error('Error saving admin status:', error);
      }
      return newValue;
    });
  }, []);

  const toggleAnnotations = useCallback(() => {
    setShowAnnotations(prev => {
      const newValue = !prev;
      try {
        localStorage.setItem('showAnnotations', String(newValue));
      } catch (error) {
        console.error('Error saving annotations status:', error);
      }
      return newValue;
    });
  }, []);

  const value = {
    isAdmin,
    showAnnotations,
    toggleAdmin,
    toggleAnnotations
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === null) {
    throw new Error('useAdmin 必须在 AdminProvider 内部使用');
  }
  return context;
};
