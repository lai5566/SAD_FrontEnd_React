import React from 'react';
import { Paper, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCourseData } from '../dataLayer/useCourseData';

function SelectedCoursesPanel() {
  const { allCourses, selectedCourses, removeCourse } = useCourseData();

  // 將 selectedCourses 中每個 studentCourse 找出對應的課程資料
  const detailedSelected = selectedCourses.map(sc => {
    const course = allCourses.find(c => c.id === sc.course);
    return { ...sc, courseObj: course };
  });

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>已選課程</Typography>
      <List>
        {detailedSelected.map(sc => (
          <ListItem
            key={sc.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => removeCourse(sc.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            {sc.courseObj ? sc.courseObj.course_class : '未知課程'}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default SelectedCoursesPanel;
