import { useCallback } from 'react';
import { generateDynamicImage } from '@/lib/imageUtils'; // 添加缺失的导入

/**
 * 图片错误处理钩子
 * @returns {Function} 错误处理函数
 */
export const useImageError = () => {
  return useCallback((e, keywords = 'placeholder', width = 400, height = 300) => {
    e.target.onerror = null;
    e.target.src = generateDynamicImage(keywords, width, height);
  }, []);
};
