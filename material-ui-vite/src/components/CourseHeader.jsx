// src/components/CourseHeader.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CourseHeader({ course }) {
  return (
    <Box sx={{ mb:0  }}>
      {/*<Typography variant="h6" component="div">*/}
      {/*  {course.course_name_cn} / {course.course_name_en}*/}
      {/*</Typography>  {/*<Typography variant="h6" component="div">*/}
      {/*  {course.course_name_cn} / {course.course_name_en}*/}
      {/*</Typography>*/}
      <Typography variant="subtitle1" color="text.secondary">
         {course.credits}
      </Typography>
    </Box>
  );
}

export default CourseHeader;
