# Todo App - Electron Learning Project

A simple Electron application built for learning purposes. This project was created to gain hands-on experience with Electron.js before working with it in a professional setting.

## Purpose

This is a **very basic application** intended solely for learning Electron concepts including:
- Main and Renderer process architecture
- IPC (Inter-Process Communication)
- Preload scripts and context isolation
- Building and packaging Electron apps

## What is Electron?

[Electron](https://www.electronjs.org/) is an open-source framework developed by GitHub that allows you to build **cross-platform desktop applications** using web technologies (HTML, CSS, and JavaScript/TypeScript).

### Key Concepts

| Component | Description |
|-----------|-------------|
| **Main Process** | The entry point of your app. Runs in a Node.js environment. Manages windows and system APIs. |
| **Renderer Process** | The web page(s) displayed in windows. Runs in a Chromium environment. |
| **Preload Script** | A bridge that runs before the renderer, allowing safe communication between main and renderer. |
| **IPC** | Communication channel between processes using `ipcMain` and `ipcRenderer`. |

## Tech Stack

### Core Framework
- **[Electron](https://www.electronjs.org/)** - Cross-platform desktop app framework

### Build Tools
- **[Electron Forge](https://www.electronforge.io/)** - Complete tool for creating, publishing, and installing Electron applications
  - `@electron-forge/cli` - CLI interface
  - `@electron-forge/plugin-vite` - Vite integration for fast builds
  - `@electron-forge/maker-*` - Various packaging makers (Squirrel, ZIP, DEB, RPM)

### Bundler
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling with instant HMR
  - Handles TypeScript, bundling, and dev server

### Language
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript for better developer experience

### Utilities
- **[electron-squirrel-startup](https://www.npmjs.com/package/electron-squirrel-startup)** - Handles Windows installer events (shortcuts on install/uninstall)

## Project Structure

```
├── src/
│   ├── main.ts          # Main process (Node.js) - window management, system APIs
│   ├── preload.ts       # Preload script - safe bridge between main & renderer
│   ├── renderer.ts        # Renderer process (Chromium) - UI logic
│   ├── index.css          # Styles
│   └── vite-env.d.ts     # TypeScript declarations for Vite
├── index.html            # HTML entry point for renderer
├── package.json          # App config and dependencies
├── tsconfig.json         # TypeScript configuration
├── forge.config.cjs      # Electron Forge configuration
└── vite.*.config.mjs     # Vite configs for each process
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

This launches the app in development mode with hot reload.

### Build & Package

```bash
# Package without distributing
npm run package

# Create distributables for current platform
npm run make
```

## Architecture Overview

```
┌─────────────────────────────────────────┐
│           Main Process (Node.js)        │
│  - Creates BrowserWindow                │
│  - System access (files, notifications) │
│  - ipcMain for receiving messages       │
└────────────┬────────────────────────────┘
             │
             │ creates
             ▼
┌─────────────────────────────────────────┐
│  BrowserWindow                          │
│  ┌─────────────────────────────────┐  │
│  │     Preload Script               │  │
│  │  - Runs before renderer         │  │
│  │  - Safe bridge via contextBridge│  │
│  └──────────┬──────────────────────┘  │
│             │                          │
│             │ exposes                   │
│             ▼                          │
│  ┌─────────────────────────────────┐  │
│  │     Renderer Process            │  │
│  │  - Chromium environment         │  │
│  │  - UI, DOM, user interactions   │  │
│  │  - ipcRenderer for sending msgs │  │
│  └─────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Security

This project follows Electron's security best practices:
- **Context Isolation** enabled (default in modern Electron)
- **Preload script** used for safe communication
- **No `nodeIntegration`** in renderer (keeps renderer secure)

## Resources for Learning

- [Electron Documentation](https://www.electronjs.org/docs/latest/)
- [Electron Forge Guide](https://www.electronforge.io/)
- [Electron Security Best Practices](https://www.electronjs.org/docs/latest/tutorial/security)
- [Vite Documentation](https://vitejs.dev/guide/)

## Disclaimer

This is a learning project with minimal functionality. It is not intended for production use. The app currently displays a simple "Hello World" message to demonstrate a working Electron + TypeScript + Vite setup.

---

Created for learning purposes while preparing for professional Electron development work.
