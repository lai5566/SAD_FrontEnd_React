import React, { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCourseData } from '../dataLayer/useCourseData';

function SelectedCoursesPanel() {
  const { allCourses, selectedCourses, removeCourse } = useCourseData();

  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  // 使用 useMemo 優化課程詳細資訊的計算
  const detailedSelected = useMemo(() => {
    return selectedCourses.map(sc => {
      const course = allCourses.find(c => c.id === sc.course);
      return { ...sc, courseObj: course };
    });
  }, [selectedCourses, allCourses]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedCourseIds(selectedCourses.map(course => course.id));
    } else {
      setSelectedCourseIds([]);
    }
  };

  const handleSelect = (id) => {
    const selectedIndex = selectedCourseIds.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCourseIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCourseIds.slice(1));
    } else if (selectedIndex === selectedCourseIds.length - 1) {
      newSelected = newSelected.concat(selectedCourseIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCourseIds.slice(0, selectedIndex),
        selectedCourseIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCourseIds(newSelected);
  };

  const handleDeleteCourses = () => {
    selectedCourseIds.forEach(id => removeCourse(id));
    setSelectedCourseIds([]);
  };

  return (
    <Paper elevation={2} sx ={{ p: 2, mt: 0 }}>
      <Typography variant="h6" gutterBottom>已選課程</Typography>
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
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
            已選 {selectedCourseIds.length} 筆課程
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 100%' }} variant="h6">
            已選課程
          </Typography>
        )}
        {selectedCourseIds.length > 0 && (
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteCourses}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <TableContainer component={Paper} sx={{ width: '100%', mx: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ width: '50px' }}>
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
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>課程名稱</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detailedSelected.map(sc => {
              const isItemSelected = selectedCourseIds.includes(sc.id);
              return (
                <TableRow
                  key={sc.id}
                  hover
                  role="checkbox"
                  selected={isItemSelected}
                  onClick={() => handleSelect(sc.id)}
                >
                  <TableCell padding="checkbox" sx={{ width: '50px' }}>
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                    />
                  </TableCell>
                  <TableCell>{sc.courseObj ? sc.courseObj.course_class : '未知課程'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default React.memo(SelectedCoursesPanel);
