/**
 * 主题设置
 * 集中管理UI主题相关配置
 */
export const THEME_SETTINGS = {
  // 颜色配置
  COLORS: {
    PRIMARY: '#55A99C',
    SECONDARY: '#F57373',
    BACKGROUND: '#F8F4EF',
    TEXT: '#4C4C4C',
    ACCENT: '#60B7A5',
    LIGHT: '#FFFFFF',
    DARK: '#333333',
    SUCCESS: '#4CAF50',
    WARNING: '#FFC107',
    ERROR: '#F44336',
    INFO: '#2196F3',
  },
  
  // 字体配置
  FONTS: {
    PRIMARY: "'Source Han Sans', 'Noto Sans SC', sans-serif",
    SECONDARY: "'Georgia', serif",
    MONOSPACE: "'Courier New', monospace",
    SIZES: {
      SMALL: '0.875rem', // 14px
      BASE: '1rem',     // 16px
      MEDIUM: '1.125rem', // 18px
      LARGE: '1.25rem',  // 20px
      XL: '1.5rem',     // 24px
      XXL: '2rem',      // 32px
      XXXL: '3rem',     // 48px
    },
    WEIGHTS: {
      LIGHT: 300,
      REGULAR: 400,
      MEDIUM: 500,
      BOLD: 700,
    }
  },
  
  // 间距配置
  SPACING: {
    XS: '0.25rem', // 4px
    SM: '0.5rem',  // 8px
    MD: '1rem',    // 16px
    LG: '1.5rem',  // 24px
    XL: '2rem',    // 32px
    XXL: '3rem',   // 48px
  },
  
  // 边框配置
  BORDERS: {
    RADIUS: {
      SM: '0.25rem', // 4px
      MD: '0.5rem',  // 8px
      LG: '1rem',    // 16px
      FULL: '9999px',
    },
    WIDTH: {
      THIN: '1px',
      MEDIUM: '2px',
      THICK: '3px',
    }
  },
  
  // 阴影配置
  SHADOWS: {
    SM: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    INNER: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  
  // 响应式断点
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    XXL: '1536px',
  },
  
  // 动画配置
  TRANSITIONS: {
    DURATION: {
      FAST: '150ms',
      MEDIUM: '300ms',
      SLOW: '500ms',
    },
    TIMING: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
      EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
      EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }
};
