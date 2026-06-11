import { create } from 'zustand';

export interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
  isExpanded?: boolean;
}

interface WorkspaceState {
  workspacePath: string | null;
  fileTree: FileNode[];
  selectedFile: string | null;
  fileContent: string;
  isModified: boolean;
  searchQuery: string;
  searchResults: Array<{ item: FileNode; matches: Array<{ key: string; value: string }> }>;
  
  loadWorkspace: (path: string) => void;
  refreshFileTree: () => Promise<void>;
  selectFile: (path: string | null) => void;
  setFileContent: (content: string) => void;
  saveFile: () => Promise<void>;
  createFile: (parentPath: string, fileName: string) => Promise<void>;
  createDirectory: (parentPath: string, dirName: string) => Promise<void>;
  deleteItem: (path: string) => Promise<void>;
  toggleExpanded: (path: string) => void;
  setSearchQuery: (query: string) => void;
  setIsModified: (modified: boolean) => void;
}

const buildFileTree = async (dirPath: string): Promise<FileNode[]> => {
  if (!window.electronAPI) return [];
  
  const result = await window.electronAPI.listDirectory(dirPath);
  if (!result.success || !result.items) return [];

  const nodes: FileNode[] = [];
  
  for (const item of result.items) {
    const node: FileNode = {
      name: item.name,
      path: item.path,
      isDirectory: item.isDirectory,
      isExpanded: false,
    };

    if (item.isDirectory) {
      node.children = await buildFileTree(item.path);
    }

    nodes.push(node);
  }

  // Sort: directories first, then files, alphabetically
  return nodes.sort((a, b) => {
    if (a.isDirectory === b.isDirectory) {
      return a.name.localeCompare(b.name);
    }
    return a.isDirectory ? -1 : 1;
  });
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspacePath: null,
  fileTree: [],
  selectedFile: null,
  fileContent: '',
  isModified: false,
  searchQuery: '',
  searchResults: [],

  loadWorkspace: async (path: string) => {
    set({ workspacePath: path, fileTree: [] });
    await get().refreshFileTree();
  },

  refreshFileTree: async () => {
    const { workspacePath } = get();
    if (!workspacePath) return;
    
    const tree = await buildFileTree(workspacePath);
    set({ fileTree: tree });
  },

  selectFile: async (path: string | null) => {
    if (!path) {
      set({ selectedFile: null, fileContent: '', isModified: false });
      return;
    }

    if (window.electronAPI) {
      const result = await window.electronAPI.readFile(path);
      if (result.success && result.content !== undefined) {
        set({ selectedFile: path, fileContent: result.content, isModified: false });
      }
    }
  },

  setFileContent: (content: string) => {
    set({ fileContent: content, isModified: true });
  },

  saveFile: async () => {
    const { selectedFile, fileContent } = get();
    if (!selectedFile || !window.electronAPI) return;

    const result = await window.electronAPI.writeFile(selectedFile, fileContent);
    if (result.success) {
      set({ isModified: false });
    }
  },

  createFile: async (parentPath: string, fileName: string) => {
    if (!window.electronAPI) return;
    
    const result = await window.electronAPI.createFile(parentPath, fileName);
    if (result.success) {
      await get().refreshFileTree();
    }
  },

  createDirectory: async (parentPath: string, dirName: string) => {
    if (!window.electronAPI) return;
    
    const result = await window.electronAPI.createDirectory(parentPath, dirName);
    if (result.success) {
      await get().refreshFileTree();
    }
  },

  deleteItem: async (path: string) => {
    if (!window.electronAPI) return;
    
    const result = await window.electronAPI.deleteFile(path);
    if (result.success) {
      const { selectedFile } = get();
      if (selectedFile === path) {
        set({ selectedFile: null, fileContent: '', isModified: false });
      }
      await get().refreshFileTree();
    }
  },

  toggleExpanded: (path: string) => {
    set((state) => ({
      fileTree: toggleNodeExpanded(state.fileTree, path),
    }));
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    // Search will be handled by the component using fuse.js
  },

  setIsModified: (modified: boolean) => {
    set({ isModified: modified });
  },
}));

function toggleNodeExpanded(nodes: FileNode[], targetPath: string): FileNode[] {
  return nodes.map((node) => {
    if (node.path === targetPath) {
      return { ...node, isExpanded: !node.isExpanded };
    }
    if (node.children) {
      return { ...node, children: toggleNodeExpanded(node.children, targetPath) };
    }
    return node;
  });
}
