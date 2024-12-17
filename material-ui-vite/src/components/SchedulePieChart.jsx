import React, { useMemo } from 'react';
import { useCourseData } from '../dataLayer/useCourseData';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, Typography } from '@mui/material';

function SchedulePieChart() {
  const { allCourses, selectedCourses } = useCourseData();

  // 計算學分分佈
  const { pieData, totalCredits } = useMemo(() => {
    const counts = {
      '通識必修': 0,
      '通識選修': 0,
      '專業必修': 0,
      '專業選修': 0,
    };
    let total = 0;
    selectedCourses.forEach(sc => {
      const course = allCourses.find(c => c.id === sc.course);
      if (course) {
        const type = course.course_type ? course.course_type.replace(/\(.*\)/, '').trim() : '未知';
        if (counts[type] !== undefined) {
          counts[type] += course.credits || 0;
        }
        total += course.credits || 0;
      }
    });

    const pieData = [
      { value: counts['通識必修'], label: '通識必修' },
      { value: counts['通識選修'], label: '通識選修' },
      { value: counts['專業必修'], label: '專業必修' },
      { value: counts['專業選修'], label: '專業選修' },
    ];
    return { pieData, totalCredits: total };
  }, [allCourses, selectedCourses]);

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>選修學分</Typography>
      <PieChart series={[{ data: pieData, innerRadius: 80 }]} width={400} height={200}>
        <text
          x="50%"
          y="50%"
          fill="black"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
        >
          {totalCredits}
        </text>
      </PieChart>
    </Card>
  );
}

export default SchedulePieChart;
