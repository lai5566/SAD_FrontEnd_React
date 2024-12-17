import React, { useState, useEffect, useCallback } from 'react';
import CourseContext from './CourseContext';
import { fetchAllCourses, fetchStudentCourses, addStudentCourse, removeStudentCourse } from '../api/coursesApi';

function CourseProvider({ children }) {
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // 載入所有課程
  const loadAllCourses = useCallback(async () => {
    try {
      const courses = await fetchAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error('Failed to fetch all courses:', error);
    }
  }, []);

  // 載入使用者已選課程
  const loadSelectedCourses = useCallback(async () => {
    try {
      const studentCourses = await fetchStudentCourses();
      setSelectedCourses(studentCourses);
    } catch (error) {
      console.error('Failed to fetch student courses:', error);
    }
  }, []);

  useEffect(() => {
    loadAllCourses();
    loadSelectedCourses();
  }, [loadAllCourses, loadSelectedCourses]);

// src/dataLayer/CourseProvider.jsx

// const addCourses = async (courses) => {
//   for (const course of courses) {
//     console.log('Adding course:', course); // 添加這行以檢查 course 對象
//     if (!course.course.id) {
//       console.error('Course does not have course.id:', course);
//       continue;
//     }
//
//     try {
//       const added = await addStudentCourse(course.course.id); // 傳遞 course_id
//       setSelectedCourses(prev => [...prev, added]);
//       console.log('Added course successfully:', added);
//     } catch (error) {
//       console.error('Failed to add course:', course.course.id, error.response ? error.response.data : error.message);
//     }
//   }
// };

const addCourses = async (courses) => {
  for (const course of courses) {
    console.log('Adding course:', course); // 檢查 course 對象

    if (!course.id) {
      console.error('Course does not have id:', course);
      continue;
    }

    try {
      const added = await addStudentCourse(course.id); // 傳遞 course.id
      setSelectedCourses(prev => [...prev, added]);
      console.log('Added course successfully:', added);
    } catch (error) {
      console.error('Failed to add course:', course.id, error.response ? error.response.data : error.message);
    }
  }
};

  const removeCourse = async (studentCourseId) => {
    try {
      await removeStudentCourse(studentCourseId);
      setSelectedCourses(prev => prev.filter(sc => sc.id !== studentCourseId));
    } catch (error) {
      console.error('Failed to remove student course:', error);
    }
  };

  const value = {
    allCourses,
    selectedCourses,
    addCourses,
    removeCourse,
    refreshAllCourses: loadAllCourses,
    refreshSelectedCourses: loadSelectedCourses,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export default CourseProvider;
