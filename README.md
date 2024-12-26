
# 📂 專案結構
以下為專案的目錄和主要檔案說明：
```
das_FrontEnd_React/
├── App_2.jsx                    # 主應用組件，設定路由與主界面
├── Copyright.jsx              # 版權聲明元件
├── CourseDataGrid.jsx         # 課程資料表格展示
├── EmptyScheduleGrid.jsx      # 空課表的格子顯示
├── EmptyScheduleTable.jsx     # 空課表的表格佈局
├── ProTip.jsx                 # 小提示元件
├── ProtectedRoute.jsx         # 路由保護邏輯 (如登入保護)
├── Tableand.jsx               # 可能是臨時或測試元件
├── api/
│   ├── axiosInstance.jsx      # Axios 實例設定 (攔截器等)
│   └── coursesApi.jsx         # 與課程相關的 API 請求邏輯
├── bar.jsx                    # (待補充功能)
├── components/
│   ├── CourseDataGrid.jsx                 # 課程資料展示表格 (重用元件)
│   ├── DragSelectScheduleWithMenu.jsx     # 可拖曳選擇課表的功能與選單
│   ├── SchedulePieChart.jsx               # 課程分佈圓餅圖
│   └── SelectedCoursesPanel.jsx           # 已選課程面板
├── dataLayer/
│   ├── CourseContext.jsx      # Context API：定義課程相關的狀態
│   ├── CourseProvider.jsx     # Context Provider：狀態供應者
│   └── useCourseData.jsx      # 自定義 Hook：處理課程相關邏輯
├── ip_settings.jsx            # 網路 IP 設定檔案
├── main.jsx                   # 專案入口檔案
├── old/                       # 舊版本或備份元件
│   └── DragSelectScheduleWithMenu.jsx
├── pages/
│   └── SchedulePage.jsx       # 課表頁面 (核心頁面)
├── shared-theme/              # 全域主題設定
│   ├── AppTheme.jsx
│   ├── ColorModeIconDropdown.jsx
│   ├── ColorModeSelect.jsx
│   ├── customizations/        # 主題的客製化設定
│   │   ├── dataDisplay.jsx
│   │   ├── feedback.jsx
│   │   ├── inputs.jsx
│   │   ├── navigation.jsx
│   │   └── surfaces.jsx
│   └── themePrimitives.jsx
├── sign-in/                   # 登入功能
│   ├── CustomIcons.jsx
│   ├── ForgotPassword.jsx
│   ├── ResetPassword.jsx
│   └── SignIn.jsx
├── sign-up/                   # 註冊功能
│   ├── CustomIcons.jsx
│   ├── SignUp.jsx
│   ├── TemplateFrame.jsx
│   ├── ToggleColorMode.jsx
│   ├── getSignUpTheme.jsx
│   └── theme/
│       ├── customizations/    # 主題的進一步客製化
│       ├── getSignUpTheme.jsx
│       └── themePrimitives.jsx
├── theme.js                   # 全域主題設定檔
└── utils/
    └── checkCourseConflict.jsx # 課程衝突檢查邏輯

```
# 🛠️ 安裝與執行
### 1.克隆專案
```
git clone https://github.com/lai5566/SAD_FrontEnd_React.git
cd das_FrontEnd_React
```
### 2.安裝依賴
```
npm install
```
### 3.啟動本地開發環境
```
npm run dev
```


