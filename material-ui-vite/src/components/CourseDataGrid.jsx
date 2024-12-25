// src/components/CourseDataGrid.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Box,
    Typography,
    Paper,
    TextField,
    Autocomplete,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
    styled,
    Toolbar,
    IconButton,
    Tooltip,
    Snackbar,
    Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCourseData } from '../dataLayer/useCourseData';
import CourseDetailModal from './CourseDetailModal';
import checkCourseConflict from '../utils/checkCourseConflict';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

// 定義 iconMapping
const iconMapping = {
    success: <CheckIcon fontSize="inherit" />,
    error: <ErrorIcon fontSize="inherit" />,
    warning: <WarningIcon fontSize="inherit" />,
    info: <InfoIcon fontSize="inherit" />,
};

// 自定義工具列組件
const CustomToolbar = ({ selectedCount, onAddCourses }) => {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selectedCount > 0 && {
                    bgcolor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark,
                }),
            }}
        >
            {selectedCount > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {selectedCount} 選擇中
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    課程資料
                </Typography>
            )}

            {selectedCount > 0 && (
                <Tooltip title="加選">
                    <IconButton onClick={onAddCourses}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

function CourseDataGrid() {
    const { allCourses, selectedCourses, addCourses } = useCourseData();

    // 在資料載入後檢查資料是否有 id 欄位
    useEffect(() => {
        console.log("All Courses:", allCourses);
    }, [allCourses]);

    const [selectedIds, setSelectedIds] = useState([]);

    // 新增的狀態
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    // 篩選狀態
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [selectedCourseName, setSelectedCourseName] = useState(null);
    const [selectedGrades, setSelectedGrades] = useState([]);
    const [selectedCourseGroups, setSelectedCourseGroups] = useState([]);
    const [selectedCourseTypes, setSelectedCourseTypes] = useState([]);

    // 獲取唯一的篩選選項
    const uniqueInstructors = useMemo(() => [...new Set(allCourses.map(c => c.instructor_name))].sort(), [allCourses]);
    const uniqueCourseNames = useMemo(() => [...new Set(allCourses.map(c => c.course_name_cn))].sort(), [allCourses]);
    const uniqueGrades = useMemo(() => [...new Set(allCourses.map(c => c.grade))].sort((a, b) => a - b), [allCourses]);
    const uniqueCourseGroups = useMemo(() => [...new Set(allCourses.map(c => c.course_group))].sort(), [allCourses]);
    const uniqueCourseTypes = useMemo(() => [...new Set(allCourses.map(c => c.course_type))].sort(), [allCourses]);

    // 篩選資料
    const filteredRows = useMemo(() => {
        const result = allCourses.filter(course => {
            const matchesInstructor = selectedInstructor ? course.instructor_name === selectedInstructor : true;
            const matchesCourseName = selectedCourseName ? course.course_name_cn === selectedCourseName : true;
            const matchesGrade = selectedGrades.length > 0 ? selectedGrades.includes(course.grade) : true;
            const matchesCourseGroup = selectedCourseGroups.length > 0 ? selectedCourseGroups.includes(course.course_group) : true;
            const matchesCourseType = selectedCourseTypes.length > 0 ? selectedCourseTypes.includes(course.course_type) : true;
            return matchesInstructor && matchesCourseName && matchesGrade && matchesCourseGroup && matchesCourseType;
        });
        console.log("Filtered Rows:", result);
        return result;
    }, [allCourses, selectedInstructor, selectedCourseName, selectedGrades, selectedCourseGroups, selectedCourseTypes]);

    // 新增 Snackbar 狀態
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error', // 'success', 'warning', 'info', 'error'
    });

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleAddCourses = () => {
        // 選出勾選的課程
        const selectedCoursesToAdd = filteredRows.filter((row) => selectedIds.includes(row.id));

        // 提取已選課程的完整對象
        const selectedCoursesFull = selectedCourses
            .map(sc => allCourses.find(c => c.id === sc.course))
            .filter(c => c && c.weekday && c.class_period);

        // 初始化一個陣列來存放有衝堂的課程
        const conflictingCourses = [];

        // 遍歷每一個欲加選的課程，檢查是否與已選課程衝堂
        selectedCoursesToAdd.forEach((newCourse) => {
            const hasConflict = checkCourseConflict(newCourse, selectedCoursesFull);
            if (hasConflict) {
                conflictingCourses.push(newCourse.course_class); // 或其他識別方式
            }
        });

        if (conflictingCourses.length > 0) {
            // 設置 Snackbar 訊息
            setSnackbar({
                open: true,
                message: `以下課程與已選課程時間衝突，無法加選：\n${conflictingCourses.join(', ')}`,
                severity: 'error',
            });
            return;
        }

        // 如果沒有衝堂，進行加選
        console.log("Selected Courses for Add:", selectedCoursesToAdd);
        addCourses(selectedCoursesToAdd);
        setSelectedIds([]);

        // 顯示成功訊息
        setSnackbar({
            open: true,
            message: '課程加選成功！',
            severity: 'success',
        });
    };

    const columns = [
        {
            field: 'course_class',
            headerName: '課程名稱',
            width: 200,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" height="100%">
                    <Typography
                        variant="body2"
                        onClick={(e) => {
                            e.stopPropagation(); // 防止觸發行選擇
                            setSelectedCourseId(params.row.id);
                            setIsModalOpen(true);
                        }}
                        sx={{ cursor: 'pointer', color: 'text.primary' }} // 確保文字為黑色
                    >
                        {params.value}
                    </Typography>
                </Box>
            ),
        },
        { field: 'course_type', headerName: '課別名稱', width: 150 },
        { field: 'instructor_name', headerName: '授課教師', width: 150 },
        { field: 'credits', headerName: '學分數', width: 100 },
        { field: 'weekday', headerName: '上課星期', width: 100 },
        { field: 'class_period', headerName: '上課節次', width: 100 },
        { field: 'grade', headerName: '年級', width: 100 },
    ];

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 1400, mx: 'auto', mt: 5 }}>
            <Box display="flex" gap={3}>
                {/* 課程表格區 */}
                <Box flex={3}>
                    {/* 自定義工具列 */}
                    <CustomToolbar selectedCount={selectedIds.length} onAddCourses={handleAddCourses} />

                    <Box sx={{ height: 600, width: '100%', mb: 2 }}>
                        <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            checkboxSelection
                            disableRowSelectionOnClick
                            rowSelectionModel={selectedIds}
                            onRowSelectionModelChange={(newSelection) => {
                                console.log("New selection:", newSelection);
                                setSelectedIds(newSelection);
                            }}
                        />
                    </Box>
                </Box>
                {/* 查詢工具區 */}
                <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                        查詢工具
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {/* 復原 disablePortal */}
                        <Autocomplete
                            options={uniqueInstructors}
                            value={selectedInstructor}
                            onChange={(event, newValue) => setSelectedInstructor(newValue)}
                            renderInput={(params) => <TextField {...params} label="選擇老師" />}
                            sx={{ width: '100%' }}
                            clearOnEscape
                            disablePortal // 恢復 disablePortal
                        />
                        <Autocomplete
                            options={uniqueCourseNames}
                            value={selectedCourseName}
                            onChange={(event, newValue) => setSelectedCourseName(newValue)}
                            renderInput={(params) => <TextField {...params} label="選擇課程名稱" />}
                            sx={{ width: '100%' }}
                            clearOnEscape
                            disablePortal // 恢復 disablePortal
                        />
                        <Divider />
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>年級</Typography>
                            <FormGroup>
                                {uniqueGrades.map((grade) => (
                                    <FormControlLabel
                                        key={grade}
                                        control={
                                            <Checkbox
                                                checked={selectedGrades.includes(grade)}
                                                onChange={(event) => {
                                                    if (event.target.checked) setSelectedGrades(prev => [...prev, grade]);
                                                    else setSelectedGrades(prev => prev.filter(g => g !== grade));
                                                }}
                                            />
                                        }
                                        label={`年級 ${grade}`}
                                    />
                                ))}
                            </FormGroup>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>課別</Typography>
                            <FormGroup>
                                {uniqueCourseTypes.map((type) => (
                                    <FormControlLabel
                                        key={type}
                                        control={
                                            <Checkbox
                                                checked={selectedCourseTypes.includes(type)}
                                                onChange={(event) => {
                                                    if (event.target.checked) setSelectedCourseTypes(prev => [...prev, type]);
                                                    else setSelectedCourseTypes(prev => prev.filter(t => t !== type));
                                                }}
                                            />
                                        }
                                        label={type}
                                    />
                                ))}
                            </FormGroup>
                        </Box>
                        <Divider />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                setSelectedInstructor(null);
                                setSelectedCourseName(null);
                                setSelectedGrades([]);
                                setSelectedCourseGroups([]);
                                setSelectedCourseTypes([]);
                            }}
                        >
                            重置篩選
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Snackbar 組件 */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    iconMapping={iconMapping} // 使用 iconMapping
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* CourseDetailModal 組件 */}
            {selectedCourseId && (
                <CourseDetailModal
                    courseId={selectedCourseId}
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </Paper>
    );

}

export default CourseDataGrid;
