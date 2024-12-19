import * as React from 'react';
import {createRoot} from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import App from './App';
import theme from './theme';
import SignIn from './sign-in/SignIn'
import SignUp from './sign-up/SignUp'
import CourseDataGrid   from "./CourseDataGrid";
import EmptyScheduleTable from "./EmptyScheduleTable";
import EmptyScheduleGrid from "./EmptyScheduleGrid";
import DragSelectScheduleWithMenu from "./old/DragSelectScheduleWithMenu";
import Tableand from "./Tableand";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import  TinyBarChart  from './bar';
import {Portrait} from "@mui/icons-material";
import ProtectedRoute from "./ProtectedRoute";
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
import ScheduleTable  from "./pages/SchedulePage";
import CourseProvider from './dataLayer/CourseProvider'; // 從資料層導入CourseProvider
import ResetPassword from "./sign-in/ResetPassword";
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/c" element={<CourseDataGrid/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>} />
                    {/*<Route path="/Table" element={<EmptyScheduleTable/>}/>*/}
                    {/*<Route path="/grid" element={<EmptyScheduleGrid/>}/>*/}
                    {/*<Route path="/table2" element={<DragSelectScheduleWithMenu/>}/>*/}
                    {/*<Route path="/table3" element={<ProtectedRoute><Tableand/></ProtectedRoute>   }/>*/}
                    {/*<Route path="/bar" element={<TinyBarChart/>}/>*/}
                    {/*<Route path="/r" element={<ResetPassword/>  }/>*/}
                    {/*<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />*/}
                    {/* 將 /S 路由包入 CourseProvider 中，使 ScheduleTable 及其子組件能取得全域課程資料 */}
                    <Route 
                        path="/S" 
                        element={
                            <ProtectedRoute>
                                <CourseProvider>
                                    <ScheduleTable/>
                                </CourseProvider>
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
);
