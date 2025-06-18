import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ROUTES } from "@/constants/routes"; // 使用路由常量
import { useTheme } from "@/theme/theme.provider"; // 引入主题钩子

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme(); // 使用主题切换功能

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to={ROUTES.HOME} className="flex items-center">
            <div className="bg-[#55A99C] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              TT
            </div>
            <span className="ml-2 text-xl font-light text-[#4C4C4C]">TimeTots</span>
          </Link>
        </div>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to={ROUTES.HOME} 
            className={`text-lg ${isActive(ROUTES.HOME) ? 'text-[#55A99C] font-medium' : 'text-[#4C4C4C] hover:text-[#55A99C]'}`}
          >
            首页
          </Link>
          <Link 
            to={ROUTES.CASES} 
            className={`text-lg ${isActive(ROUTES.CASES) ? 'text-[#55A99C] font-medium' : 'text-[#4C4C4C] hover:text-[#55A99C]'}`}
          >
            案例
          </Link>
          <Link 
            to={ROUTES.PRICING} 
            className={`text-lg ${isActive(ROUTES.PRICING) ? 'text-[#55A99C] font-medium' : 'text-[#4C4C4C] hover:text-[#55A99C]'}`}
          >
            价格
          </Link>
          <Link 
            to={ROUTES.ABOUT} 
            className={`text-lg ${isActive(ROUTES.ABOUT) ? 'text-[#55A99C] font-medium' : 'text-[#4C4C4C] hover:text-[#55A99C]'}`}
          >
            关于
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost"
            onClick={toggleTheme}
            className="hidden md:block"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
          
          <Button 
            className="bg-[#55A99C] hover:bg-[#4a8c80] text-white hidden md:block"
            asChild
          >
            <Link to={ROUTES.CONTACT}>联系我们</Link>
          </Button>
          
          <Button 
            variant="ghost" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link 
              to={ROUTES.HOME} 
              className={`py-2 ${isActive(ROUTES.HOME) ? 'text-[#55A99C] font-medium' : 'text-[#4C4C4C]'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              to={ROUTES.CASES} 
              className={`py-2 ${isActive(ROUTES.CASES) ? 'text-[#55A99C] font-medium' : 'text-[#4C4C4C]'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              案例
            </Link>
            <Link 
              to={ROUTES.PRICING} 
              className={`py-2 ${isActive(ROUTES.PRICING) ? 'text-[#55A99C] font-medium' : 'text-[#4C4C4C]'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              价格
            </Link>
            <Link 
              to={ROUTES.ABOUT} 
              className={`py-2 ${isActive(ROUTES.ABOUT) ? 'text-[#55A99C] font-medium' : 'text-[#4C4C4C]'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              关于
            </Link>
            <div className="pt-4 border-t">
              <Button 
                className="bg-[#55A99C] hover:bg-[#4a8c80] text-white w-full"
                asChild
              >
                <Link to={ROUTES.CONTACT} onClick={() => setMobileMenuOpen(false)}>
                  联系我们
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
