// src/components/ChangePasswordModal.jsx

import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // 添加更改密碼的邏輯
        if (newPassword !== confirmPassword) {
            alert("新密碼與確認密碼不一致！");
            return;
        }
        // 假設有一個 API 呼叫來更改密碼
        console.log("更改密碼：", { currentPassword, newPassword });
        // 清空表單並關閉模態框
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
    };

    return (
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
    );
}

export default ChangePasswordModal;
