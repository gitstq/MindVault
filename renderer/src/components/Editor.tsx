import { useState, useCallback, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useWorkspaceStore } from '../stores/workspaceStore';
import { useThemeStore } from '../stores/themeStore';
import { FileText, Edit3, Eye, SplitSquareHorizontal } from 'lucide-react';

type ViewMode = 'edit' | 'preview' | 'split';

export default function Editor() {
  const { selectedFile, fileContent, setFileContent, isModified, saveFile } = useWorkspaceStore();
  const { isDark } = useThemeStore();
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [localContent, setLocalContent] = useState(fileContent);

  useEffect(() => {
    setLocalContent(fileContent);
  }, [fileContent, selectedFile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        saveFile();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveFile]);

  const handleChange = useCallback((value: string | undefined) => {
    const newContent = value || '';
    setLocalContent(newContent);
    setFileContent(newContent);
  }, [setFileContent]);

  if (!selectedFile) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <FileText className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Select a note to start editing
          </p>
        </div>
      </div>
    );
  }

  const fileName = selectedFile.split('/').pop() || '';

  return (
    <div className={`flex-1 flex flex-col overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Toolbar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className={`text-sm font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            {fileName}
          </span>
          {isModified && (
            <span className="text-xs text-orange-500 font-medium flex-shrink-0">● modified</span>
          )}
        </div>

        <div className={`flex items-center gap-1 p-1 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <button
            onClick={() => setViewMode('edit')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'edit'
                ? 'bg-blue-500 text-white'
                : isDark
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'split'
                ? 'bg-blue-500 text-white'
                : isDark
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            title="Split"
          >
            <SplitSquareHorizontal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'preview'
                ? 'bg-blue-500 text-white'
                : isDark
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        <div data-color-mode={isDark ? 'dark' : 'light'} className="h-full">
          <MDEditor
            value={localContent}
            onChange={handleChange}
            preview={viewMode === 'edit' ? 'edit' : viewMode === 'preview' ? 'preview' : 'live'}
            height="100%"
            hideToolbar={false}
            textareaProps={{
              placeholder: 'Start writing in Markdown...',
            }}
            previewOptions={{
              rehypePlugins: [rehypeSanitize],
            }}
          />
        </div>
      </div>
    </div>
  );
}
