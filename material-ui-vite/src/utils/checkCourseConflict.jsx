export default function checkCourseConflict(newCourse, selectedCourses) {
    // 防呆檢查：確保 newCourse 的屬性存在
    const newWeekday = newCourse?.weekday ? Number(newCourse.weekday.trim()) : null;
    const newPeriods = newCourse?.class_period
        ? newCourse.class_period.split(',').map(p => Number(p.trim()))
        : [];

    if (newWeekday === null || newPeriods.length === 0) {
        console.error("Invalid newCourse data:", newCourse);
        return false; // 避免程式崩潰
    }

    for (const c of selectedCourses) {
        // 防呆檢查：確保 selectedCourses 的屬性存在
        const cWeekday = c?.weekday ? Number(c.weekday.trim()) : null;
        const cPeriods = c?.class_period
            ? c.class_period.split(',').map(p => Number(p.trim()))
            : [];

        if (cWeekday === null || cPeriods.length === 0) {
            console.warn("Invalid course data in selectedCourses:", c);
            continue; // 跳過不完整的課程資料
        }

        if (cWeekday === newWeekday) {
            if (newPeriods.some(p => cPeriods.includes(p))) {
                return true; // 有衝突
            }
        }
    }
    return false; // 沒有衝突
}
