/**
 * HTML内容安全处理函数
 * 使用纯字符串处理方式，不依赖DOM API
 * @param {string} html - 需要处理的HTML字符串
 * @returns {string} 处理后的安全HTML字符串
 */
export const sanitize = (html) => {
  // 处理非字符串输入
  if (typeof html !== 'string') {
    console.warn('sanitize: 输入必须是字符串');
    return '';
  }

  // 定义允许的HTML标签和属性
  const allowedTags = {
    'b': true,
    'strong': true,
    'i': true,
    'em': true,
    'u': true,
    'br': true,
    'p': true,
    'span': true,
    'div': true,
    'a': true,
    'ul': true,
    'ol': true,
    'li': true,
    'img': true // 添加img标签支持
  };

  const allowedAttributes = {
    'a': ['href', 'title', 'target'],
    'span': ['class'],
    'div': ['class'],
    'img': ['src', 'alt', 'class'] // 添加img属性支持
  };

  try {
    // 移除所有脚本标签及其内容
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // 处理HTML标签
    html = html.replace(/<[^>]*>/g, (tag) => {
      // 提取标签名和属性
      const matches = tag.match(/<\/?([a-z0-9]+)((?:\s+[a-z0-9-]+(?:="[^"]*")?)*)\s*\/?\s*>/i);
      if (!matches) return '';

      const [fullTag, tagName, attributesStr] = matches;
      const isClosingTag = tag.startsWith('</');
      
      // 检查是否是允许的标签
      if (!allowedTags[tagName.toLowerCase()]) {
        return '';
      }

      // 如果是关闭标签，直接返回
      if (isClosingTag) {
        return `</${tagName.toLowerCase()}>`;
      }

      // 处理属性
      let cleanAttributes = '';
      if (attributesStr && allowedAttributes[tagName.toLowerCase()]) {
        const allowedAttrs = allowedAttributes[tagName.toLowerCase()];
        const attrMatches = attributesStr.match(/([a-z0-9-]+)(?:="([^"]*)")?/gi);
        
        if (attrMatches) {
          attrMatches.forEach(attr => {
            const [attrName, attrValue] = attr.split('=');
            const attrNameLower = attrName.toLowerCase();
            
            if (allowedAttrs.includes(attrNameLower)) {
              // 对img的src属性进行安全校验
              if (attrNameLower === 'src' && tagName.toLowerCase() === 'img') {
                const srcValue = attrValue ? attrValue.replace(/"/g, '') : '';
                // 只允许http、https和data协议
                if (!srcValue.startsWith('http://') && 
                    !srcValue.startsWith('https://') && 
                    !srcValue.startsWith('data:image/')) {
                  return; // 跳过不安全的src属性
                }
              }
              
              cleanAttributes += ` ${attrName}=${attrValue || '""'}`;
            }
          });
        }
      }

      return `<${tagName.toLowerCase()}${cleanAttributes}>`;
    });

    // 处理特殊字符
    html = html
      .replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');

    return html;
  } catch (error) {
    console.error('HTML sanitization failed:', error);
    return '';
  }
};
