import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { ShcolIcon } from './CustomIcons';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import axios from "axios";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import Cookies from 'js-cookie';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn(props) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signInData = {
        email: data.get('email'),
        password: data.get('password'),
    };

    // 驗證輸入
    if (!validateInputs()) {
        return;
    }

    try {
        const response = await api.post('/sc/api/auth/login/', signInData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // 確保跨域帶上 Cookie
        });

        console.log('Login response:', response.data); // 調試用

        if (response.data.success) {
            const { user, message } = response.data;
            console.log('Login success:', message);
            console.log('User data:', user);

            // 設置認證標記
            localStorage.setItem('isAuthenticated', 'true');

            // 根據角色進行重定向
            if (user.is_superuser || user.is_admin) {
                console.log('Redirecting to admin as superuser/admin');
                window.location.href = 'http://127.0.0.1:8000/admin'; // 超級用戶或管理員重定向到管理頁面
                // navigate('http://127.0.0.1:8000/admin', { replace: true });

            } else {
                console.log('Redirecting to /table3 as regular user');
                navigate('/'); // 普通用戶導向 /table3
            }
        } else {
            console.error('Login failed:', response.data.message);
            alert('登入失敗，請檢查帳號密碼。');
        }
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        alert('登入失敗，請檢查帳號密碼。');
    }
};


    // 设置 Axios 拦截器
    React.useEffect(() => {
        // 获取 CSRF Token
        getCsrfToken();

        // 验证 Token 是否有效
        const token = localStorage.getItem('accessToken');
        if (token) {
            api.get('/api/protected/')
                .then(() => {
                    console.log('Token is valid.');
                })
                .catch(() => {
                    console.error('Invalid token. Redirecting to login.');
                    localStorage.clear();
                    window.location.href = '/';
                });
        }
    }, []);

    const getCsrfToken = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/sc/csrf/', { withCredentials: true }); // 确保携带 Cookie
            const csrfToken = response.data.csrfToken;
            api.defaults.headers.common['X-CSRFToken'] = csrfToken; // 更新 api 实例的默认请求头
            console.log('CSRF Token initialized:', csrfToken);
        } catch (error) {
            console.error('Failed to fetch CSRF Token:', error);
        }
    };

    // 設定 Axios 攔截器檢查 Token
    api.interceptors.request.use((config) => {
        const csrfToken = Cookies.get('csrftoken'); // 从 Cookie 动态获取 CSRF Token
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken; // 设置请求头
        }
        return config;
    }, (error) => Promise.reject(error));

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 403 && error.response?.data?.detail === 'CSRF Failed') {
                console.warn('CSRF validation failed. Re-fetching CSRF Token...');
                await getCsrfToken(); // 重新获取 CSRF Token
                return Promise.reject(error); // 继续抛出错误
            }
            return Promise.reject(error);
        }
    );

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ShcolIcon style={{ marginRight: '3px' }} />
                        <Typography variant="h6" sx={{ margin: 0, fontSize: '1.6rem' }}>
                            預選課系統
                        </Typography>
                    </div>
                    <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                        登入
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                                sx={{ ariaLabel: 'email' }}
                            />
                        </FormControl>
                        <FormControl>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Link
                                    component="button"
                                    type="button"
                                    onClick={handleClickOpen}
                                    variant="body2"
                                    sx={{ alignSelf: 'baseline' }}
                                >
                                    忘記密碼
                                </Link>
                            </Box>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="記住登入選項"
                        />
                        <ForgotPassword open={open} handleClose={handleClose} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            登入
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            沒有登入權限？{' '}
                            <span>
                                <Link
                                    component={RouterLink}
                                    to="/signup"
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    註冊
                                </Link>
                            </span>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}
