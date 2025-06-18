import { useState, useCallback } from 'react';
import { useAdmin } from '../context/AdminContext'; // 修复导入路径

/**
 * 管理员编辑模式钩子
 * 提供编辑状态管理和权限检查功能
 */
export const useAdminEdit = () => {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  
  const startEditing = useCallback(() => {
    if (!isAdmin) {
      console.warn("管理员权限缺失，无法进入编辑模式");
      return;
    }
    setEditing(true);
  }, [isAdmin]);
  
  const stopEditing = useCallback(() => {
    setEditing(false);
  }, []);
  
  return {
    isAdmin,
    editing,
    startEditing,
    stopEditing
  };
};
