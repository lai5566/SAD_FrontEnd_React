// src/dataLayer/useCourseData.jsx
import { useContext } from 'react';
import CourseContext from './CourseContext';

// 這個Hook提供一個方便的介面給UI層取用課程資料與操作
export function useCourseData() {
  const { allCourses, selectedCourses, addCourses, removeCourse, refreshAllCourses, refreshSelectedCourses, isLoading, error } = useContext(CourseContext);

  return {
    allCourses,
    selectedCourses,
    addCourses,
    removeCourse,
    refreshAllCourses,
    refreshSelectedCourses,
    isLoading,
    error,
  };
}
