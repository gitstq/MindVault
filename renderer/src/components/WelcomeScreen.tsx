import { useState } from 'react';
import { FolderOpen, BookOpen, Sparkles, GitBranch } from 'lucide-react';
import { useWorkspaceStore } from '../stores/workspaceStore';
import { useThemeStore } from '../stores/themeStore';

export default function WelcomeScreen() {
  const { loadWorkspace } = useWorkspaceStore();
  const { isDark } = useThemeStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleOpenWorkspace = async () => {
    // In a real implementation, this would use electron's dialog
    // For now, we'll simulate with a prompt
    const path = prompt('Enter workspace folder path:');
    if (path) {
      loadWorkspace(path);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const items = e.dataTransfer.items;
    if (items.length > 0) {
      const item = items[0];
      if (item.kind === 'file') {
        const entry = item.webkitGetAsEntry();
        if (entry?.isDirectory) {
          // @ts-ignore
          loadWorkspace(e.dataTransfer.files[0].path);
        }
      }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="text-center max-w-2xl px-6">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">MindVault</h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            A lightweight desktop app for managing markdown knowledge bases
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-2xl p-12 mb-8 transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : isDark
              ? 'border-gray-700 hover:border-gray-500'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-xl font-semibold mb-2">Open Workspace</h3>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Drag & drop a folder or click to browse
          </p>
          <button onClick={handleOpenWorkspace} className="btn-primary">
            Choose Folder
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 text-left">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <Sparkles className="w-6 h-6 text-purple-500 mb-2" />
            <h4 className="font-semibold mb-1">Smart Search</h4>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Full-text fuzzy search across all notes
            </p>
          </div>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <GitBranch className="w-6 h-6 text-gray-700 dark:text-gray-300 mb-2" />
            <h4 className="font-semibold mb-1">Git Sync</h4>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Built-in version control integration
            </p>
          </div>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <BookOpen className="w-6 h-6 text-blue-500 mb-2" />
            <h4 className="font-semibold mb-1">Markdown First</h4>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Native markdown with live preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
