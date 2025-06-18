import { useCallback } from 'react';

/**
 * 滚动到指定元素的钩子
 * @param {string} elementId - 目标元素的ID
 * @returns {Function} 滚动函数
 */
export const useScrollTo = (elementId) => {
  return useCallback(() => {
    // 添加SSR兼容性检查
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const element = document.getElementById(elementId);
    if (element) {
      // 使用requestAnimationFrame确保DOM已更新
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      console.warn(`useScrollTo: 未找到ID为 ${elementId} 的元素`);
    }
  }, [elementId]);
};
