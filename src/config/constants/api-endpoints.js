/**
 * API端点配置
 * 集中管理所有API请求地址
 */
export const API_ENDPOINTS = {
  // 用户相关
  USER: {
    LOGIN: '/api/user/login',
    REGISTER: '/api/user/register',
    PROFILE: '/api/user/profile',
    UPDATE: '/api/user/update',
  },
  
  // 图片相关
  IMAGE: {
    UPLOAD: '/api/image/upload',
    DELETE: '/api/image/delete',
    LIST: '/api/image/list',
  },
  
  // 订单相关
  ORDER: {
    CREATE: '/api/order/create',
    DETAIL: '/api/order/detail',
    LIST: '/api/order/list',
    UPDATE: '/api/order/update',
    CANCEL: '/api/order/cancel',
  },
  
  // 支付相关
  PAYMENT: {
    INITIATE: '/api/payment/initiate',
    STATUS: '/api/payment/status',
    REFUND: '/api/payment/refund',
  },
  
  // 通知相关
  NOTIFICATION: {
    LIST: '/api/notification/list',
    MARK_READ: '/api/notification/mark-read',
  },
  
  // 管理员相关
  ADMIN: {
    USERS: '/api/admin/users',
    ORDERS: '/api/admin/orders',
    STATS: '/api/admin/stats',
  }
};
