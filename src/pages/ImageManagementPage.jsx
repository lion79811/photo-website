import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { images as defaultImages } from "@/config/images";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";

const ImageManagementPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const [images, setImages] = useState({});
  const [editingPath, setEditingPath] = useState(null);
  const [tempUrl, setTempUrl] = useState("");

  // 初始化图片数据
  useEffect(() => {
    const savedImages = localStorage.getItem('imageConfig');
    setImages(savedImages ? JSON.parse(savedImages) : defaultImages);
  }, []);

  // 保存图片配置到localStorage
  const saveImages = (newImages) => {
    localStorage.setItem('imageConfig', JSON.stringify(newImages));
    setImages(newImages);
  };

  // 开始编辑图片
  const startEdit = (path, currentUrl) => {
    if (!isAdmin) return;
    setEditingPath(path);
    setTempUrl(currentUrl);
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingPath(null);
    setTempUrl("");
  };

  // 保存编辑
  const saveEdit = () => {
    if (!editingPath || !isAdmin) return;
    
    const pathParts = editingPath.split('.');
    const newImages = JSON.parse(JSON.stringify(images));
    
    let current = newImages;
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = tempUrl;
    saveImages(newImages);
    cancelEdit();
  };

  // 恢复默认图片
  const restoreDefault = (path) => {
    if (!isAdmin) return;
    
    const pathParts = path.split('.');
    const newImages = JSON.parse(JSON.stringify(images));
    
    let current = newImages;
    let defaultCurrent = defaultImages;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
      defaultCurrent = defaultCurrent[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = defaultCurrent[pathParts[pathParts.length - 1]];
    saveImages(newImages);
  };

  // 渲染图片编辑模态框
  const renderEditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">更换图片</h3>
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
            图片URL
          </label>
          <input
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            placeholder="输入图片URL"
          />
          <p className="text-sm text-gray-500 mb-4">
            提示：可以使用类似 https://nocode.meituan.com/photo/search?keyword=cat&width=400&height=300 的格式
          </p>
        </div>
        
        <div className="flex justify-center mb-4">
          {tempUrl && (
            <img 
              src={tempUrl} 
              alt="预览" 
              className="w-48 h-48 object-cover rounded-lg border border-gray-200"
            />
          )}
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

  // 递归渲染图片树
  const renderImageTree = (obj, path = "") => {
    return Object.keys(obj).map((key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];
      
      if (typeof value === "string") {
        return (
          <div key={currentPath} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b">
            <div className="mb-2 sm:mb-0">
              <h4 className="font-medium">{currentPath}</h4>
              <p className="text-sm text-gray-500 truncate max-w-xs">{value}</p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => startEdit(currentPath, value)}
                disabled={!isAdmin}
              >
                更换
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
            
            <div className="mt-2 sm:mt-0">
              <img 
                src={value} 
                alt={currentPath} 
                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>
        );
      } else if (Array.isArray(value)) {
        return (
          <div key={currentPath} className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{currentPath}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {value.map((url, index) => {
                const itemPath = `${currentPath}[${index}]`;
                return (
                  <div key={itemPath} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">{itemPath}</span>
                      <div className="flex space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => startEdit(itemPath, url)}
                          disabled={!isAdmin}
                        >
                          更换
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
                    <img 
                      src={url} 
                      alt={itemPath} 
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      } else if (typeof value === "object") {
        return (
          <div key={currentPath} className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{currentPath}</h3>
            <div className="pl-4 border-l border-gray-200">
              {renderImageTree(value, currentPath)}
            </div>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">图片管理</h1>
        <p className="text-gray-600">
          在此页面管理网站中的所有图片，您可以更换图片或恢复默认设置
        </p>
        {!isAdmin && (
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-700">
              您需要登录管理员账户才能编辑图片
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">网站图片配置</h2>
          <Button 
            variant="outline"
            onClick={() => {
              if (!isAdmin) return;
              localStorage.removeItem('imageConfig');
              setImages(defaultImages);
            }}
            disabled={!isAdmin}
          >
            恢复所有默认图片
          </Button>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto">
          {renderImageTree(images)}
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

export default ImageManagementPage;
