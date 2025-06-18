import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const DeployGuide = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#55A99C]">
          部署到 v11.biz 域名指南
        </h1>
        <p className="text-xl text-gray-600">
          按照以下步骤将您的应用部署到 v11.biz 域名
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#55A99C]">
              部署流程
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#55A99C] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">构建生产版本</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
npm run build
                  </pre>
                  <p className="text-gray-600 mt-2">
                    构建完成后，文件将生成在 <code>/build</code> 目录中
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#55A99C] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">配置域名</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>登录域名注册商控制面板</li>
                    <li>将 v11.biz 的 DNS A 记录指向服务器 IP 地址</li>
                    <li>等待 DNS 传播（通常需要几分钟到几小时）</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#55A99C] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">服务器设置 (Nginx)</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`server {
    listen 80;
    server_name v11.biz www.v11.biz;
    
    root /var/www/v11.biz/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 启用 Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#55A99C]">
              详细步骤
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="bg-[#F57373] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">4</span>
                  部署应用文件
                </h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 创建网站目录
sudo mkdir -p /var/www/v11.biz

# 复制构建文件
sudo cp -R build/* /var/www/v11.biz/build

# 设置权限
sudo chown -R www-data:www-data /var/www/v11.biz
sudo chmod -R 755 /var/www/v11.biz`}
                </pre>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="bg-[#F57373] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">5</span>
                  启用网站并重启 Nginx
                </h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`sudo ln -s /etc/nginx/sites-available/v11.biz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx`}
                </pre>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="bg-[#F57373] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">6</span>
                  配置 HTTPS (推荐)
                </h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d v11.biz -d www.v11.biz`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-[#F8F4EF] p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-[#55A99C]">验证部署</h3>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-lg mb-4 sm:mb-0">
              访问 <a href="http://v11.biz" target="_blank" rel="noopener noreferrer" className="text-[#55A99C] hover:underline">http://v11.biz</a> 或 <a href="https://v11.biz" target="_blank" rel="noopener noreferrer" className="text-[#55A99C] hover:underline">https://v11.biz</a> 查看应用
            </p>
            <Button className="bg-[#55A99C] hover:bg-[#4a8c80] text-white">
              测试网站 <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-[#F8F4EF] rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-[#55A99C]">
          图片资源管理
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl text-[#55A99C] mb-3">📁</div>
            <h3 className="text-lg font-semibold mb-2">文件夹结构</h3>
            <p className="text-gray-600 mb-4">所有图片资源位于 <code>public/images</code> 目录，按功能分类：</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><code>header/</code> - 头部区域图片</li>
              <li><code>services/</code> - 服务展示图片</li>
              <li><code>cases/</code> - 案例展示图片</li>
              <li><code>testimonials/</code> - 客户评价图片</li>
              <li><code>pricing/</code> - 价格方案图片</li>
              <li><code>about/</code> - 关于我们图片</li>
              <li><code>contact/</code> - 联系信息图片</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl text-[#55A99C] mb-3">🔄</div>
            <h3 className="text-lg font-semibold mb-2">更换图片指南</h3>
            <ol className="list-decimal pl-5 space-y-3 text-gray-600">
              <li>将新图片放入对应目录</li>
              <li>保持相同文件名（或更新 <code>src/config/images.js</code> 中的路径）</li>
              <li>重新构建并部署应用</li>
              <li>清除浏览器缓存查看更新</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="bg-[#F8F4EF] rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-[#55A99C]">
          持续部署建议
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl text-[#55A99C] mb-3">1</div>
            <h3 className="text-lg font-semibold mb-2">自动化部署</h3>
            <p className="text-gray-600">设置 GitHub Actions 自动化部署流程</p>
          </li>
          <li className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl text-[#55A99C] mb-3">2</div>
            <h3 className="text-lg font-semibold mb-2">实时更新</h3>
            <p className="text-gray-600">配置 Webhook 在代码更新时自动重建</p>
          </li>
          <li className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl text-[#55A99C] mb-3">3</div>
            <h3 className="text-lg font-semibold mb-2">监控系统</h3>
            <p className="text-gray-600">设置监控和日志收集确保服务稳定</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeployGuide;
