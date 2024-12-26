import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CourseStatistics({ location }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary">
        授課地點: {location || '待定'}
      </Typography>
    </Box>
  );
}

export default CourseStatistics;
