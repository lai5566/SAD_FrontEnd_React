import React, {useState, useMemo, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
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
    Divider
} from '@mui/material';
import {useCourseData} from '../dataLayer/useCourseData';

function CourseDataGrid() {
    const {allCourses, addCourses} = useCourseData();

    // 在資料載入後檢查資料是否有 id 欄位
    useEffect(() => {
        console.log("All Courses:", allCourses);
        // 檢查資料結構，在 Console 中查看每筆物件是否有 id 欄位
    }, [allCourses]);

    const [selectedIds, setSelectedIds] = useState([]);

    // 篩選狀態
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [selectedCourseName, setSelectedCourseName] = useState(null);
    const [selectedGrades, setSelectedGrades] = useState([]);
    const [selectedCourseGroups, setSelectedCourseGroups] = useState([]);
    const [selectedCourseTypes, setSelectedCourseTypes] = useState([]);

    // 此處不必再為資料加上id，因為已存在id欄位
    // 直接使用 allCourses 即可
    const uniqueInstructors = useMemo(() => [...new Set(allCourses.map(c => c.instructor_name))].sort(), [allCourses]);
    const uniqueCourseNames = useMemo(() => [...new Set(allCourses.map(c => c.course_name_cn))].sort(), [allCourses]);
    const uniqueGrades = useMemo(() => [...new Set(allCourses.map(c => c.grade))].sort((a, b) => a - b), [allCourses]);
    const uniqueCourseGroups = useMemo(() => [...new Set(allCourses.map(c => c.course_group))].sort(), [allCourses]);
    const uniqueCourseTypes = useMemo(() => [...new Set(allCourses.map(c => c.course_type))].sort(), [allCourses]);

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
        // 在Console查看 Filtered Rows，確認每列有 id 欄位
        return result;
    }, [allCourses, selectedInstructor, selectedCourseName, selectedGrades, selectedCourseGroups, selectedCourseTypes]);

    const handleAddCourses = () => {
        // 選出勾選的課程
        const selectedCourses = filteredRows.filter((row) => selectedIds.includes(row.id));
        console.log("Selected Courses for Add:", selectedCourses);
        addCourses(selectedCourses);
        setSelectedIds([]);
    };

    const columns = [
        {field: 'course_class', headerName: '課程名稱', width: 200},
        {field: 'course_type', headerName: '課別名稱', width: 150},
        {field: 'instructor_name', headerName: '授課教師', width: 150},
        {field: 'credits', headerName: '學分數', width: 100},
        {field: 'weekday', headerName: '上課星期', width: 100},
        {field: 'class_period', headerName: '上課節次', width: 100},
        {field: 'grade', headerName: '年級', width: 100},
    ];

    return (
        <Paper elevation={3} sx={{p: 3, maxWidth: 1400, mx: 'auto', mt: 5}}>
            <Box display="flex" gap={3}>
                {/* 課程表格區 */}
                <Box flex={3}>
                    <Box sx={{height: 600, width: '100%', mb: 2}}>
                        <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            checkboxSelection
                            disableRowSelectionOnClick
                            // 舊版寫法（錯誤）：selectionModel={selectedIds} onSelectionModelChange={...}
                            // 新版正確寫法：
                            rowSelectionModel={selectedIds}
                            onRowSelectionModelChange={(newSelection) => {
                                console.log("New selection:", newSelection);
                                setSelectedIds(newSelection);
                            }}
                        />
                    </Box>
                    {/* 表格下方的加選按鈕 */}
                    <Box display="flex" justifyContent="flex-end" sx={{mt: 2}}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={selectedIds.length === 0}
                            // 如果勾選行成功，selectedIds.length > 0，按鈕變可按
                            onClick={handleAddCourses}
                        >
                            加選
                        </Button>
                    </Box>
                </Box>
                {/* 查詢工具區 */}
                <Box flex={1}>
                    <Paper elevation={3} sx={{p: 2}}>
                        <Typography variant="h6" gutterBottom>
                            查詢工具
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Autocomplete
                                disablePortal
                                options={uniqueInstructors}
                                value={selectedInstructor}
                                onChange={(event, newValue) => setSelectedInstructor(newValue)}
                                renderInput={(params) => <TextField {...params} label="選擇老師"/>}
                                sx={{width: '100%'}}
                                clearOnEscape
                            />
                            <Autocomplete
                                disablePortal
                                options={uniqueCourseNames}
                                value={selectedCourseName}
                                onChange={(event, newValue) => setSelectedCourseName(newValue)}
                                renderInput={(params) => <TextField {...params} label="選擇課程名稱"/>}
                                sx={{width: '100%'}}
                                clearOnEscape
                            />
                            <Divider/>
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
                            <Divider/>
                            {/*<Box>*/}
                            {/*    <Typography variant="subtitle1" gutterBottom>課程組別</Typography>*/}
                            {/*    <FormGroup>*/}
                            {/*        {uniqueCourseGroups.map((group) => (*/}
                            {/*            <FormControlLabel*/}
                            {/*                key={group}*/}
                            {/*                control={*/}
                            {/*                    <Checkbox*/}
                            {/*                        checked={selectedCourseGroups.includes(group)}*/}
                            {/*                        onChange={(event) => {*/}
                            {/*                            if (event.target.checked) setSelectedCourseGroups(prev => [...prev, group]);*/}
                            {/*                            else setSelectedCourseGroups(prev => prev.filter(g => g !== group));*/}
                            {/*                        }}*/}
                            {/*                    />*/}
                            {/*                }*/}
                            {/*                label={`組別 ${group}`}*/}
                            {/*            />*/}
                            {/*        ))}*/}
                            {/*    </FormGroup>*/}
                            {/*</Box>*/}
                            {/*<Divider/>*/}
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
                            <Divider/>
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
                    </Paper>
                </Box>
            </Box>
        </Paper>
    );
}

export default CourseDataGrid;
