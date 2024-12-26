import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function CourseTags({ courseType }) {
  const typeColorMapping = {
    '專業必修(系所)': 'error',
    '專業選修(系所)': 'warning',
    '通識必修(通識)': 'info',
    '通識選修(通識)': 'success',
  };

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      <Chip label={courseType} color={typeColorMapping[courseType] || 'default'} size="small" />
    </Stack>
  );
}

export default CourseTags;
