import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const AdminPanel = () => {
  const { isAdmin, showAnnotations, toggleAdmin, toggleAnnotations } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleLogin = () => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
    
    if (password === adminPassword) {
      toggleAdmin();
      setError("");
      setExpanded(true);
    } else {
      setError("密码错误");
    }
  };

  const handleLogout = () => {
    toggleAdmin();
    setPassword("");
    setExpanded(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isAdmin ? (
        <div className={`bg-white rounded-xl shadow-xl p-4 w-64 transition-all duration-300 ${expanded ? 'h-auto' : 'h-16 overflow-hidden'}`}>
          <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <h3 className="text-lg font-semibold">管理员面板</h3>
            {expanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </div>
          
          {expanded && (
            <>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="annotations"
                  checked={showAnnotations}
                  onChange={toggleAnnotations}
                  className="mr-2 h-4 w-4 text-red-500"
                />
                <label htmlFor="annotations" className="text-sm">
                  显示图片标注
                </label>
              </div>
              
              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                onClick={handleLogout}
              >
                退出管理员模式
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className={`bg-white rounded-xl shadow-xl p-4 w-64 transition-all duration-300 ${expanded ? 'h-auto' : 'h-16 overflow-hidden'}`}>
          <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <h3 className="text-lg font-semibold">管理员登录</h3>
            {expanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </div>
          
          {expanded && (
            <>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入管理员密码"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <Button 
                className="w-full bg-[#55A99C] hover:bg-[#4a8c80] text-white"
                onClick={handleLogin}
              >
                登录
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
