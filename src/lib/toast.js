const DEFAULT_DURATION = 5000; // 5秒
let toastTimeout = null;

/**
 * 显示通知
 * @param {Object} props - 通知配置
 * @param {number} [props.duration] - 通知持续时间(毫秒)
 * @param {string} props.description - 通知内容
 */
function toast({ duration = DEFAULT_DURATION, ...props }) {
  // 验证参数类型
  if (typeof props.description !== 'string') {
    console.error('toast: description 必须是字符串');
    return;
  }
  
  if (typeof duration !== 'number' || duration < 0) {
    console.warn(`toast: 无效的持续时间 ${duration}，使用默认值 ${DEFAULT_DURATION}`);
    duration = DEFAULT_DURATION;
  }
  
  // 清除之前的超时
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toastTimeout = null;
  }
  
  // 实际通知逻辑...
  console.log(`显示通知: ${props.description}`);
  
  // 设置超时自动关闭
  toastTimeout = setTimeout(() => {
    dismiss();
  }, duration);
}

// 关闭通知
function dismiss() {
  console.log("关闭通知");
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toastTimeout = null;
  }
}

// 测试用例
toast({ description: "测试通知" });
setTimeout(() => dismiss(), 2000);
