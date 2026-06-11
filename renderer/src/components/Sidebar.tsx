import { useState, useCallback, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  FolderOpen,
  Plus,
  FolderPlus,
  Trash2,
  Search,
  Sun,
  Moon,
  Save,
  GitBranch,
} from 'lucide-react';
import { useWorkspaceStore } from '../stores/workspaceStore';
import type { FileNode } from '../stores/workspaceStore';
import { useThemeStore } from '../stores/themeStore';
import Fuse from 'fuse.js';

function FileTreeItem({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const { selectedFile, selectFile, toggleExpanded, deleteItem } = useWorkspaceStore();
  const { isDark } = useThemeStore();
  const isSelected = selectedFile === node.path;

  const handleClick = () => {
    if (node.isDirectory) {
      toggleExpanded(node.path);
    } else {
      selectFile(node.path);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Delete "${node.name}"?`)) {
      await deleteItem(node.path);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 cursor-pointer group transition-colors ${
          isSelected
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            : isDark
            ? 'hover:bg-gray-800 text-gray-300'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
      >
        {node.isDirectory ? (
          node.isExpanded ? (
            <ChevronDown className="w-4 h-4 mr-1 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0" />
          )
        ) : (
          <span className="w-4 mr-1" />
        )}

        {node.isDirectory ? (
          node.isExpanded ? (
            <FolderOpen className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-500" />
          ) : (
            <Folder className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-500" />
          )
        ) : (
          <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-blue-400" />
        )}

        <span className="truncate text-sm flex-1">{node.name}</span>

        <button
          onClick={handleDelete}
          className={`opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-opacity ${
            isDark ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {node.isDirectory && node.isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeItem key={child.path} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { workspacePath, fileTree, createFile, createDirectory, isModified, saveFile } = useWorkspaceStore();
  const { isDark, toggleTheme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FileNode[]>([]);
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  // Flatten file tree for search
  const flattenTree = useCallback((nodes: FileNode[]): FileNode[] => {
    const result: FileNode[] = [];
    for (const node of nodes) {
      result.push(node);
      if (node.children) {
        result.push(...flattenTree(node.children));
      }
    }
    return result;
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const allFiles = flattenTree(fileTree).filter((n) => !n.isDirectory);
      const fuse = new Fuse(allFiles, {
        keys: ['name'],
        threshold: 0.4,
      });
      const results = fuse.search(searchQuery);
      setSearchResults(results.map((r) => r.item));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, fileTree, flattenTree]);

  const handleCreateFile = async () => {
    if (!newItemName.trim() || !workspacePath) return;
    const fileName = newItemName.endsWith('.md') ? newItemName : `${newItemName}.md`;
    await createFile(workspacePath, fileName);
    setNewItemName('');
    setShowNewFileInput(false);
  };

  const handleCreateFolder = async () => {
    if (!newItemName.trim() || !workspacePath) return;
    await createDirectory(workspacePath, newItemName);
    setNewItemName('');
    setShowNewFolderInput(false);
  };

  const handleGitSync = async () => {
    if (!workspacePath || !window.electronAPI) return;
    const result = await window.electronAPI.gitSync(workspacePath);
    if (result.success) {
      alert('Git sync completed!');
    } else {
      alert(`Git sync failed: ${result.error}`);
    }
  };

  return (
    <div className={`w-72 flex-shrink-0 flex flex-col border-r ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <span className={`font-semibold text-sm truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {workspacePath ? workspacePath.split('/').pop() : 'Workspace'}
        </span>
        <div className="flex items-center gap-1">
          {isModified && (
            <button onClick={saveFile} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-orange-500" title="Save">
              <Save className="w-4 h-4" />
            </button>
          )}
          <button onClick={handleGitSync} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-purple-500" title="Git Sync">
            <GitBranch className="w-4 h-4" />
          </button>
          <button onClick={toggleTheme} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className={`flex items-center px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Search className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bg-transparent text-sm flex-1 outline-none ${isDark ? 'text-gray-200 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'}`}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 px-3 pb-2">
        <button
          onClick={() => { setShowNewFileInput(true); setShowNewFolderInput(false); }}
          className={`flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
            isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          New Note
        </button>
        <button
          onClick={() => { setShowNewFolderInput(true); setShowNewFileInput(false); }}
          className={`flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
            isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <FolderPlus className="w-3.5 h-3.5" />
          New Folder
        </button>
      </div>

      {/* New item inputs */}
      {(showNewFileInput || showNewFolderInput) && (
        <div className="px-3 pb-2">
          <input
            type="text"
            autoFocus
            placeholder={showNewFileInput ? 'Note name...' : 'Folder name...'}
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                showNewFileInput ? handleCreateFile() : handleCreateFolder();
              } else if (e.key === 'Escape') {
                setShowNewFileInput(false);
                setShowNewFolderInput(false);
                setNewItemName('');
              }
            }}
            className={`w-full px-2 py-1.5 text-sm rounded border outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-300 text-gray-700'
            }`}
          />
        </div>
      )}

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto">
        {searchQuery.trim() ? (
          searchResults.map((node) => (
            <div
              key={node.path}
              className={`flex items-center py-1 px-2 cursor-pointer ${
                isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => useWorkspaceStore.getState().selectFile(node.path)}
            >
              <FileText className="w-4 h-4 mr-2 text-blue-400" />
              <span className="truncate text-sm">{node.name}</span>
            </div>
          ))
        ) : (
          fileTree.map((node) => <FileTreeItem key={node.path} node={node} />)
        )}
      </div>

      {/* Footer */}
      <div className={`px-4 py-2 text-xs border-t ${isDark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
        {fileTree.length} items
      </div>
    </div>
  );
}
