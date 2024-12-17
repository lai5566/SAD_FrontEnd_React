// ResetPassword.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Alert, Container, Typography } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('新密碼和確認密碼不匹配。');
            return;
        }
        setLoading(true);
        setMessage(null);
        setError(null);
        try {
            const response = await axios.post(`/api/reset/${uid}/${token}/`, {
                new_password1: newPassword,
                new_password2: confirmPassword,
            });
            setMessage('密碼已成功重設。');
            setNewPassword('');
            setConfirmPassword('');
            // 可選：自動導向至登入頁面
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            if (err.response && err.response.data) {
                setError(Object.values(err.response.data)[0] || '發生錯誤，請稍後再試。');
            } else {
                setError('發生錯誤，請稍後再試。');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                重設密碼
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="新密碼"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    label="確認新密碼"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {message && <Alert severity="success">{message}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                >
                    {loading ? '重設中...' : '重設密碼'}
                </Button>
            </form>
        </Container>
    );
};

export default ResetPassword;
