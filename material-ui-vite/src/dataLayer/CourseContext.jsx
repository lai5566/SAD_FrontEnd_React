import { createContext } from 'react';

// Context中可存放：
// allCourses: 所有課程資料 (後端取得一次並快取)
// selectedCourses: 使用者已選課程列表 (後端同步後顯示在UI)
// 還有存取與操作課程的方法，如 addCourses, removeCourse
const CourseContext = createContext({
  allCourses: [],
  selectedCourses: [],
  addCourses: () => {},
  removeCourse: () => {},
  refreshAllCourses: () => {},
  refreshSelectedCourses: () => {},
});

export default CourseContext;
