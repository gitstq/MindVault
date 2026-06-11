<p align="center">
  <img src="assets/logo.svg" width="120" alt="MindVault Logo">
</p>

<h1 align="center">MindVault</h1>

<p align="center">
  <b>輕量級 Markdown 知識庫桌面管理工具</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/版本-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/授權-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/平台-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg" alt="Platform">
  <img src="https://img.shields.io/badge/Electron-36.2.0-47848F?logo=electron&logoColor=white" alt="Electron">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
</p>

---

## 🎉 專案介紹

**MindVault** 是一款現代、輕量級的桌面應用程式，專為需要優雅高效地管理基於 Markdown 的知識庫的開發者、寫作者和知識工作者設計。

靈感來源於熱門專案 [Tolaria](https://github.com/refactoringhq/tolaria)，MindVault 的差異化優勢在於：
- ⚡ **極速效能** - 最小資源占用
- 🔍 **智慧模糊搜尋** - 瞬間找到任何內容
- 🔗 **內建 Git 同步** - 為知識庫提供版本控制
- 🎨 **精美現代 UI** - 支援深色/淺色主題

---

## ✨ 核心特性

| 特性 | 描述 |
|---------|-------------|
| 📝 **Markdown 編輯器** | 功能齊全的編輯器，支援即時預覽、分欄視圖和編輯模式 |
| 🌳 **檔案樹** | 支援展開/摺疊的層級導航 |
| 🔍 **模糊搜尋** | 基於 Fuse.js 的極速全文搜尋 |
| 🏷️ **標籤系統** | 使用自訂標籤組織筆記（即將推出）|
| 🌙 **主題切換** | 無縫深色/淺色模式切換 |
| 🔗 **Git 整合** | 一鍵同步您的 Git 倉庫 |
| 💾 **自動儲存** | 自動儲存，永不遺失工作成果 |
| 🖥️ **跨平台** | 支援 Windows、macOS 和 Linux |

---

## 🚀 快速開始

### 環境要求
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git（可選，用於同步功能）

### 安裝

```bash
# 克隆倉庫
git clone https://github.com/gitstq/MindVault.git
cd MindVault

# 安裝依賴
npm install
cd renderer && npm install && cd ..

# 啟動開發模式
npm run dev
```

### 生產構建

```bash
# 為當前平台構建
npm run build

# 為指定平台構建
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

---

## 📖 詳細使用指南

### 開啟工作區

1. 啟動 MindVault
2. 點擊 **"選擇資料夾"** 或拖放資料夾
3. 選擇您的 Markdown 知識庫目錄

### 建立筆記

- 點擊側邊欄中的 **"新增筆記"**
- 使用快捷鍵 `Ctrl+N`（macOS 上為 `Cmd+N`）
- 筆記自動儲存為 `.md` 檔案

### 搜尋

- 在側邊欄頂部的搜尋框中輸入
- 結果即時更新，支援模糊匹配
- 點擊任意結果即可立即開啟

### Git 同步

- 點擊側邊欄中的 Git 圖示進行拉取和推送
- 使用 `Ctrl+Shift+S` 快速同步
- 使用 `Ctrl+Shift+C` 提交並推送

### 主題切換

- 點擊側邊欄中的太陽/月亮圖示
- 您的偏好設定會自動儲存

---

## 💡 設計思路與迭代規劃

### 為什麼選擇 MindVault？

我們相信知識管理應該是：
- **簡單** - 無需複雜設定，只需開啟資料夾
- **快速** - 即時搜尋，流暢編輯
- **開放** - 您的資料以純 Markdown 檔案儲存
- **整合** - Git 同步讓一切都有版本記錄

### 路線圖

- [ ] AI 智慧標籤建議
- [ ] 全文內容搜尋（不僅是檔案名）
- [ ] 筆記連結與圖譜視圖
- [ ] 匯出為 PDF/HTML
- [ ] 外掛系統
- [ ] 雲端同步選項

---

## 📦 打包與部署

### Electron Builder 配置

專案使用 `electron-builder` 進行跨平台打包：

```json
{
  "build": {
    "appId": "com.mindvault.app",
    "productName": "MindVault",
    "mac": { "target": "dmg" },
    "win": { "target": "nsis" },
    "linux": { "target": "AppImage" }
  }
}
```

### CI/CD

可以新增 GitHub Actions 工作流，在推送時自動構建。

---

## 🤝 貢獻指南

我們歡迎貢獻！請按照以下步驟操作：

1. Fork 本倉庫
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的變更 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

---

## 📄 開源協議

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案。

---

## 🙏 致謝

- 靈感來源於 [Tolaria](https://github.com/refactoringhq/tolaria)
- 基於 [Electron](https://www.electronjs.org/)、[React](https://react.dev/) 和 [Tailwind CSS](https://tailwindcss.com/) 構建
- Markdown 編輯由 [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor) 提供支援

---

<p align="center">
  用 ❤️ 由 MindVault 團隊製作
</p>
