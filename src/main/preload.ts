import { contextBridge, ipcRenderer } from 'electron';

export interface FileItem {
  name: string;
  isDirectory: boolean;
  path: string;
}

export interface API {
  readFile: (filePath: string) => Promise<{ success: boolean; content?: string; error?: string }>;
  writeFile: (filePath: string, content: string) => Promise<{ success: boolean; error?: string }>;
  deleteFile: (filePath: string) => Promise<{ success: boolean; error?: string }>;
  createFile: (dirPath: string, fileName: string) => Promise<{ success: boolean; filePath?: string; error?: string }>;
  createDirectory: (parentPath: string, dirName: string) => Promise<{ success: boolean; dirPath?: string; error?: string }>;
  listDirectory: (dirPath: string) => Promise<{ success: boolean; items?: FileItem[]; error?: string }>;
  gitSync: (workspacePath: string) => Promise<{ success: boolean; output?: string; error?: string }>;
  gitCommitPush: (workspacePath: string, message: string) => Promise<{ success: boolean; error?: string }>;
  getAppVersion: () => Promise<string>;
  onWorkspaceOpened: (callback: (path: string) => void) => void;
  onMenuNewNote: (callback: () => void) => void;
  onGitSync: (callback: () => void) => void;
  onGitCommitPush: (callback: () => void) => void;
  removeAllListeners: (channel: string) => void;
}

const api: API = {
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath: string, content: string) => ipcRenderer.invoke('write-file', filePath, content),
  deleteFile: (filePath: string) => ipcRenderer.invoke('delete-file', filePath),
  createFile: (dirPath: string, fileName: string) => ipcRenderer.invoke('create-file', dirPath, fileName),
  createDirectory: (parentPath: string, dirName: string) => ipcRenderer.invoke('create-directory', parentPath, dirName),
  listDirectory: (dirPath: string) => ipcRenderer.invoke('list-directory', dirPath),
  gitSync: (workspacePath: string) => ipcRenderer.invoke('git-sync', workspacePath),
  gitCommitPush: (workspacePath: string, message: string) => ipcRenderer.invoke('git-commit-push', workspacePath, message),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  onWorkspaceOpened: (callback: (path: string) => void) => {
    ipcRenderer.on('workspace-opened', (_, path) => callback(path));
  },
  onMenuNewNote: (callback: () => void) => {
    ipcRenderer.on('menu-new-note', () => callback());
  },
  onGitSync: (callback: () => void) => {
    ipcRenderer.on('git-sync', () => callback());
  },
  onGitCommitPush: (callback: () => void) => {
    ipcRenderer.on('git-commit-push', () => callback());
  },
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
};

contextBridge.exposeInMainWorld('electronAPI', api);

// API type is already exported as interface above
