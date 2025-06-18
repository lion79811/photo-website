import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@/styles/global.css";
import "@/styles/variables.css";

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("全局错误:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">应用发生错误</h1>
            <p className="text-gray-600 mb-6">
              抱歉，应用遇到问题无法继续运行。请尝试刷新页面或联系技术支持。
            </p>
            <button
              className="bg-[#55A99C] hover:bg-[#4a8c80] text-white py-2 px-6 rounded-full"
              onClick={() => window.location.reload()}
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
