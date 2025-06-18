import apiClient from './api-client';

export const getRepairCases = async () => {
  try {
    const response = await apiClient.get('/cases/repair');
    return response.data;
  } catch (error) {
    console.error('获取修复案例失败:', error);
    throw error;
  }
};

export const getPosterCases = async () => {
  try {
    const response = await apiClient.get('/cases/poster');
    return response.data;
  } catch (error) {
    console.error('获取手抄报案例失败:', error);
    throw error;
  }
};

export const uploadCase = async (caseData) => {
  try {
    const response = await apiClient.post('/cases', caseData);
    return response.data;
  } catch (error) {
    console.error('上传案例失败:', error);
    throw error;
  }
};
