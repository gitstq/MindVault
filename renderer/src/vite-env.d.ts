/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    readFile: (filePath: string) => Promise<{ success: boolean; content?: string; error?: string }>;
    writeFile: (filePath: string, content: string) => Promise<{ success: boolean; error?: string }>;
    deleteFile: (filePath: string) => Promise<{ success: boolean; error?: string }>;
    createFile: (dirPath: string, fileName: string) => Promise<{ success: boolean; filePath?: string; error?: string }>;
    createDirectory: (parentPath: string, dirName: string) => Promise<{ success: boolean; dirPath?: string; error?: string }>;
    listDirectory: (dirPath: string) => Promise<{ success: boolean; items?: Array<{ name: string; isDirectory: boolean; path: string }>; error?: string }>;
    gitSync: (workspacePath: string) => Promise<{ success: boolean; output?: string; error?: string }>;
    gitCommitPush: (workspacePath: string, message: string) => Promise<{ success: boolean; error?: string }>;
    getAppVersion: () => Promise<string>;
    onWorkspaceOpened: (callback: (path: string) => void) => void;
    onMenuNewNote: (callback: () => void) => void;
    onGitSync: (callback: () => void) => void;
    onGitCommitPush: (callback: () => void) => void;
    removeAllListeners: (channel: string) => void;
  };
}
