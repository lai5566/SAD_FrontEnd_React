// src/components/CourseInstructors.jsx
import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function CourseInstructors({ instructors }) {
  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>
        授課教師:
      </Typography>
      <Stack direction="row" spacing={1}>
        {instructors.map((name) => (
          <Chip key={name.trim()} label={name.trim()} size="small" />
        ))}
      </Stack>
    </div>
  );
}

export default CourseInstructors;
