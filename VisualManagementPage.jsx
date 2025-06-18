import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { texts } from "@/config/texts";

export default function VisualManagementPage() {
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState('cases');
  
  // 案例管理状态
  const [caseType, setCaseType] = useState('repair');
  const [caseIndex, setCaseIndex] = useState(0);
  const [caseTitle, setCaseTitle] = useState('');
  
  // 用户评价管理状态
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialName, setTestimonialName] = useState('');
  const [testimonialCity, setTestimonialCity] = useState('');
  const [testimonialContent, setTestimonialContent] = useState('');
  
  // 服务设置状态
  const [serviceType, setServiceType] = useState('repair');
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  
  // 下载配置文件
  const downloadFile = (filename, content) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  // 保存案例
  const saveCase = () => {
    if (!isAdmin) return;
    
    const config = {
      type: 'case',
      category: caseType,
      index: parseInt(caseIndex),
      title: caseTitle,
    };
    
    downloadFile('case-update.json', JSON.stringify(config));
    alert('案例配置已生成！请将配置文件放入网站管理目录');
  };
  
  // 保存评价
  const saveTestimonial = () => {
    if (!isAdmin) return;
    
    const config = {
      type: 'testimonial',
      index: parseInt(testimonialIndex),
      name: testimonialName,
      city: testimonialCity,
      content: testimonialContent,
    };
    
    downloadFile('testimonial-update.json', JSON.stringify(config));
    alert('评价配置已生成！请将配置文件放入网站管理目录');
  };
  
  // 保存服务
  const saveService = () => {
    if (!isAdmin) return;
    
    const config = {
      type: 'service',
      category: serviceType,
      title: serviceTitle,
      description: serviceDescription,
    };
    
    downloadFile('service-update.json', JSON.stringify(config));
    alert('服务配置已生成！请将配置文件放入网站管理目录');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">网站内容管理工具</h1>
        <p className="text-gray-600">
          在此页面管理网站中的案例、用户评价和服务内容
        </p>
        {!isAdmin && (
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-700">
              您需要登录管理员账户才能编辑内容
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex gap-3 mb-6">
          <button 
            className={`px-4 py-2 rounded-full ${
              activeTab === 'cases' 
                ? 'bg-[#55A99C] text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('cases')}
          >
            案例管理
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${
              activeTab === 'testimonials' 
                ? 'bg-[#55A99C] text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('testimonials')}
          >
            用户评价
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${
              activeTab === 'services' 
                ? 'bg-[#55A99C] text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('services')}
          >
            服务设置
          </button>
        </div>
        
        {/* 案例管理 */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">案例管理</h2>
            
            <div>
              <label className="block mb-2 font-medium">选择案例类型：</label>
              <select 
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="repair">老照片修复</option>
                <option value="poster">手抄报设计</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">选择案例序号：</label>
              <select 
                value={caseIndex}
                onChange={(e) => setCaseIndex(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {[0, 1, 2, 3, 4, 5].map(index => (
                  <option key={index} value={index}>案例{index + 1}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">案例标题：</label>
              <input 
                type="text" 
                value={caseTitle}
                onChange={(e) => setCaseTitle(e.target.value)}
                placeholder="输入案例标题"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="pt-4">
              <Button 
                className="bg-[#55A99C] hover:bg-[#4a8c80] text-white w-full"
                onClick={saveCase}
                disabled={!isAdmin}
              >
                生成案例配置
              </Button>
            </div>
          </div>
        )}
        
        {/* 用户评价管理 */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">用户评价管理</h2>
            
            <div>
              <label className="block mb-2 font-medium">选择评价：</label>
              <select 
                value={testimonialIndex}
                onChange={(e) => setTestimonialIndex(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {[0, 1, 2, 3].map(index => (
                  <option key={index} value={index}>评价{index + 1}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">用户姓名：</label>
              <input 
                type="text" 
                value={testimonialName}
                onChange={(e) => setTestimonialName(e.target.value)}
                placeholder="输入用户姓名"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">所在城市：</label>
              <input 
                type="text" 
                value={testimonialCity}
                onChange={(e) => setTestimonialCity(e.target.value)}
                placeholder="输入所在城市"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">评价内容：</label>
              <textarea 
                value={testimonialContent}
                onChange={(e) => setTestimonialContent(e.target.value)}
                rows="3"
                placeholder="输入评价内容"
                className="w-full p-2 border border-gray-300 rounded-md"
              ></textarea>  {/* 修复点1 */}
            </div>
            
            <div className="pt-4">
              <Button 
                className="bg-[#55A99C] hover:bg-[#4a8c80] text-white w-full"
                onClick={saveTestimonial}
                disabled={!isAdmin}
              >
                生成评价配置
              </Button>
            </div>
          </div>
        )}
        
        {/* 服务设置 */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">服务设置</h2>
            
            <div>
              <label className="block mb-2 font-medium">选择服务：</label>
              <select 
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="repair">老照片修复</option>
                <option value="poster">手抄报设计</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">服务标题：</label>
              <input 
                type="text" 
                value={serviceTitle}
                onChange={(e) => setServiceTitle(e.target.value)}
                placeholder="输入服务标题"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">服务描述：</label>
              <textarea 
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                rows="3"
                placeholder="输入服务描述"
                className="w-full p-2 border border-gray-300 rounded-md"
              ></textarea>  {/* 修复点2 */}
            </div>
            
            <div className="pt-4">
              <Button 
                className="bg-[#55A99C] hover:bg-[#4a8c80] text-white w-full"
                onClick={saveService}
                disabled={!isAdmin}
              >
                生成服务配置
              </Button>
            </div>
          </div>
        )}
        
        {/* 维护指南部分 - 在页面底部添加 */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-3">维护指南</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 图片更新卡片 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">图片更新</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>替换 /public/images/ 中的图片文件</li>
                <li>保持相同文件名</li>
                <li>无需修改代码</li>
              </ol>
            </div>
            
            {/* 文本更新卡片 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">文本更新</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>打开 src/config/texts.js</li>
                <li>按类别修改文本内容</li>
                <li>保存文件自动更新</li>
              </ol>
            </div>
            
            {/* 使用工具卡片 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">使用工具</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>填写新内容并保存</li>
                <li>按提示替换网站文件</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}