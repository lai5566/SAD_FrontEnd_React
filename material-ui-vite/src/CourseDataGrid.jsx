// src/components/CourseDataGrid.jsx

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import {
    Button,
    Box,
    Typography,
    Paper,
    Toolbar,
    TextField,
    Autocomplete,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider
} from '@mui/material';
import ip_settings from "./ip_settings";

function CourseDataGrid({ onAddCourse }) {
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // 儲存勾選的資料 ID

  // 篩選狀態
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedCourseName, setSelectedCourseName] = useState(null);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedCourseGroups, setSelectedCourseGroups] = useState([]);
  const [selectedCourseTypes, setSelectedCourseTypes] = useState([]);

  useEffect(() => {
    axios
      .get(ip_settings.apiBaseUrl)
      .then((response) => {
        const courses = response.data.map((course, index) => ({
          id: index + 1,
          course_name_cn: course.course_name_cn,

          instructor_name: course.instructor_name,
          enrollment: course.enrollment,
          credits: course.credits,
          location: course.location,
          course_type: course.course_type,
          notes: course.notes,
          weekday: course.weekday,
          class_period: course.class_period,
          grade: course.grade, // 確保有年級資訊
          course_class: course.course_class,
        }));
        setRows(courses);
      })
      .catch((error) => {
        console.error('There was an error fetching the courses!', error);
      });
  }, []);

  const handleAddCourses = () => {
    const selectedCourses = rows.filter((row) => selectedIds.includes(row.id));
    onAddCourse(selectedCourses); // 傳遞選中的課程到時間表
    setSelectedIds([]); // 清空選中狀態
  };

  // 自定义工具栏
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: selectedIds.length
            ? (theme) => theme.palette.primary.light
            : 'inherit',
        }}
      >
        {selectedIds.length > 0 ? (
          <>
            <Typography variant="subtitle1" sx={{ pl: 2 }}>
              已選 {selectedIds.length} 筆資料
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCourses}
              sx={{ marginRight: 2 }}
            >
              加選
            </Button>
          </>
        ) : (
          <Typography variant="h6" sx={{ pl: 2 }}>
            課程表
          </Typography>
        )}
      </Toolbar>
    </GridToolbarContainer>
  );

  const columns = [
    { field: 'course_class', headerName: '課程名稱', width: 200 },
    { field: 'course_type', headerName: '課別名稱', width: 150 },
    { field: 'instructor_name', headerName: '授課教師', width: 150 },
    { field: 'credits', headerName: '學分數', width: 100 },
    { field: 'weekday', headerName: '上課星期', width: 100 },
    { field: 'class_period', headerName: '上課節次', width: 100 },
    { field: 'grade', headerName: '年級', width: 100 },
  ];

  // 提取唯一的教師名稱、課程名稱、年級和課程組別
  const uniqueInstructors = useMemo(() => {
    const instructors = rows.map(course => course.instructor_name);
    return [...new Set(instructors)].sort();
  }, [rows]);

  const uniqueCourseNames = useMemo(() => {
    const names = rows.map(course => course.course_name_cn);
    return [...new Set(names)].sort();
  }, [rows]);

  const uniqueGrades = useMemo(() => {
    const grades = rows.map(course => course.grade);
    return [...new Set(grades)].sort((a, b) => a - b);
  }, [rows]);

  const uniqueCourseGroups = useMemo(() => {
    const groups = rows.map(course => course.course_group);
    return [...new Set(groups)].sort();
  }, [rows]);

  const uniqueCourseTypes = useMemo(() => {
    const types = rows.map(course => course.course_type);
    return [...new Set(types)].sort();
  }, [rows]);

  // 根據篩選條件篩選課程
  const filteredRows = useMemo(() => {
    return rows.filter(course => {
      const matchesInstructor = selectedInstructor ? course.instructor_name === selectedInstructor : true;
      const matchesCourseName = selectedCourseName ? course.course_name_cn === selectedCourseName : true;
      const matchesGrade = selectedGrades.length > 0 ? selectedGrades.includes(course.grade) : true;
      const matchesCourseGroup = selectedCourseGroups.length > 0 ? selectedCourseGroups.includes(course.course_group) : true;
      const matchesCourseType = selectedCourseTypes.length > 0 ? selectedCourseTypes.includes(course.course_type) : true;
      return matchesInstructor && matchesCourseName && matchesGrade && matchesCourseGroup && matchesCourseType;
    });
  }, [rows, selectedInstructor, selectedCourseName, selectedGrades, selectedCourseGroups, selectedCourseTypes]);

  return (
      <Box display="flex" gap={3}>
        {/* 課程表格部分 */}
        <Box flex={3}>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(selection) => setSelectedIds(selection)}
              components={{
                Toolbar: CustomToolbar, // 使用自定義工具欄
              }}
            />
          </Box>
        </Box>

        {/* 查詢工具卡片部分 */}
        <Box flex={1}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              查詢工具
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* ComboBox 篩選工具 */}
              <Autocomplete
                disablePortal
                options={uniqueInstructors}
                value={selectedInstructor}
                onChange={(event, newValue) => {
                  setSelectedInstructor(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="選擇老師" />}
                sx={{ width: '100%' }}
                clearOnEscape
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />

              <Autocomplete
                disablePortal
                options={uniqueCourseNames}
                value={selectedCourseName}
                onChange={(event, newValue) => {
                  setSelectedCourseName(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="選擇課程名稱" />}
                sx={{ width: '100%' }}
                clearOnEscape
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />

              <Divider />

              {/* 年級篩選核取方塊 */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  年級
                </Typography>
                <FormGroup>
                  {uniqueGrades.map((grade) => (
                    <FormControlLabel
                      key={grade}
                      control={
                        <Checkbox
                          checked={selectedGrades.includes(grade)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedGrades(prev => [...prev, grade]);
                            } else {
                              setSelectedGrades(prev => prev.filter(g => g !== grade));
                            }
                          }}
                          name={`grade-${grade}`}
                        />
                      }
                      label={`年級 ${grade}`}
                    />
                  ))}
                </FormGroup>
              </Box>

              <Divider />

              {/*/!* 課程組別篩選核取方塊 *!/*/}
              {/*<Box>*/}
              {/*  <Typography variant="subtitle1" gutterBottom>*/}
              {/*    課程組別*/}
              {/*  </Typography>*/}
              {/*  <FormGroup>*/}
              {/*    {uniqueCourseGroups.map((group) => (*/}
              {/*      <FormControlLabel*/}
              {/*        key={group}*/}
              {/*        control={*/}
              {/*          <Checkbox*/}
              {/*            checked={selectedCourseGroups.includes(group)}*/}
              {/*            onChange={(event) => {*/}
              {/*              if (event.target.checked) {*/}
              {/*                setSelectedCourseGroups(prev => [...prev, group]);*/}
              {/*              } else {*/}
              {/*                setSelectedCourseGroups(prev => prev.filter(g => g !== group));*/}
              {/*              }*/}
              {/*            }}*/}
              {/*            name={`course_group-${group}`}*/}
              {/*          />*/}
              {/*        }*/}
              {/*        label={`組別 ${group}`}*/}
              {/*      />*/}
              {/*    ))}*/}
              {/*  </FormGroup>*/}
              {/*</Box>*/}

              {/*<Divider />*/}

              {/* 課別篩選核取方塊 */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  課別
                </Typography>
                <FormGroup>
                  {uniqueCourseTypes.map((type) => (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          checked={selectedCourseTypes.includes(type)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedCourseTypes(prev => [...prev, type]);
                            } else {
                              setSelectedCourseTypes(prev => prev.filter(t => t !== type));
                            }
                          }}
                          name={`course_type-${type}`}
                        />
                      }
                      label={type}
                    />
                  ))}
                </FormGroup>
              </Box>

              <Divider />

              {/* 重置篩選按鈕 */}
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
  );
}

export default CourseDataGrid;
