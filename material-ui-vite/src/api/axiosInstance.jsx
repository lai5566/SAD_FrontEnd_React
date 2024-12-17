import axios from 'axios';
import Cookies from 'js-cookie';

// 建立 Axios 實例
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // 視後端地址調整
    withCredentials: true, // 確保跨域請求附帶 Cookie
    headers: {
        'Content-Type': 'application/json',
    },
});

// 請求攔截器：每次請求時自動加入 CSRF Token
api.interceptors.request.use(
    (config) => {
        const csrfToken = Cookies.get('csrftoken'); // 從 Cookie 取得 CSRF Token
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken; // 設定到請求標頭
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
