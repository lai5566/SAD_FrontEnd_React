// src/ResetPassword.jsx

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    OutlinedInput,
    DialogActions,
    Button,
    Alert,
} from '@mui/material';
import api from '../api/axiosInstance'; // 引入自訂的 Axios 實例
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    // 解析 URL 查詢參數
    const query = new URLSearchParams(location.search);
    const uid = query.get('uid');
    const token = query.get('token');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('兩次輸入的密碼不一致。');
            return;
        }
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await api.post('/sc/api/password_reset_confirm/', {
                uid,
                token,
                new_password: newPassword,
            });
            setMessage(response.data.message);
            setNewPassword('');
            setConfirmPassword('');
            // 可選：自動導航到登入頁面
            setTimeout(() => {
                navigate('/login'); // 替換為您的登入頁面路徑
            }, 2000);
        } catch (err) {
            if (err.response && err.response.data) {
                // 由後端返回的錯誤訊息
                const errorMessages = [];
                for (const key in err.response.data) {
                    if (Array.isArray(err.response.data[key])) {
                        errorMessages.push(...err.response.data[key]);
                    } else {
                        errorMessages.push(err.response.data[key]);
                    }
                }
                setError(errorMessages.join(' '));
            } else {
                setError('發生錯誤，請稍後再試。');
            }
        } finally {
            setLoading(false);
        }
    };

    // 檢查 uid 和 token 是否存在
    useEffect(() => {
        if (!uid || !token) {
            setError('無效的重設連結。');
        }
    }, [uid, token]);

    return (
        <Dialog
            open={true} // 始終開啟，因為這是一個單獨的頁面
            // onClose 可以根據需要實作
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>重設密碼</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                }}
            >
                <DialogContentText>
                    請輸入您的新密碼。
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="new_password"
                    name="new_password"
                    placeholder="新密碼"
                    type="password"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <OutlinedInput
                    required
                    margin="dense"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="確認新密碼"
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {message && <Alert severity="success">{message}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => navigate('/')} disabled={loading}>
                    取消
                </Button>
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? '發送中...' : '確定'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResetPassword;
