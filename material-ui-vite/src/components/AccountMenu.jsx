// src/components/AccountMenu.jsx

import React, {useState} from 'react';
import {IconButton, Menu, MenuItem, Divider, Typography, Box} from '@mui/material';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import ChangePasswordModal from './ChangePasswordModal'; // 確保此路徑正確
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import api from '../api/axiosInstance';
function AccountMenu() {
    // 狀態管理 Menu 開關
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // 狀態管理 ChangePasswordModal 開關
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const handleAccountClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountClose = () => {
        setAnchorEl(null);
    };

    const handleChangePassword = () => {
        setIsChangePasswordOpen(true);
        handleAccountClose();
    };

    const handleChangePasswordClose = () => {
        setIsChangePasswordOpen(false);
    };

function handleLogout() {
    localStorage.setItem('isAuthenticated', 'false');
    api.post('/sc/api/logout/')
    .then(() => {
      window.location.href = '/signin';
    })
    .catch((error) => {
      console.error(error);
    });
}


    return (
        <>
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleAccountClick}
                sx={{width: 40, height: 40}} // 設置為正方形，與 ColorModeSelect 相同大小
            >
                <AccountCircleOutlinedIcon fontSize="large"/>
            </IconButton>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleAccountClose}
                onClick={handleAccountClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={handleChangePassword}>
                    <PasswordIcon fontSize="small" sx={{mr: 1}}/>
                    更改密碼
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" sx={{mr: 1}}/>
                    登出
                </MenuItem>
            </Menu>

            {/* ChangePasswordModal 組件 */}
            <ChangePasswordModal
                open={isChangePasswordOpen}
                onClose={handleChangePasswordClose}
            />
        </>
    );
}

AccountMenu.propTypes = {
    // 如果您希望透過 props 傳遞某些功能，可以在這裡定義 propTypes
};

export default AccountMenu;
