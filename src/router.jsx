import { createBrowserRouter } from "react-router-dom";
import { navItems } from "@/nav-items"; // 使用命名导入
import MainLayout from "@/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: navItems.map(item => ({
      path: item.to,
      element: item.page
    }))
  }
]);

export default router;
