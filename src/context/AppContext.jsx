import { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  user: null,
  theme: "light",
  isLoading: false,
  notifications: []
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [...state.notifications, action.payload] };
    case "REMOVE_NOTIFICATION":
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.payload) 
      };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    dispatch({ type: "SET_THEME", payload: savedTheme });
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);
  
  // 切换主题
  const toggleTheme = () => {
    const newTheme = state.theme === "light" ? "dark" : "light";
    dispatch({ type: "SET_THEME", payload: newTheme });
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  
  // 添加通知
  const addNotification = (message, type = "info", duration = 5000) => {
    const id = Date.now();
    dispatch({ 
      type: "ADD_NOTIFICATION", 
      payload: { id, message, type } 
    });
    
    if (duration) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
      }, duration);
    }
  };
  
  return (
    <AppContext.Provider value={{
      ...state,
      toggleTheme,
      addNotification,
      setLoading: (isLoading) => dispatch({ type: "SET_LOADING", payload: isLoading }),
      setUser: (user) => dispatch({ type: "SET_USER", payload: user })
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
