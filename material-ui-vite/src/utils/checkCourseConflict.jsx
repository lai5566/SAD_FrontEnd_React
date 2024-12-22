// src/utils/checkCourseConflict.js
export default function checkCourseConflict(newCourse, selectedCourses) {
    // 確保 newCourse 是物件且 selectedCourses 是陣列
    if (typeof newCourse !== 'object' || newCourse === null) {
        console.error("Invalid newCourse: must be a non-null object");
        return false;
    }
    if (!Array.isArray(selectedCourses)) {
        console.error("Invalid selectedCourses: must be an array");
        return false;
    }

    // 解析 newCourse 的星期和節次
    const newWeekdays = newCourse.weekday
        ? newCourse.weekday.split(',').map(w => parseInt(w.trim(), 10)).filter(w => !isNaN(w))
        : [];
    const newPeriods = newCourse.class_period
        ? newCourse.class_period.split(',').map(p => parseInt(p.trim(), 10)).filter(p => !isNaN(p))
        : [];

    if (newWeekdays.length === 0 || newPeriods.length === 0) {
        console.error("Invalid newCourse data:", newCourse);
        return false;
    }

    // 遍歷已選課程，檢查衝突
    for (const c of selectedCourses) {
        if (typeof c !== 'object' || c === null) {
            console.warn("Invalid course in selectedCourses:", c);
            continue;
        }

        const cWeekday = parseInt(c.weekday, 10);
        const cPeriods = c.class_period
            ? c.class_period.split(',').map(p => parseInt(p.trim(), 10)).filter(p => !isNaN(p))
            : [];

        if (isNaN(cWeekday) || cPeriods.length === 0) {
            console.warn("Invalid course data in selectedCourses:", c);
            continue;
        }

        if (newWeekdays.includes(cWeekday)) {
            const cPeriodsSet = new Set(cPeriods);
            const overlappingPeriods = newPeriods.filter(p => cPeriodsSet.has(p));
            if (overlappingPeriods.length > 0) {
                console.warn(`Conflict found: New course has overlapping periods ${overlappingPeriods} on weekday ${cWeekday}`);
                return true; // 有衝突
            }
        }
    }
    return false; // 沒有衝突
}
