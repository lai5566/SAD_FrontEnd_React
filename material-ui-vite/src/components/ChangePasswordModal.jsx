// src/components/ChangePasswordModal.jsx

import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../api/axiosInstance';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function ChangePasswordModal({ open, onClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Snackbar 狀態
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info' // 'success' | 'error' | 'warning' | 'info'
    });

    // 處理關閉 Snackbar
    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            // 開啟錯誤訊息
            setSnackbar({
                open: true,
                message: '新密碼與確認密碼不一致！',
                severity: 'error',
            });
            return;
        }

        try {
            const response = await api.post('/sc/api/change_password/', {
                current_password: currentPassword,
                new_password: newPassword
            });

            if (response.status === 200) {
                // 開啟成功提示
                setSnackbar({
                    open: true,
                    message: '密碼修改成功！',
                    severity: 'success',
                });

                // 清空表單
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                // 關閉 Modal
                onClose();
            }
        } catch (error) {
            if (error.response) {
                // 後端回傳的錯誤訊息
                const detailMsg = error.response.data.detail || '密碼修改失敗';
                setSnackbar({
                    open: true,
                    message: detailMsg,
                    severity: 'error',
                });
            } else {
                setSnackbar({
                    open: true,
                    message: '發生未知錯誤',
                    severity: 'error',
                });
            }
        }
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="change-password-title"
                aria-describedby="change-password-description"
            >
                <Box sx={style}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography id="change-password-title" variant="h6" component="h2">
                            更改密碼
                        </Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="當前密碼"
                            type="password"
                            fullWidth
                            required
                            margin="normal"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <TextField
                            label="新密碼"
                            type="password"
                            fullWidth
                            required
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            label="確認新密碼"
                            type="password"
                            fullWidth
                            required
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            提交
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Snackbar + Alert */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={1500}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ChangePasswordModal;
