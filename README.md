
# 📂 專案結構
以下為專案的目錄和主要檔案說明：
```
├── App.jsx // 應用程式的主要組件
├── Copyright.jsx // 版權宣告
├── ProTip.jsx // 顯示提示訊息
├── ProtectedRoute.jsx // 保護性路由，檢查使用者登入狀態
├── api
│   ├── axiosInstance.jsx // Axios 統一設定與攔截器
│   └── coursesApi.jsx // 課程相關 API 函式
├── components
│   ├── AccountMenu.jsx // 帳號設定功能表
│   ├── ChangePasswordModal.jsx // 修改密碼彈窗
│   ├── CourseDataGrid.jsx // 課程資料表格
│   ├── CourseDescription.jsx // 課程說明內容
│   ├── CourseDetailModal.jsx // 顯示課程詳細資訊的彈窗
│   ├── CourseHeader.jsx // 課程標題與資訊
│   ├── CourseInstructors.jsx // 課程講師資訊
│   ├── CourseStatistics.jsx // 課程統計數據
│   ├── CourseTags.jsx // 課程標籤
│   ├── DragSelectScheduleWithMenu.jsx // 拖曳選課功能
│   ├── SchedulePieChart.jsx // 課程分佈圓餅圖
│   └── SelectedCoursesPanel.jsx // 已選課程面板
├── dataLayer
│   ├── CourseContext.jsx // 提供課程全域狀態的 Context
│   ├── CourseProvider.jsx // 包裝 Context 的 Provider 組件
│   └── useCourseData.jsx // 自訂 Hook，與 CourseContext 互動
├── deprecated
│   ├── App.jsx // 舊版本 App
│   ├── CourseDataGrid.jsx // 舊版本課程表格
│   ├── DragSelectScheduleWithMenu.jsx // 舊版本拖曳選課
│   ├── EmptyScheduleGrid.jsx // 舊版本空課表
│   ├── EmptyScheduleTable.jsx // 舊版本空課表 (表格形式)
│   ├── Tableand.jsx // 舊檔
│   ├── bar.jsx // 舊檔
│   └── ip_settings.jsx // 舊檔
├── main.jsx // React 應用程式的進入點
├── pages
│   └── SchedulePage.jsx // 主要排課頁面
├── shared-theme
│   ├── AppTheme.jsx // 全站主題設定
│   ├── ColorModeIconDropdown.jsx // 切換深淺色模式的下拉選單 (Icon)
│   ├── ColorModeSelect.jsx // 切換深淺色模式的下拉選單 (Select)
│   ├── customizations
│   │   ├── dataDisplay.jsx // UI 客製化 (資料顯示)
│   │   ├── feedback.jsx // UI 客製化 (回饋元件)
│   │   ├── inputs.jsx // UI 客製化 (輸入元件)
│   │   ├── navigation.jsx // UI 客製化 (導覽元件)
│   │   └── surfaces.jsx // UI 客製化 (卡片、面板等)
│   └── themePrimitives.jsx // 主題的基本變數與色票
├── sign-in
│   ├── CustomIcons.jsx // 自訂 Icon
│   ├── ForgotPassword.jsx // 忘記密碼頁面
│   ├── ResetPassword.jsx // 重設密碼頁面
│   └── SignIn.jsx // 登入頁面
├── sign-up
│   ├── CustomIcons.jsx // 自訂 Icon
│   ├── SignUp.jsx // 註冊頁面
│   ├── TemplateFrame.jsx // 註冊頁的 Layout
│   ├── ToggleColorMode.jsx // 切換深淺色模式按鈕
│   ├── getSignUpTheme.jsx // 註冊頁的主題
│   └── theme
│       ├── customizations
│       │   ├── dataDisplay.jsx // UI 客製化 (資料顯示)
│       │   ├── feedback.jsx // UI 客製化 (回饋元件)
│       │   ├── index.jsx // 匯出組合
│       │   ├── inputs.jsx // UI 客製化 (輸入元件)
│       │   ├── navigation.jsx // UI 客製化 (導覽元件)
│       │   └── surfaces.jsx // UI 客製化 (卡片、面板等)
│       ├── getSignUpTheme.jsx // 建立註冊頁專用主題
│       └── themePrimitives.jsx // 主題基礎設定
├── theme.js // 全站或預設主題設定
└── utils
    └── checkCourseConflict.jsx // 檢查課程時間衝突的函式


```
# 🛠️ 安裝與執行
### 1.克隆專案
```
git clone https://github.com/lai5566/SAD_FrontEnd_React.git
cd SAD_FrontEnd_React
cd material-ui-vite
```
### 2.安裝依賴
```
npm install
```
### 3.啟動本地開發環境
```
npm run dev
```


