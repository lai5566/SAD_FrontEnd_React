const axios = require('axios');

// 登錄函數
async function testLogin() {
    const loginData = {
        email: "admin@admin.com",     // 替換為有效的電子郵件
        password: "qwe000123",     // 替換為有效的密碼
    };

    try {
        const response = await axios.post('http://127.0.0.1:8000/sc/api/auth/login/', loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // 確保攜帶 Cookie
        });

        console.log('Login response:', response.data);

        if (response.data.success) {
            const { user, message } = response.data;
            console.log('Login success:', message);
            console.log('User data:', user);

            // 確認 is_staff 和 is_superuser
            console.log('User is_staff:', user.is_staff);
            console.log('User is_superuser:', user.is_superuser);
        } else {
            console.error('Login failed:', response.data.message);
        }
    } catch (error) {
        if (error.response) {
            // 請求已發出且服務器回應狀態碼不在 2xx 範圍內
            console.error('Error response:', error.response.data);
        } else if (error.request) {
            // 請求已發出但沒有回應
            console.error('No response received:', error.request);
        } else {
            // 其他錯誤
            console.error('Error:', error.message);
        }
    }
}

// 執行測試
testLogin();
