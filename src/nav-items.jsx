import { HomeIcon, Settings, ImageIcon, FileText, UserCog, Wrench } from "lucide-react";
import Index from "./pages/Index.jsx";
import DeployGuide from "./pages/DeployGuide.jsx";
import ImageManagementPage from "./pages/ImageManagementPage.jsx";
import TextManagementPage from "./pages/TextManagementPage.jsx";
import VisualManagementPage from "./pages/VisualManagementPage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "部署指南",
    to: "/deploy",
    icon: <Settings className="h-4 w-4" />,
    page: <DeployGuide />,
  },
  {
    title: "图片管理",
    to: "/images",
    icon: <ImageIcon className="h-4 w-4" />,
    page: <ImageManagementPage />,
  },
  {
    title: "文本管理",
    to: "/texts",
    icon: <FileText className="h-4 w-4" />,
    page: <TextManagementPage />,
  },
  {
    title: "可视化维护",
    to: "/visual",
    icon: <Wrench className="h-4 w-4" />,
    page: <VisualManagementPage />,
  },
  {
    title: "管理员",
    to: "/admin",
    icon: <UserCog className="h-4 w-4" />,
    page: null, // Will be handled in App.jsx
  }
];
