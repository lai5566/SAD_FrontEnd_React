import React, { useState } from 'react';
import {  Box } from '@mui/material';
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import Grid from '@mui/material/Grid2';
const timeslots = Array.from({ length: 14 }, (_, i) => `第${i + 1}節`);

function EmptyScheduleGrid() {
  const [selectedCells, setSelectedCells] = useState({});

  const handleCellClick = (dayIndex, timeIndex) => {
    const key = `${dayIndex}-${timeIndex}`;
    setSelectedCells(prevSelectedCells => ({
      ...prevSelectedCells,
      [key]: !prevSelectedCells[key]
    }));
  };


  const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '85%',
    },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px', ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    })
}));
  const renderCell = (dayIndex, timeIndex) => {
    const key = `${dayIndex}-${timeIndex}`;
    const isSelected = selectedCells[key];

    return (
      <Grid
        item
        xs={1}
        key={key}
        onClick={() => handleCellClick(dayIndex, timeIndex)}
        style={{
          padding: 16,
          border: '1px solid black',
          backgroundColor: isSelected ? 'lightblue' : 'white',


          width: '100%',  // 確保格子寬度一致
          height: '60px',  // 固定高度，保持整齊
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
      </Grid>
    );
  };

  return (
      <Card><Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0} columns={8}>

        {/* 第一行標題 */}
        <Grid item xs={1}></Grid>
        {['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'].map((day, index) => (
          <Grid item xs={1} key={index} style={{ padding: 16, fontWeight: 'bold', textAlign: 'center', border: '1px solid black', height: '60px' }}>
            {day}
          </Grid>
        ))}

        {/* 時間表格 */}
        {timeslots.map((slot, timeIndex) => (
          <React.Fragment key={timeIndex}>
            <Grid item xs={1} style={{ padding: 16, fontWeight: 'bold', textAlign: 'center', border: '1px solid black', height: '60px' }}>
              {slot}
            </Grid>
            {Array.from({ length: 7 }).map((_, dayIndex) => renderCell(dayIndex, timeIndex))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
      </Card>

  );
}

export default EmptyScheduleGrid;
