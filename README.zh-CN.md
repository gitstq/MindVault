<p align="center">
  <img src="assets/logo.svg" width="120" alt="MindVault Logo">
</p>

<h1 align="center">MindVault</h1>

<p align="center">
  <b>轻量级 Markdown 知识库桌面管理工具</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/版本-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/许可证-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/平台-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg" alt="Platform">
  <img src="https://img.shields.io/badge/Electron-36.2.0-47848F?logo=electron&logoColor=white" alt="Electron">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
</p>

---

## 🎉 项目介绍

**MindVault** 是一款现代、轻量级的桌面应用程序，专为需要优雅高效地管理基于 Markdown 的知识库的开发者、写作者和知识工作者设计。

灵感来源于热门项目 [Tolaria](https://github.com/refactoringhq/tolaria)，MindVault 的差异化优势在于：
- ⚡ **极速性能** - 最小资源占用
- 🔍 **智能模糊搜索** - 瞬间找到任何内容
- 🔗 **内置 Git 同步** - 为知识库提供版本控制
- 🎨 **精美现代 UI** - 支持深色/浅色主题

---

## ✨ 核心特性

| 特性 | 描述 |
|---------|-------------|
| 📝 **Markdown 编辑器** | 功能齐全的编辑器，支持实时预览、分栏视图和编辑模式 |
| 🌳 **文件树** | 支持展开/折叠的层级导航 |
| 🔍 **模糊搜索** | 基于 Fuse.js 的极速全文搜索 |
| 🏷️ **标签系统** | 使用自定义标签组织笔记（即将推出）|
| 🌙 **主题切换** | 无缝深色/浅色模式切换 |
| 🔗 **Git 集成** | 一键同步您的 Git 仓库 |
| 💾 **自动保存** | 自动保存，永不丢失工作成果 |
| 🖥️ **跨平台** | 支持 Windows、macOS 和 Linux |

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git（可选，用于同步功能）

### 安装

```bash
# 克隆仓库
git clone https://github.com/gitstq/MindVault.git
cd MindVault

# 安装依赖
npm install
cd renderer && npm install && cd ..

# 启动开发模式
npm run dev
```

### 生产构建

```bash
# 为当前平台构建
npm run build

# 为指定平台构建
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

---

## 📖 详细使用指南

### 打开工作区

1. 启动 MindVault
2. 点击 **"选择文件夹"** 或拖放文件夹
3. 选择您的 Markdown 知识库目录

### 创建笔记

- 点击侧边栏中的 **"新建笔记"**
- 使用快捷键 `Ctrl+N`（macOS 上为 `Cmd+N`）
- 笔记自动保存为 `.md` 文件

### 搜索

- 在侧边栏顶部的搜索框中输入
- 结果实时更新，支持模糊匹配
- 点击任意结果即可立即打开

### Git 同步

- 点击侧边栏中的 Git 图标进行拉取和推送
- 使用 `Ctrl+Shift+S` 快速同步
- 使用 `Ctrl+Shift+C` 提交并推送

### 主题切换

- 点击侧边栏中的太阳/月亮图标
- 您的偏好设置会自动保存

---

## 💡 设计思路与迭代规划

### 为什么选择 MindVault？

我们相信知识管理应该是：
- **简单** - 无需复杂设置，只需打开文件夹
- **快速** - 即时搜索，流畅编辑
- **开放** - 您的数据以纯 Markdown 文件保存
- **集成** - Git 同步让一切都有版本记录

### 路线图

- [ ] AI 智能标签建议
- [ ] 全文内容搜索（不仅是文件名）
- [ ] 笔记链接与图谱视图
- [ ] 导出为 PDF/HTML
- [ ] 插件系统
- [ ] 云同步选项

---

## 📦 打包与部署

### Electron Builder 配置

项目使用 `electron-builder` 进行跨平台打包：

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

可以添加 GitHub Actions 工作流，在推送时自动构建。

---

## 🤝 贡献指南

我们欢迎贡献！请按照以下步骤操作：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

---

## 📄 开源协议

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- 灵感来源于 [Tolaria](https://github.com/refactoringhq/tolaria)
- 基于 [Electron](https://www.electronjs.org/)、[React](https://react.dev/) 和 [Tailwind CSS](https://tailwindcss.com/) 构建
- Markdown 编辑由 [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor) 提供支持

---

<p align="center">
  用 ❤️ 由 MindVault 团队制作
</p>
