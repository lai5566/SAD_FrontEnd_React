// src/shared-theme/customizations/feedback.js

import { alpha } from '@mui/material/styles';
import { gray, orange } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations = {
  MuiAlert: {
    styleOverrides: {
      // root: ({ theme }) => ({
      //   borderRadius: 10,
      //   // 移除固定的背景顏色
      //   // backgroundColor: orange[100],
      //   // color: (theme.vars || theme).palette.text.primary,
      //   // border: `1px solid ${alpha(orange[300], 0.5)}`,
      //   '& .MuiAlert-icon': {
      //     // color: orange[500],
      //   },
      //   // ...theme.applyStyles('dark', {
      //   //   // 移除固定的背景顏色
      //   //   // backgroundColor: `${alpha(orange[900], 0.5)}`,
      //   //   border: `1px solid ${alpha(orange[800], 0.5)}`,
      //   // }),
      // }),
      // 針對不同 severity 進行自定義
      standardSuccess: {
        borderColor: (theme) => theme.palette.success.main,
        '& .MuiAlert-icon': {
          color: (theme) => theme.palette.success.main,
        },
      },
      standardError: {
        borderColor: (theme) => theme.palette.error.main,
        '& .MuiAlert-icon': {
          color: (theme) => theme.palette.error.main,
        },
      },
      standardWarning: {
        borderColor: (theme) => theme.palette.warning.main,
        '& .MuiAlert-icon': {
          color: (theme) => theme.palette.warning.main,
        },
      },
      standardInfo: {
        borderColor: (theme) => theme.palette.info.main,
        '& .MuiAlert-icon': {
          color: (theme) => theme.palette.info.main,
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
};
