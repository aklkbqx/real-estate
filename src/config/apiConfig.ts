import API_UTILS from '../utils/api';

/**
 * Error messages in Thai for this project
 */
const THAI_ERROR_MESSAGES = {
    networkError: 'ไม่มีการเชื่อมต่ออินเทอร์เน็ต',
    unauthorized: 'กรุณาเข้าสู่ระบบใหม่',
    forbidden: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้',
    validationError: 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
    serverError: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง',
    unknownError: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาลองใหม่อีกครั้ง',
    rateLimited: 'มีการเรียกใช้งานมากเกินไป กรุณารอสักครู่',
    timeout: 'หมดเวลาการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
};

export const apiInstance = API_UTILS.getInstance('default', {
    // Get base URL from environment variables (Vite-specific)
    baseURLResolver: () => import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',

    // Token configuration
    tokenKey: 'token',

    // Thai error messages for this project
    errorMessages: THAI_ERROR_MESSAGES,

    // Unauthorized handler - redirect to login page
    unauthorizedHandler: async () => {
        // Clear any application state if needed
        console.warn('Session expired. Redirecting to login...');

        // Redirect to login page
        window.location.href = '/login';
    },

    // Request configuration
    timeout: 15000,
    maxRetries: 3,
    retryDelay: 1000,
});

export default apiInstance;