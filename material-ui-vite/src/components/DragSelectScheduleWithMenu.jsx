// src/components/DragSelectScheduleWithMenu.jsx

import React, {useState, useRef, useEffect} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Menu,
    MenuItem,
    Switch,
    FormControlLabel,
    Box,
    Toolbar,
    Typography,
    Checkbox,
    IconButton,
    Tooltip,
    Snackbar,
    Alert,
    Card,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import {PieChart} from '@mui/x-charts/PieChart';
import {useDrawingArea} from '@mui/x-charts/hooks';
import {styled} from '@mui/material/styles';
import {useCourseData} from '../dataLayer/useCourseData';
import checkCourseConflict from "../utils/checkCourseConflict";

function DragSelectScheduleWithMenu() {
    const {allCourses, selectedCourses, addCourses, removeCourse} = useCourseData();

    const [schedule, setSchedule] = useState({});
    const [selectedRange, setSelectedRange] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isFullTable, setIsFullTable] = useState(true);
    const [selectedCourseIds, setSelectedCourseIds] = useState([]);
    const isDragging = useRef(false);
    const startCell = useRef(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const showLocalSnackbar = (message, severity = 'info') => {
        setSnackbar({open: true, message, severity});
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar((prev) => ({...prev, open: false}));
    };

    // 根據 selectedCourses 與 allCourses 更新時間表
    useEffect(() => {
        if (allCourses.length > 0 && selectedCourses.length > 0) {
            const updatedSchedule = {};
            selectedCourses.forEach((studentCourse) => {
                const course = allCourses.find(c => c.id === studentCourse.course);
                if (course) {
                    const coursePeriods = course.class_period ? course.class_period.split(',').map(Number) : [];
                    const courseWeekday = parseInt(course.weekday, 10) - 1;
                    coursePeriods.forEach((period) => {
                        const key = `${courseWeekday}-${period - 1}`;
                        updatedSchedule[key] = course.course_class;
                    });
                }
            });
            setSchedule(updatedSchedule);
        } else {
            setSchedule({});
        }
    }, [selectedCourses, allCourses]);

    // 計算 Pie Data 和 totalCredits
    const [pieData, setPieData] = useState([
        {value: 0, label: '通識必修'},
        {value: 0, label: '通識選修'},
        {value: 0, label: '專業必修'},
        {value: 0, label: '專業選修'},
    ]);

    const [totalCredits, setTotalCredits] = useState(0);

    useEffect(() => {
        if (selectedCourses.length === 0) {
            setPieData([
                {value: 0, label: '通識必修'},
                {value: 0, label: '通識選修'},
                {value: 0, label: '專業必修'},
                {value: 0, label: '專業選修'},
            ]);
            setTotalCredits(0);
        } else {
            const counts = {
                '通識必修': 0,
                '通識選修': 0,
                '專業必修': 0,
                '專業選修': 0,
            };

            let total = 0;
            selectedCourses.forEach((studentCourse) => {
                const course = allCourses.find(c => c.id === studentCourse.course);
                if (course) {
                    const type = course.course_type ? course.course_type.replace(/\(.*\)/, '').trim() : '未知';
                    if (counts.hasOwnProperty(type)) {
                        counts[type] += course.credits || 0;
                    }
                    total += course.credits || 0;
                }
            });

            const newPieData = [
                {value: counts['通識必修'], label: '通識必修'},
                {value: counts['通識選修'], label: '通識選修'},
                {value: counts['專業必修'], label: '專業必修'},
                {value: counts['專業選修'], label: '專業選修'},
            ];

            setPieData(newPieData);
            setTotalCredits(total);
        }
    }, [selectedCourses, allCourses]);

    // 滑動選擇時段功能
    const handleMouseDown = (dayIndex, timeIndex) => {
        isDragging.current = true;
        startCell.current = {dayIndex, timeIndex};
        setSelectedRange([{dayIndex, timeIndex}]);
    };

    const handleMouseMove = (dayIndex, timeIndex) => {
        if (isDragging.current && startCell.current?.dayIndex === dayIndex) {
            const start = Math.min(startCell.current.timeIndex, timeIndex);
            const end = Math.max(startCell.current.timeIndex, timeIndex);
            const range = Array.from({length: end - start + 1}, (_, i) => ({
                dayIndex,
                timeIndex: start + i,
            }));
            setSelectedRange(range);
        }
    };

    const handleMouseUp = (event) => {
        isDragging.current = false;
        if (Array.isArray(selectedRange) && selectedRange.length > 0) {
            setAnchorEl(event.currentTarget);
        }
    };

    // 過濾符合選擇時段的課程
    const filteredCourses = Array.isArray(selectedRange) && selectedRange.length > 0
        ? allCourses.filter((course) => {
            const selectedDay = selectedRange[0].dayIndex + 1;
            const selectedPeriods = selectedRange.map((cell) => cell.timeIndex + 1);
            const coursePeriods = course.class_period ? course.class_period.split(',').map(Number) : [];
            return (
                parseInt(course.weekday, 10) === selectedDay &&
                coursePeriods.every((period) => selectedPeriods.includes(period))
            );
        })
        : [];

    // 圖表樣式
    const size = {
        width: 400,
        height: 200,
    };

    const StyledText = styled('text')(({theme}) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));

    function PieCenterLabel({children}) {
        const {width, height, left, top} = useDrawingArea();
        return (
            <StyledText x={left + width / 2} y={top + height / 2}>
                {children}
            </StyledText>
        );
    }

    async function handleCourseSelect(course) {
        console.log('Selected course:', course);
        if (!course.id) {
            showLocalSnackbar('選擇的課程資料不完整，請重新選擇。', 'error');
            return;
        }

        // 檢查衝堂
        const hasConflict = checkCourseConflict(course, selectedCourses);
        if (hasConflict) {
            // 使用 alert 或更好的 UI 提示，如 showLocalSnackbar
            showLocalSnackbar('衝堂：該課程與已選課程時間重疊，無法加選！', 'warning');
            return; // 不進行加選
        }

        try {
            await addCourses([course]);
            showLocalSnackbar('選課成功！', 'success');
        } catch (error) {
            const errorMessage = error.response && error.response.data ? JSON.stringify(error.response.data) : error.message;
            showLocalSnackbar(`選課錯誤：${errorMessage}`, 'error');
        }
        handleClose();
    }

    const handleCourseDelete = async (studentCourseId) => {
        try {
            await removeCourse(studentCourseId);
            showLocalSnackbar('取消選課成功！', 'success');
        } catch (error) {
            showLocalSnackbar(`取消選課錯誤：${error.message}`, 'error');
        }
    };

    const handleDeleteCourses = () => {
        const coursesToDelete = selectedCourses.filter((course) =>
            selectedCourseIds.includes(course.id)
        );
        coursesToDelete.forEach(course => handleCourseDelete(course.id));
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRange([]);
    };

    const renderCell = (dayIndex, timeIndex) => {
        const key = `${dayIndex}-${timeIndex}`;
        const isSelected = Array.isArray(selectedRange) && selectedRange.some(
            (cell) => cell.dayIndex === dayIndex && cell.timeIndex === timeIndex
        );
        const cellContent = schedule[key];
        return (
            <TableCell
                key={key}
                onMouseDown={() => handleMouseDown(dayIndex, timeIndex)}
                onMouseMove={() => handleMouseMove(dayIndex, timeIndex)}
                onMouseUp={handleMouseUp}
                sx={{
                    textAlign: 'center',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: isSelected ? 'primary.light' : 'background.paper',
                    cursor: 'pointer',
                    userSelect: 'none',
                }}
            >
                {cellContent || ''}
            </TableCell>
        );
    };

    const days = isFullTable
        ? ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        : ['星期一', '星期二', '星期三', '星期四', '星期五'];
    const periods = isFullTable ? 14 : 10;

    const getAlertIcon = (severity) => {
        switch (severity) {
            case 'success':
                return <CheckIcon fontSize="inherit"/>;
            case 'error':
                return <ErrorIcon fontSize="inherit"/>;
            case 'warning':
                return <WarningIcon fontSize="inherit"/>;
            case 'info':
            default:
                return <InfoIcon fontSize="inherit"/>;
        }
    };

    return (
        <Box display="flex" gap="2%" sx={{alignItems: 'flex-start', p: 2}}>
            <Card sx={{flex: '75%', height: '100%', p: 2}}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isFullTable}
                            onChange={() => setIsFullTable((prev) => !prev)}
                        />
                    }
                    label={isFullTable ? '完整表格 (7×14)' : '簡化表格 (5×10)'}
                    sx={{mb: 2}}
                />
                <Typography variant="h5" component="div" gutterBottom>
                    時間表
                </Typography>
                <TableContainer component={Paper} sx={{maxWidth: 800, mx: 'auto', mt: 2}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold', textAlign: 'center'}}>時段</TableCell>
                                {days.map((day) => (
                                    <TableCell key={day} sx={{fontWeight: 'bold', textAlign: 'center'}}>
                                        {day}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.from({length: periods}).map((_, timeIndex) => (
                                <TableRow key={timeIndex}>
                                    <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>
                                        {`第${timeIndex + 1}節`}
                                    </TableCell>
                                    {Array.from({length: days.length}).map((_, dayIndex) =>
                                        renderCell(dayIndex, timeIndex)
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <MenuItem
                                key={course.id}
                                onClick={() => handleCourseSelect(course)}
                            >
                                {course.course_class}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>沒有可選課程</MenuItem>
                    )}
                </Menu>
            </Card>
            <Box sx={{flex: '16%', display: 'flex', flexDirection: 'column', gap: 2}}>
                <Card sx={{flex: '20%', height: '50%', p: 2, textAlign: 'left'}}>
                    <Toolbar
                        sx={{
                            pl: 2,
                            pr: 1,
                            bgcolor: selectedCourseIds.length
                                ? (theme) => theme.palette.primary.light
                                : 'inherit',
                        }}
                    >
                        {selectedCourseIds.length > 0 ? (
                            <Typography sx={{flex: '1 1 100%'}} color="inherit" variant="subtitle1">
                                已選 {selectedCourseIds.length} 筆課程
                            </Typography>
                        ) : (
                            <Typography sx={{flex: '1 1 100%'}} variant="h6">
                                已選課程
                            </Typography>
                        )}
                        {selectedCourseIds.length > 0 && (
                            <Tooltip title="Delete">
                                <IconButton onClick={handleDeleteCourses}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        )}
                    </Toolbar>
                    <TableContainer component={Paper} sx={{width: '100%', mx: 0}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox" sx={{width: '50px'}}>
                                        <Checkbox
                                            color="primary"
                                            indeterminate={
                                                selectedCourseIds.length > 0 &&
                                                selectedCourseIds.length < selectedCourses.length
                                            }
                                            checked={
                                                selectedCourses.length > 0 &&
                                                selectedCourseIds.length === selectedCourses.length
                                            }
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    setSelectedCourseIds(
                                                        selectedCourses.map((course) => course.id)
                                                    );
                                                } else {
                                                    setSelectedCourseIds([]);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>課程名稱</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedCourses.map((studentCourse) => {
                                    const isItemSelected = selectedCourseIds.includes(studentCourse.id);
                                    const courseObj = allCourses.find(c => c.id === studentCourse.course);
                                    return (
                                        <TableRow
                                            key={studentCourse.id}
                                            hover
                                            role="checkbox"
                                            selected={isItemSelected}
                                            onClick={() => {
                                                const selectedIndex = selectedCourseIds.indexOf(studentCourse.id);
                                                const newSelected = [...selectedCourseIds];
                                                if (selectedIndex === -1) {
                                                    newSelected.push(studentCourse.id);
                                                } else {
                                                    newSelected.splice(selectedIndex, 1);
                                                }
                                                setSelectedCourseIds(newSelected);
                                            }}
                                        >
                                            <TableCell padding="checkbox" sx={{width: '50px'}}>
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
                                            <TableCell>{courseObj ? courseObj.course_class : '未知課程'}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
                <Card sx={{flex: '15%', height: '50%', p: 2, mt: 2}}>
                    <Typography variant="h6">選修學分</Typography>
                    <PieChart series={[{data: pieData, innerRadius: 80}]} {...size}>
                        <PieCenterLabel>{totalCredits}</PieCenterLabel>
                    </PieChart>
                </Card>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={1500}
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{width: '100%'}}
                    icon={getAlertIcon(snackbar.severity)}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default DragSelectScheduleWithMenu;
