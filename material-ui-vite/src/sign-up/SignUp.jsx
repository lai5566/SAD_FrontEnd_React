import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';
// import getSignUpTheme from './theme/getSignUpTheme';
import {ShcolIcon} from './CustomIcons';
// import TemplateFrame from './TemplateFrame';
import axios from 'axios';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
//
//
// // import * as React from 'react';
// // import { styled } from '@mui/material/styles';
// import FormGroup from '@mui/material/FormGroup';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';


import {Link as RouterLink} from 'react-router-dom';//路由

const MaterialUISwitch = styled(Switch)(({theme}) => ({
    width: 62, height: 34, padding: 7, '& .MuiSwitch-switchBase': {
        margin: 1, padding: 0, transform: 'translateX(6px)', '&.Mui-checked': {
            color: '#fff', transform: 'translateX(22px)', '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff',)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            }, '& + .MuiSwitch-track': {
                opacity: 1, backgroundColor: '#aab4be', ...theme.applyStyles('dark', {
                    backgroundColor: '#8796A5',
                }),
            },
        },
    }, '& .MuiSwitch-thumb': {
        backgroundColor: '#001e3c', width: 32, height: 32, '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff',)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        }, ...theme.applyStyles('dark', {
            backgroundColor: '#003892',
        }),
    }, '& .MuiSwitch-track': {
        opacity: 1, backgroundColor: '#aab4be', borderRadius: 20 / 2, ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
        }),
    },
}));

///

// const Card = styled(MuiCard)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   width: '100%',
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   margin: 'auto',
//   boxShadow:
//     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//   [theme.breakpoints.up('sm')]: {
//     width: '450px',
//   },
//   ...theme.applyStyles('dark', {
//     boxShadow:
//       'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
//   }),
// }));
const Card = styled(MuiCard)(({theme}) => ({
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
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px', ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));
const SignUpContainer = styled(Stack)(({theme}) => ({
    minHeight: '100%', padding: theme.spacing(2), [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    }, '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat', ...theme.applyStyles('dark', {
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    }
}));

export default function SignUp(props) {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const defaultTheme = createTheme({palette: {mode}});
    // const SignUpTheme = createTheme(getSignUpTheme(mode));
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    // This code only runs on the client side, to determine the system color preference
    // React.useEffect(() => {
    //   // Check if there is a preferred mode in localStorage
    //   const savedMode = localStorage.getItem('themeMode');
    //   if (savedMode) {
    //     setMode(savedMode);
    //   } else {
    //     // If no preference is found, it uses system preference
    //     const systemPrefersDark = window.matchMedia(
    //       '(prefers-color-scheme: dark)',
    //     ).matches;
    //     setMode(systemPrefersDark ? 'dark' : 'light');
    //    }
    //


    const toggleColorMode = () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
    };


    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const name = document.getElementById('name');

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

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };
    //這handleSubmit 已大致搜集要傳送到後端的資料
    const handleSubmit = async (event) => {
        if (nameError || emailError || passwordError) {
            event.preventDefault();
            return;
        }
        //截取資料
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     name: data.get('name'),
        //     lastName: data.get('lastName'),
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        // //傳到後端
        // try {
        //     const response = await axios.post('http://127.0.0.1:8000/polls/api/users/', data);
        //     console.log('Response from server:', response.data);
        // } catch (error) {
        //     console.error('Error submitting data:', error);
        // }

        const data = new FormData(event.currentTarget);

// 合併 name 和 lastName 成為 username
//         const username = `${data.get('name')} ${data.get('lastName')}`.trim();
        const username = `${data.get('name')}`.trim();
        const userData = {
            email: data.get('email'), username: username, password: data.get('password'),
        };

// 傳到後端
        try {
            const response = await axios.post('http://127.0.0.1:8000/sc/api/signup/', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }

    };

    return (<AppTheme {...props}>
        {/*<ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>*/}

        <CssBaseline enableColorScheme/>
        <SignUpContainer direction="column" justifyContent="space-between">
            {<ColorModeSelect sx={{position: 'fixed', top: '1rem', right: '1rem'}}/>}

            {/*<MaterialUISwitch></MaterialUISwitch>*/}
            <Card variant="outlined">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <ShcolIcon style={{marginRight: '3px'}}/>
                    <Typography
                        variant="h6"
                        sx={{margin: 0, fontSize: '1.6rem'}}>
                        預選課系統
                    </Typography>
                </div>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    註冊
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{display: 'flex', flexDirection: 'column', gap: 2}}
                >
                    <FormControl>
                        <FormLabel htmlFor="name">Full name</FormLabel>
                        <TextField
                            autoComplete="name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            placeholder="Wojak"
                            error={nameError}
                            helperText={nameErrorMessage}
                            color={nameError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            placeholder="your@email.com"
                            name="email"
                            autoComplete="email"
                            variant="outlined"
                            error={emailError}
                            helperText={emailErrorMessage}
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            variant="outlined"
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <p/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
                    >
                        註冊
                    </Button>
                    <p/>
                    <Typography sx={{textAlign: 'center'}}>
                        已有帳號？{' '}
                        <span>
                  <Link
                      component={RouterLink}
                      to="/signin"  // 改用 React Router 的 "to" 屬性來指定路徑
                      variant="body2"
                      sx={{alignSelf: 'center'}}
                  >
                    登入
                  </Link>
                </span>
                    </Typography>
                </Box>
            </Card>
        </SignUpContainer>
        {/*</ThemeProvider>*/}
    </AppTheme>);
}
