import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import WelcomeScreen from './components/WelcomeScreen';
import { useWorkspaceStore } from './stores/workspaceStore';
import { useThemeStore } from './stores/themeStore';
import './App.css';

function App() {
  const { workspacePath, loadWorkspace } = useWorkspaceStore();
  const { isDark, initTheme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initTheme();
    
    // Listen for menu events from main process
    const handleWorkspaceOpened = (path: string) => {
      loadWorkspace(path);
    };

    const handleNewNote = () => {
      // Trigger new note creation
      window.dispatchEvent(new CustomEvent('app:new-note'));
    };

    if (window.electronAPI) {
      window.electronAPI.onWorkspaceOpened(handleWorkspaceOpened);
      window.electronAPI.onMenuNewNote(handleNewNote);
    }

    setIsLoading(false);

    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('workspace-opened');
        window.electronAPI.removeAllListeners('menu-new-note');
      }
    };
  }, [loadWorkspace, initTheme]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!workspacePath) {
    return <WelcomeScreen />;
  }

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />
      <Editor />
    </div>
  );
}

export default App;
