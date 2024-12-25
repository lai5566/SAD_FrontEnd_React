// src/components/CourseDetailModal.jsx
import React, { useMemo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useCourseData } from '../dataLayer/useCourseData';
import CourseDescription from './CourseDescription';
import CourseTags from './CourseTags';
import CourseInstructors from './CourseInstructors';
import CourseStatistics from './CourseStatistics';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

function CourseDetailModal({ courseId, open, onClose }) {
  const { t } = useTranslation();
  const { allCourses, isLoading, error, refreshAllCourses } = useCourseData();
  const course = useMemo(() => allCourses.find(c => c.id === courseId), [allCourses, courseId]);

  useEffect(() => {
    if (open && !course && !isLoading) {
      refreshAllCourses();
    }
  }, [open, course, isLoading, refreshAllCourses]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {isLoading ? (
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      ) : error ? (
        <DialogContent>
          <Typography color="error">{error}</Typography>
        </DialogContent>
      ) : course ? (
        <>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" color="text.primary">
                {course.course_name_cn}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                學分: {course.credits}
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <CourseDescription course={course} />
            <CourseTags courseType={course.course_type} />
            <CourseInstructors instructors={course.instructor_name.split(',')} />
            <CourseStatistics
              location={course.location}
            />
          </DialogContent>
          {/*<DialogActions>*/}
          {/*  <Button onClick={onClose} color="primary">*/}
          {/*    {t('close')}*/}
          {/*  </Button>*/}
          {/*  <Button startIcon={<EditIcon />} color="secondary">*/}
          {/*    {t('edit')}*/}
          {/*  </Button>*/}
          {/*  <Button startIcon={<FavoriteIcon />} color="secondary">*/}
          {/*    收藏*/}
          {/*  </Button>*/}
          {/*  <Button startIcon={<ShareIcon />} color="inherit">*/}
          {/*    分享*/}
          {/*  </Button>*/}
          {/*</DialogActions>*/}
        </>
      ) : (
        <DialogContent>
          <Typography>無相關課程資料。</Typography>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default CourseDetailModal;
