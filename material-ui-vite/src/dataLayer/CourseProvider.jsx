// src/dataLayer/CourseProvider.jsx
import React, { useState, useEffect, useCallback } from 'react';
import CourseContext from './CourseContext';
import { fetchAllCourses, fetchStudentCourses, addStudentCourse, removeStudentCourse } from '../api/coursesApi';

function CourseProvider({ children }) {
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 載入所有課程
  const loadAllCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const courses = await fetchAllCourses();
      setAllCourses(courses);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch all courses:', error);
      setError('無法載入所有課程資料');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 載入使用者已選課程
  const loadSelectedCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const studentCourses = await fetchStudentCourses();
      setSelectedCourses(studentCourses);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch student courses:', error);
      setError('無法載入已選課程資料');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllCourses();
    loadSelectedCourses();
  }, [loadAllCourses, loadSelectedCourses]);

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
    isLoading,
    error,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export default CourseProvider;
