import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

function CourseDescription({ course }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" gutterBottom>
        {course.course_summary_cn}
      </Typography>
      <Divider />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        備註: {course.notes}
      </Typography>
    </Box>
  );
}

export default CourseDescription;
