import { useState, useEffect, useRef } from 'react';

/**
 * 图片路径处理工具
 * 统一处理本地图片和远程图片的路径问题
 */
export const getImageUrl = (path) => {
  // 处理空路径
  if (!path) {
    console.warn('getImageUrl: 图片路径为空');
    return generateDynamicImage('placeholder,error', 400, 300);
  }
  
  // 处理远程图片（包含http/https）
  if (path.startsWith('http')) {
    return path;
  }
  
  // 处理基础路径
  const base = import.meta.env.BASE_URL || '';
  
  // 安全路径拼接
  const normalizedBase = base.replace(/\/$/, '');
  const normalizedPath = path.replace(/^\//, '');
  
  return `${normalizedBase}/${normalizedPath}`;
};

/**
 * 生成动态图片URL
 * @param {string} keyword - 图片关键词
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 * @returns {string} 图片URL
 */
export const generateDynamicImage = (keyword, width = 400, height = 300) => {
  // 验证参数
  if (!keyword || typeof keyword !== 'string') {
    console.warn('generateDynamicImage: 缺少有效的关键词');
    keyword = 'placeholder,error';
  }
  
  if (typeof width !== 'number' || width <= 0) width = 400;
  if (typeof height !== 'number' || height <= 0) height = 300;
  
  return `https://nocode.meituan.com/photo/search?keyword=${encodeURIComponent(keyword)}&width=${width}&height=${height}`;
};

/**
 * 图片加载状态管理
 * @param {string} src - 图片URL
 * @returns {Object} { isLoading, error, imageUrl }
 */
export const useImageLoader = (src) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const cache = useRef(new Map());

  useEffect(() => {
    if (!src) {
      setError('图片URL为空');
      setIsLoading(false);
      setImageUrl(generateDynamicImage('placeholder,empty', 400, 300));
      return;
    }

    // 检查缓存
    if (cache.current.has(src)) {
      setIsLoading(false);
      setImageUrl(cache.current.get(src));
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const img = new Image();
    img.src = src;
    
    const handleLoad = () => {
      setIsLoading(false);
      setImageUrl(src);
      // 添加到缓存
      cache.current.set(src, src);
    };
    
    const handleError = () => {
      setIsLoading(false);
      setError('图片加载失败');
      // 使用备用图片
      const fallbackUrl = generateDynamicImage('error,placeholder', 400, 300);
      setImageUrl(fallbackUrl);
      // 缓存备用图片
      cache.current.set(src, fallbackUrl);
    };
    
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    
    // 设置超时处理
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError('图片加载超时');
        const timeoutUrl = generateDynamicImage('loading,placeholder', 400, 300);
        setImageUrl(timeoutUrl);
        // 缓存超时图片
        cache.current.set(src, timeoutUrl); // 修复缓存逻辑
      }
    }, 5000);

    // 清理函数
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
      clearTimeout(timeout);
    };
  }, [src]);

  return { isLoading, error, imageUrl };
};
