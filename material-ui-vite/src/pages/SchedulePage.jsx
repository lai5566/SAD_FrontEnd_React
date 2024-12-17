import React from 'react';
import {Box, styled, Stack} from '@mui/material';
import CourseDataGrid from '../components/CourseDataGrid';
import DragSelectScheduleWithMenu from '../components/DragSelectScheduleWithMenu';
import SelectedCoursesPanel from '../components/SelectedCoursesPanel';
import MuiCard from "@mui/material/Card";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
const SchedulePageContainer = styled(Stack)(({theme}) => ({
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

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
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

function SchedulePage(props) {
    return (
        <AppTheme {...props}>
             <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <SchedulePageContainer>
                <Card>
                    <Box>

                        <CourseDataGrid/>
                        <DragSelectScheduleWithMenu/>
                        {/*<SelectedCoursesPanel /> {/*<SelectedCoursesPanel />*/}


                    </Box>
                </Card>
            </SchedulePageContainer>

        </AppTheme>
    )
        ;
}

export default SchedulePage;
