import axiosInstance from './axiosInstance';

export async function fetchAllCourses() {
  const response = await axiosInstance.get('/sc/api/courses/');
  return response.data; // 假設後端回傳陣列型態的課程資料
}

export async function addStudentCourse(courseId) {
  const response = await axiosInstance.post('/sc/api/student-courses/', { course: courseId });
  return response.data; // 返回新增的 studentCourse 資料
}

export async function removeStudentCourse(studentCourseId) {
  const response = await axiosInstance.delete(`/sc/api/student-courses/${studentCourseId}/`);
  return response.data;
}

export async function fetchStudentCourses() {
  // 假設後端有提供取得使用者已選課程列表的API
  const response = await axiosInstance.get('/sc/api/student-courses/');
  return response.data; // 返回使用者已選的課程列表
}
