// src/ForgotPassword.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const ForgotPassword = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await api.post('/sc/api/password_reset/', { email });
            setMessage(response.data.message);
            setEmail('');
        } catch (err) {
            if (err.response && err.response.data) {
                // 由後端返回的錯誤訊息
                if (err.response.data.email) {
                    setError(err.response.data.email);
                } else if (err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('發生錯誤，請稍後再試。');
                }
            } else {
                setError('發生錯誤，請稍後再試。');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>找回密碼</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                }}
            >
                <DialogContentText>
                    輸入您的帳號電子郵件地址，如果我們找到符合的帳號，我們會提供密碼重設連結。
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {message && <Alert severity="success">{message}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={handleClose} disabled={loading}>
                    取消
                </Button>
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? '發送中...' : '確定'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ForgotPassword.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ForgotPassword;



// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';


// import OutlinedInput from '@mui/material/OutlinedInput';
//
// function ForgotPassword({open, handleClose}) {
//     return (
//         <Dialog
//             open={open}
//             onClose={handleClose}
//             PaperProps={{
//                 component: 'form',
//                 onSubmit: (event) => {
//                     event.preventDefault();
//                     handleClose();
//                 },
//             }}
//         >
//             <DialogTitle>找回密碼</DialogTitle>
//             <DialogContent
//                 sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '100%'}}
//             >
//                 <DialogContentText>
//                     輸入您的帳號電子郵件地址，如果我們找到符合的帳號，我們會提供密碼重設連結。
//                 </DialogContentText>
//                 <OutlinedInput
//                     autoFocus
//                     required
//                     margin="dense"
//                     id="email"
//                     name="email"
//                     label="email"
//                     placeholder="email"
//                     type="email"
//                     fullWidth
//                 />
//             </DialogContent>
//             <DialogActions sx={{pb: 3, px: 3}}>
//                 <Button onClick={handleClose}>取消</Button>
//                 <Button variant="contained" type="submit">
//                     確定
//                 </Button>
//             </DialogActions>
//
//         </Dialog>
//     );
// }
//
// ForgotPassword.propTypes = {
//     handleClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
// };
//
// export default ForgotPassword;
