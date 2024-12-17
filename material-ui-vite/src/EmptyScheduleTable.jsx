import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@mui/material';
// import AppTheme from '../shared-theme/AppTheme';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import ColorModeSelect from "./shared-theme/ColorModeSelect";

function EmptyScheduleTable() {

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
        boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px', ...theme.applyStyles('dark', {
            boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
        }),
    }));

    return (
        <TableContainer>
            <ColorModeSelect sx={{position: 'fixed', top: '1rem', right: '1rem'}}/>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>時段</TableCell>
                            <TableCell>星期一</TableCell>
                            <TableCell>星期二</TableCell>
                            <TableCell>星期三</TableCell>
                            <TableCell>星期四</TableCell>
                            <TableCell>星期五</TableCell>
                            <TableCell>星期六</TableCell>
                            <TableCell>星期日</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({length: 14}).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>{`第${index + 1}節`}</TableCell>
                                {Array.from({length: 7}).map((_, dayIndex) => (
                                    <TableCell key={dayIndex} contentEditable={true}></TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

        </TableContainer>
    );
}

export default EmptyScheduleTable;
