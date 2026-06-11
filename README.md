<p align="center">
  <img src="assets/logo.svg" width="120" alt="MindVault Logo">
</p>

<h1 align="center">MindVault</h1>

<p align="center">
  <b>A lightweight desktop app for managing markdown knowledge bases</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg" alt="Platform">
  <img src="https://img.shields.io/badge/Electron-36.2.0-47848F?logo=electron&logoColor=white" alt="Electron">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
</p>

---

## 🎉 Project Introduction

**MindVault** is a modern, lightweight desktop application designed for developers, writers, and knowledge workers who want to manage their markdown-based knowledge bases with elegance and efficiency.

Inspired by the trending project [Tolaria](https://github.com/refactoringhq/tolaria), MindVault differentiates itself through:
- ⚡ **Lightning-fast performance** - Minimal resource footprint
- 🔍 **Smart fuzzy search** - Find anything instantly
- 🔗 **Built-in Git sync** - Version control your knowledge
- 🎨 **Beautiful modern UI** - Dark/light theme support

---

## ✨ Core Features

| Feature | Description |
|---------|-------------|
| 📝 **Markdown Editor** | Full-featured editor with live preview, split view, and edit modes |
| 🌳 **File Tree** | Hierarchical navigation with expand/collapse support |
| 🔍 **Fuzzy Search** | Lightning-fast full-text search powered by Fuse.js |
| 🏷️ **Tag System** | Organize notes with custom tags (coming soon) |
| 🌙 **Theme Switching** | Seamless dark/light mode toggle |
| 🔗 **Git Integration** | One-click sync with your Git repository |
| 💾 **Auto Save** | Never lose your work with automatic saving |
| 🖥️ **Cross-Platform** | Windows, macOS, and Linux support |

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git (optional, for sync feature)

### Installation

```bash
# Clone the repository
git clone https://github.com/gitstq/MindVault.git
cd MindVault

# Install dependencies
npm install
cd renderer && npm install && cd ..

# Start development mode
npm run dev
```

### Build for Production

```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

---

## 📖 Detailed Usage Guide

### Opening a Workspace

1. Launch MindVault
2. Click **"Choose Folder"** or drag & drop a folder
3. Select your markdown knowledge base directory

### Creating Notes

- Click **"New Note"** in the sidebar
- Use keyboard shortcut `Ctrl+N` (or `Cmd+N` on macOS)
- Notes are automatically saved as `.md` files

### Searching

- Type in the search box at the top of the sidebar
- Results update in real-time with fuzzy matching
- Click any result to open it instantly

### Git Sync

- Click the Git icon in the sidebar to pull & push
- Use `Ctrl+Shift+S` for quick sync
- Use `Ctrl+Shift+C` to commit & push

### Theme Toggle

- Click the sun/moon icon in the sidebar
- Your preference is automatically saved

---

## 💡 Design Philosophy & Roadmap

### Why MindVault?

We believe knowledge management should be:
- **Simple** - No complex setup, just open a folder
- **Fast** - Instant search, smooth editing
- **Open** - Your data stays in plain markdown files
- **Integrated** - Git sync keeps everything versioned

### Roadmap

- [ ] AI-powered tag suggestions
- [ ] Full-text content search (not just filenames)
- [ ] Note linking & graph view
- [ ] Export to PDF/HTML
- [ ] Plugin system
- [ ] Cloud sync options

---

## 📦 Packaging & Deployment

### Electron Builder Configuration

The project uses `electron-builder` for cross-platform packaging:

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

GitHub Actions workflow can be added for automated builds on push.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guide](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [Tolaria](https://github.com/refactoringhq/tolaria)
- Built with [Electron](https://www.electronjs.org/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/)
- Markdown editing powered by [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor)

---

<p align="center">
  Made with ❤️ by the MindVault Team
</p>
