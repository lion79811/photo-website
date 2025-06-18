import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { texts as defaultTexts } from "@/config/texts";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";

const TextManagementPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const [textConfig, setTextConfig] = useState({});
  const [editingPath, setEditingPath] = useState(null);
  const [tempValue, setTempValue] = useState("");

  // 初始化文本数据
  useEffect(() => {
    const savedTexts = localStorage.getItem('textConfig');
    setTextConfig(savedTexts ? JSON.parse(savedTexts) : defaultTexts);
  }, []);

  // 保存文本配置到localStorage
  const saveTexts = (newTexts) => {
    localStorage.setItem('textConfig', JSON.stringify(newTexts));
    setTextConfig(newTexts);
  };

  // 开始编辑文本
  const startEdit = (path, currentValue) => {
    if (!isAdmin) return;
    setEditingPath(path);
    setTempValue(currentValue);
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingPath(null);
    setTempValue("");
  };

  // 保存编辑
  const saveEdit = () => {
    if (!editingPath || !isAdmin) return;
    
    const pathParts = editingPath.split('.');
    const newTexts = JSON.parse(JSON.stringify(textConfig));
    
    let current = newTexts;
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = tempValue;
    saveTexts(newTexts);
    cancelEdit();
  };

  // 恢复默认文本
  const restoreDefault = (path) => {
    if (!isAdmin) return;
    
    const pathParts = path.split('.');
    const newTexts = JSON.parse(JSON.stringify(textConfig));
    let defaultCurrent = defaultTexts;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      newTexts[pathParts[i]] = newTexts[pathParts[i]] || {};
      defaultCurrent = defaultCurrent[pathParts[i]];
    }
    
    newTexts[pathParts[pathParts.length - 1]] = defaultCurrent[pathParts[pathParts.length - 1]];
    saveTexts(newTexts);
  };

  // 递归渲染文本树
  const renderTextTree = (obj, path = "") => {
    return Object.keys(obj).map((key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];
      
      if (typeof value === "string") {
        return (
          <div key={currentPath} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b">
            <div className="mb-2 sm:mb-0 flex-1">
              <h4 className="font-medium">{currentPath}</h4>
              <div className="mt-1 p-2 bg-gray-50 rounded-md">
                {value}
              </div>
            </div>
            
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => startEdit(currentPath, value)}
                disabled={!isAdmin}
              >
                编辑
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => restoreDefault(currentPath)}
                disabled={!isAdmin}
              >
                恢复默认
              </Button>
            </div>
          </div>
        );
      } else if (Array.isArray(value)) {
        return (
          <div key={currentPath} className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{currentPath}</h3>
            <div className="grid grid-cols-1 gap-4">
              {value.map((item, index) => {
                if (typeof item === "object") {
                  return (
                    <div key={`${currentPath}[${index}]`} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">项目 {index + 1}</h4>
                      <div className="pl-4 border-l border-gray-200">
                        {renderTextTree(item, `${currentPath}[${index}]`)}
                      </div>
                    </div>
                  );
                } else {
                  const itemPath = `${currentPath}[${index}]`;
                  return (
                    <div key={itemPath} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium">{itemPath}</span>
                        <div className="flex space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => startEdit(itemPath, item)}
                            disabled={!isAdmin}
                          >
                            编辑
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => restoreDefault(itemPath)}
                            disabled={!isAdmin}
                          >
                            恢复
                          </Button>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-md mt-2">
                        {item}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      } else if (typeof value === "object") {
        return (
          <div key={currentPath} className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{currentPath}</h3>
            <div className="pl-4 border-l border-gray-200">
              {renderTextTree(value, currentPath)}
            </div>
          </div>
        );
      }
      return null;
    });
  };

  // 渲染编辑模态框
  const renderEditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">编辑文本</h3>
          <button 
            onClick={cancelEdit}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            文本内容
          </label>
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md min-h-[150px]"
            placeholder="输入文本内容"
          />
          <p className="text-sm text-gray-500 mt-2">
            提示：可以使用 HTML 标签进行简单格式化，如 &lt;strong&gt;重要内容&lt;/strong&gt;
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline"
            onClick={cancelEdit}
          >
            取消
          </Button>
          <Button 
            className="bg-[#55A99C] hover:bg-[#4a8c80] text-white"
            onClick={saveEdit}
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">文本管理</h1>
        <p className="text-gray-600">
          在此页面管理网站中的所有文本内容，您可以编辑文本或恢复默认设置
        </p>
        {!isAdmin && (
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-700">
              您需要登录管理员账户才能编辑文本
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">网站文本配置</h2>
          <Button 
            variant="outline"
            onClick={() => {
              if (!isAdmin) return;
              localStorage.removeItem('textConfig');
              setTextConfig(defaultTexts);
            }}
            disabled={!isAdmin}
          >
            恢复所有默认文本
          </Button>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto">
          {renderTextTree(textConfig)}
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          className="bg-[#55A99C] hover:bg-[#4a8c80] text-white py-4 px-8 rounded-full text-lg"
          onClick={() => navigate('/')}
        >
          返回首页
        </Button>
      </div>

      {editingPath && renderEditModal()}
    </div>
  );
};

export default TextManagementPage;
