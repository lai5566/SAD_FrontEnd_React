// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import MuiCard from "@mui/material/Card";
// import {styled} from "@mui/material/styles";
// import AppTheme from "./shared-theme/AppTheme";
// import ColorModeSelect from "./shared-theme/ColorModeSelect";
// import DragSelectScheduleWithMenu from "./DragSelectScheduleWithMenu";
// import CourseDataGrid from "./CourseDataGrid";
// import Chip from '@mui/material/Chip';
// // import DragSelectTable from "./MultiSelectTable";
// import Divider from '@mui/material/Divider';
//
// // const TableandContainer = styled(Stack)(({theme}) => ({
// //     minHeight: '100%', padding: theme.spacing(2), [theme.breakpoints.up('sm')]: {
// //         padding: theme.spacing(4),
// //     }, position: 'relative', '&::before': {
// //         content: '""',
// //         display: 'block',
// //         position: 'absolute',
// //         zIndex: -1,
// //         inset: 0,
// //         backgroundImage: theme.palette.mode === 'dark' ? 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))' : 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
// //         backgroundRepeat: 'no-repeat',
// //     },
// // }));
// const TContainer = styled(Stack)(({theme}) => ({
//     minHeight: '100%', padding: theme.spacing(2), [theme.breakpoints.up('sm')]: {
//         padding: theme.spacing(4),
//     }, '&::before': {
//         content: '""',
//         display: 'block',
//         position: 'fixed',
//         zIndex: -1,
//         inset: 0,
//         backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
//         backgroundRepeat: 'no-repeat', ...theme.applyStyles('dark', {
//             backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
//         }),
//     },
// }));
//
// // // 檢查 `useColorScheme` 是否正確初始化
// //  if (!mode || !setMode) {
// //    console.error('useColorScheme is not properly initialized.');
// //    return null; // 終止渲染，避免後續錯誤
// //  }
// const Card = styled(MuiCard)(({theme}) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     alignSelf: 'center',
//     width: '100%',
//     padding: theme.spacing(4),
//     gap: theme.spacing(2),
//     margin: 'auto',
//     [theme.breakpoints.up('sm')]: {
//         maxWidth: '100%',
//     },
//     boxShadow: theme.palette.mode === 'dark' ? 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px' : 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
// }));
//
// export default function Tableand(props) {
//     return (
//
//         <AppTheme {...props}>
//             <ColorModeSelect sx={{position: 'fixed', top: '1rem', right: '1rem'}}/>
//             <TContainer>
//                 <Card>
//                    <CourseDataGrid/>
//
//                          {/*右侧区域：占 Card 的 29%*/}
//                         {/*<Card*/}
//                         {/*    sx={{*/}
//                         {/*    flex: '29%',*/}
//                         {/*    height: '100%', // 让高度和左侧对齐*/}
//                         {/*    border: '1px solid #e0e0e0', // 添加边框作为分隔*/}
//                         {/*    borderRadius: '8px',*/}
//                         {/*    padding: '1rem',*/}
//                         {/*    boxSizing: 'border-box',*/}
//                         {/*    marginTop: '100px',*/}
//                         {/*}}*/}
//                         {/*    >*/}
//                         {/*    /!* 这里是新增的内容 *!/*/}
//                         {/*    <h3>查詢工具</h3>*/}
//                         {/*    <p>查詢工具選項內容</p>*/}
//                         {/*    </Card>*/}
//
//                     <Divider/>
//
//                     {/* DragSelectScheduleWithMenu 位于整个布局的下方 */}
//                     <DragSelectScheduleWithMenu/>
//                 </Card>
//             </TContainer>
//         </AppTheme>
//
// )
// ;
// }
// src/components/Tableand.jsx

import React from 'react';
import { styled, Stack } from '@mui/material';
import MuiCard from "@mui/material/Card";
import AppTheme from "./shared-theme/AppTheme";
import ColorModeSelect from "./shared-theme/ColorModeSelect";
import DragSelectScheduleWithMenu from "./components/DragSelectScheduleWithMenu";
import CourseDataGrid from "./components/CourseDataGrid";
import Divider from '@mui/material/Divider';

const TContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'fixed',
        zIndex: -1,
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width:'100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '80%',
    },
    boxShadow: theme.palette.mode === 'dark'
        ? 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
        : 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

export default function Tableand(props) {
    const handleAddCourse = (selectedCourses) => {
        // 處理選中的課程，例如更新狀態或顯示消息
        console.log('已加選的課程:', selectedCourses);
    };

    return (
        <AppTheme {...props}>
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <TContainer>
                <Card>
                    <CourseDataGrid onAddCourse={handleAddCourse} />
                    <Divider />
                    <DragSelectScheduleWithMenu />
                </Card>
            </TContainer>
        </AppTheme>
    );
}
