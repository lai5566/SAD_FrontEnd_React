import { useContext, useMemo } from 'react';
import CourseContext from './CourseContext';

// 這個Hook提供一個方便的介面給UI層取用課程資料與操作
export function useCourseData() {
  const { allCourses, selectedCourses, addCourses, removeCourse, refreshAllCourses, refreshSelectedCourses } = useContext(CourseContext);

  // 篩選與處理資料的函式可寫在這裡，或在UI組件直接使用allCourses過濾

  return {
    allCourses,
    selectedCourses,
    addCourses,
    removeCourse,
    refreshAllCourses,
    refreshSelectedCourses,
  };
}
